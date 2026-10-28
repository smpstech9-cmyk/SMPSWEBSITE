"""FastAPI Authentication and RBAC Route Guard Dependencies."""
from typing import List, Callable
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.domains.auth.models import User
from app.domains.auth.services import verify_jwt_token, get_or_sync_user

security = HTTPBearer(auto_error=True)


async def get_current_user(
    request: Request,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db),
) -> User:
    """
    Validates Bearer JWT, synchronizes user identity with PostgreSQL,
    and returns the active User object with loaded roles.
    """
    token = credentials.credentials
    claims = verify_jwt_token(token)

    client_ip = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")

    user = await get_or_sync_user(
        db=db,
        claims=claims,
        ip_address=client_ip,
        user_agent=user_agent,
    )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is deactivated. Please contact support.",
        )

    # Attach to request state for downstream handlers and audit logging
    request.state.user = user
    return user


def require_roles(*allowed_roles: str) -> Callable:
    """
    Dependency factory that verifies the authenticated user possesses
    at least one of the specified roles (or super_admin).
    """
    async def role_checker(
        user: User = Depends(get_current_user),
    ) -> User:
        user_role_names = {r.name for r in user.roles}

        # super_admin always has access to all protected resources
        if "super_admin" in user_role_names:
            return user

        # Check for intersection with allowed roles
        if not user_role_names.intersection(set(allowed_roles)):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Forbidden: access requires one of [{', '.join(allowed_roles)}] privileges",
            )
        return user

    return role_checker


# Predefined convenience dependencies for route protection
require_super_admin = require_roles("super_admin")
require_admin = require_roles("super_admin", "admin")
require_operations = require_roles("super_admin", "admin", "operations")
require_student = require_roles("super_admin", "admin", "student")
require_customer = require_roles("super_admin", "admin", "customer")
