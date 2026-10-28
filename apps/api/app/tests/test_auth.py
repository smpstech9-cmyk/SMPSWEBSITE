"""Authentication, RBAC, and Audit Logging Unit & Integration Tests."""
import uuid
from datetime import timedelta
import pytest
from fastapi import HTTPException
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.database import Base, get_db
from app.core.config import settings
from app.main import app
from app.domains.auth.models import User, Role, UserRole, AuditLog
from app.domains.auth.services import (
    create_jwt_token,
    verify_jwt_token,
    get_or_sync_user,
    assign_user_role,
    revoke_user_role,
)


@pytest.fixture
def auth_db_session():
    """In-memory SQLite session for testing auth domain services."""
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()

    # Pre-seed standard system roles
    for role_name in ["super_admin", "admin", "operations", "student", "customer"]:
        role = Role(name=role_name, description=f"{role_name} system role")
        session.add(role)
    session.commit()

    try:
        yield session
    finally:
        session.close()


def test_jwt_create_and_verify():
    """Tests JWT creation, signing, and verification."""
    claims = {
        "sub": str(uuid.uuid4()),
        "email": "engineer@smpstechlab.com",
        "role": "student",
    }
    token = create_jwt_token(claims)
    assert isinstance(token, str)

    decoded = verify_jwt_token(token)
    assert decoded["sub"] == claims["sub"]
    assert decoded["email"] == claims["email"]
    assert decoded["role"] == "student"
    assert decoded["iss"] == "smps-tech-lab"


def test_jwt_expired_fails():
    """Verifies that expired JWTs are immediately rejected with 401."""
    claims = {
        "sub": str(uuid.uuid4()),
        "email": "expired@smpstechlab.com",
    }
    # Expired 1 hour ago
    expired_token = create_jwt_token(claims, expires_delta=timedelta(hours=-1))

    with pytest.raises(HTTPException) as exc_info:
        verify_jwt_token(expired_token)
    assert exc_info.value.status_code == 401
    assert "expired" in exc_info.value.detail.lower()


@pytest.mark.asyncio
async def test_user_sync_and_default_role():
    """Verifies user synchronization from JWT claims creates DB record with default role."""
    from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

    async_engine = create_async_engine("sqlite+aiosqlite:///:memory:")
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    AsyncSessionLocal = async_sessionmaker(bind=async_engine, expire_on_commit=False)
    async with AsyncSessionLocal() as session:
        # Seed roles
        for r_name in ["student", "admin"]:
            session.add(Role(name=r_name))
        await session.commit()

        user_id = uuid.uuid4()
        claims = {
            "sub": str(user_id),
            "email": "vtu.student@college.edu",
            "user_metadata": {
                "full_name": "Rohan Deshmukh",
                "phone": "+919876543210",
            },
        }

        user = await get_or_sync_user(session, claims, default_role="student")
        assert user.id == user_id
        assert user.email == "vtu.student@college.edu"
        assert user.full_name == "Rohan Deshmukh"
        assert len(user.roles) == 1
        assert user.roles[0].name == "student"


@pytest.mark.asyncio
async def test_role_assignment_and_super_admin_guard():
    """Verifies role assignment, revocation, and guard against revoking last super_admin."""
    from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

    async_engine = create_async_engine("sqlite+aiosqlite:///:memory:")
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    AsyncSessionLocal = async_sessionmaker(bind=async_engine, expire_on_commit=False)
    async with AsyncSessionLocal() as session:
        super_role = Role(name="super_admin")
        admin_role = Role(name="admin")
        session.add_all([super_role, admin_role])
        await session.commit()

        # Create one super_admin user
        super_user = User(
            id=uuid.uuid4(),
            email="root@smpstechlab.com",
            full_name="Root Super Admin",
            is_active=1,
        )
        session.add(super_user)
        await session.flush()
        session.add(UserRole(user_id=super_user.id, role_id=super_role.id))
        await session.commit()

        # Attempt to revoke last super_admin -> must raise HTTPException 400
        with pytest.raises(HTTPException) as exc_info:
            await revoke_user_role(
                db=session,
                user_id=super_user.id,
                role_name="super_admin",
                actor_id=super_user.id,
            )
        assert exc_info.value.status_code == 400
        assert "Cannot revoke the last super_admin" in exc_info.value.detail

        # Assign admin role to user
        updated_user = await assign_user_role(
            db=session,
            user_id=super_user.id,
            role_name="admin",
            actor_id=super_user.id,
        )
        role_names = {r.name for r in updated_user.roles}
        assert "admin" in role_names
        assert "super_admin" in role_names


def test_api_auth_me_unauthorized():
    """Verifies that accessing protected /me without credentials returns 401/403."""
    client = TestClient(app)
    response = client.get("/api/v1/auth/me")
    assert response.status_code in (401, 403)


def test_api_dev_token_issuance():
    """Verifies dev token generation endpoint works for non-production environments."""
    client = TestClient(app)
    response = client.post(
        "/api/v1/auth/dev-token",
        json={
            "email": "test.engineer@vtu.ac.in",
            "full_name": "Test Engineer",
            "roles": ["student"],
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["expires_in"] > 0
