"""Authentication, JWT processing, User Synchronization, RBAC, and Audit Logging Services."""
import uuid
from uuid import UUID
from datetime import datetime, timezone, timedelta
from typing import Optional, Dict, Any, List

import jwt
from fastapi import HTTPException, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.config import settings
from app.domains.auth.models import User, Role, UserRole, AuditLog


def create_jwt_token(
    claims: Dict[str, Any],
    expires_delta: Optional[timedelta] = None,
) -> str:
    """Generate a signed JWT token using configured secret and algorithm."""
    to_encode = claims.copy()
    now = datetime.now(timezone.utc)
    if expires_delta:
        expire = now + expires_delta
    else:
        expire = now + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({
        "iat": int(now.timestamp()),
        "exp": int(expire.timestamp()),
        "iss": "smps-tech-lab",
    })
    return jwt.encode(
        to_encode,
        settings.SUPABASE_JWT_SECRET,
        algorithm=settings.JWT_ALGORITHM,
    )


def verify_jwt_token(token: str) -> Dict[str, Any]:
    """
    Verify and decode a JWT token (from Supabase Auth or local testing).
    Raises HTTPException(401) on failure.
    """
    try:
        # Decode without verification first if needed for inspection, but here we verify
        payload = jwt.decode(
            token,
            settings.SUPABASE_JWT_SECRET,
            algorithms=[settings.JWT_ALGORITHM],
            options={"verify_exp": True, "verify_signature": True},
        )
        if not payload.get("sub") and not payload.get("email"):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload: missing subject identifier",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.PyJWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Could not validate credentials: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )


async def get_or_sync_user(
    db: AsyncSession,
    claims: Dict[str, Any],
    default_role: str = "student",
    ip_address: Optional[str] = None,
    user_agent: Optional[str] = None,
) -> User:
    """
    Synchronizes an authenticated identity from Supabase or JWT claims into the local PostgreSQL database.
    Ensures relational integrity and assigns default roles if user is new.
    """
    email = claims.get("email")
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Token does not contain an email address",
        )

    sub = claims.get("sub")
    user_uuid: Optional[UUID] = None
    if sub:
        try:
            user_uuid = UUID(sub)
        except (ValueError, TypeError):
            user_uuid = None

    # Query for existing user
    stmt = (
        select(User)
        .options(selectinload(User.roles))
        .where((User.email == email) | (User.id == user_uuid if user_uuid else False))
    )
    result = await db.execute(stmt)
    user = result.scalars().first()

    # Extract metadata fields
    user_metadata = claims.get("user_metadata", {})
    full_name = (
        user_metadata.get("full_name")
        or claims.get("full_name")
        or claims.get("name")
        or email.split("@")[0].replace(".", " ").title()
    )
    phone = user_metadata.get("phone") or claims.get("phone")
    avatar_url = user_metadata.get("avatar_url") or claims.get("avatar_url")

    if not user:
        # Create new user
        new_user_id = user_uuid or uuid.uuid4()
        user = User(
            id=new_user_id,
            email=email,
            full_name=full_name,
            phone=phone,
            avatar_url=avatar_url,
            is_active=1,
        )
        db.add(user)
        await db.flush()

        # Find requested or default role
        target_role_name = claims.get("role") or default_role
        role_stmt = select(Role).where(Role.name == target_role_name)
        role_res = await db.execute(role_stmt)
        role = role_res.scalars().first()

        if not role:
            # Fallback to student role
            fallback_res = await db.execute(select(Role).where(Role.name == "student"))
            role = fallback_res.scalars().first()

        if role:
            user_role = UserRole(user_id=user.id, role_id=role.id)
            db.add(user_role)
            await db.flush()

        # Log audit event for registration
        await log_audit_event(
            db=db,
            action="auth.register",
            resource_type="user",
            resource_id=str(user.id),
            user_id=user.id,
            changes={"email": email, "initial_role": role.name if role else "none"},
            ip_address=ip_address,
            user_agent=user_agent,
        )

        await db.commit()
        # Reload with relationships
        reloaded = await db.execute(
            select(User).options(selectinload(User.roles)).where(User.id == user.id)
        )
        return reloaded.scalars().first()
    else:
        # User already exists; update fields if newer info provided
        updated = False
        if full_name and user.full_name != full_name:
            user.full_name = full_name
            updated = True
        if phone and user.phone != phone:
            user.phone = phone
            updated = True
        if avatar_url and user.avatar_url != avatar_url:
            user.avatar_url = avatar_url
            updated = True

        if updated:
            user.updated_at = datetime.now(timezone.utc)
            await db.commit()

        return user


async def log_audit_event(
    db: AsyncSession,
    action: str,
    resource_type: str,
    resource_id: str,
    user_id: Optional[UUID] = None,
    changes: Optional[Dict[str, Any]] = None,
    ip_address: Optional[str] = None,
    user_agent: Optional[str] = None,
) -> AuditLog:
    """Records an immutable security audit event into the database."""
    entry = AuditLog(
        user_id=user_id,
        action=action,
        resource_type=resource_type,
        resource_id=resource_id,
        changes=changes or {},
        ip_address=ip_address,
        user_agent=user_agent,
    )
    db.add(entry)
    await db.flush()
    return entry


async def assign_user_role(
    db: AsyncSession,
    user_id: UUID,
    role_name: str,
    actor_id: Optional[UUID] = None,
    ip_address: Optional[str] = None,
    user_agent: Optional[str] = None,
) -> User:
    """Assigns a role to a user and logs an audit record."""
    # Find role
    role_stmt = select(Role).where(Role.name == role_name)
    role_res = await db.execute(role_stmt)
    role = role_res.scalars().first()
    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Role '{role_name}' does not exist",
        )

    # Find user
    user_stmt = select(User).options(selectinload(User.roles)).where(User.id == user_id)
    user_res = await db.execute(user_stmt)
    user = user_res.scalars().first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User '{user_id}' does not exist",
        )

    # Check if user already has role
    if any(r.name == role_name for r in user.roles):
        return user

    # Append role to secondary relationship
    user.roles.append(role)

    # Audit log
    await log_audit_event(
        db=db,
        action="role.assigned",
        resource_type="user",
        resource_id=str(user.id),
        user_id=actor_id,
        changes={"role": role_name, "target_user_email": user.email},
        ip_address=ip_address,
        user_agent=user_agent,
    )

    await db.commit()
    # Refresh
    reloaded = await db.execute(
        select(User).options(selectinload(User.roles)).where(User.id == user.id)
    )
    return reloaded.scalars().first()


async def revoke_user_role(
    db: AsyncSession,
    user_id: UUID,
    role_name: str,
    actor_id: Optional[UUID] = None,
    ip_address: Optional[str] = None,
    user_agent: Optional[str] = None,
) -> User:
    """Revokes a role from a user and logs an audit record."""
    # Find role
    role_stmt = select(Role).where(Role.name == role_name)
    role_res = await db.execute(role_stmt)
    role = role_res.scalars().first()
    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Role '{role_name}' does not exist",
        )

    # Find user
    user_stmt = select(User).options(selectinload(User.roles)).where(User.id == user_id)
    user_res = await db.execute(user_stmt)
    user = user_res.scalars().first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User '{user_id}' does not exist",
        )

    # Safety constraint: Do not revoke super_admin if this is the last super_admin in the system
    if role_name == "super_admin":
        count_stmt = (
            select(func.count(UserRole.user_id))
            .where(UserRole.role_id == role.id)
        )
        count_res = await db.execute(count_stmt)
        super_count = count_res.scalar() or 0
        if super_count <= 1:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Security violation: Cannot revoke the last super_admin role in the system",
            )

    # Check if user has role
    if not any(r.name == role_name for r in user.roles):
        return user

    # Remove role from relationship
    user.roles = [r for r in user.roles if r.name != role_name]

    # Audit log
    await log_audit_event(
        db=db,
        action="role.revoked",
        resource_type="user",
        resource_id=str(user.id),
        user_id=actor_id,
        changes={"role": role_name, "target_user_email": user.email},
        ip_address=ip_address,
        user_agent=user_agent,
    )

    await db.commit()
    # Refresh
    reloaded = await db.execute(
        select(User).options(selectinload(User.roles)).where(User.id == user.id)
    )
    return reloaded.scalars().first()
