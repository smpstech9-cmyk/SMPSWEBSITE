"""Authentication and RBAC REST API Endpoints."""
from typing import Optional
from uuid import UUID
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from sqlalchemy import select, func, desc
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.config import settings
from app.core.database import get_db
from app.domains.auth.models import User, AuditLog
from app.domains.auth.schemas import (
    UserProfileResponse,
    UserUpdateRequest,
    UserSyncRequest,
    RoleAssignRequest,
    RoleRevokeRequest,
    DevTokenRequest,
    DevTokenResponse,
    PaginatedAuditLogsResponse,
    AuditLogResponse,
)
from app.domains.auth.services import (
    create_jwt_token,
    assign_user_role,
    revoke_user_role,
    log_audit_event,
)
from app.domains.auth.dependencies import (
    get_current_user,
    require_admin,
    require_super_admin,
)

router = APIRouter()


@router.get("/me", response_model=UserProfileResponse, summary="Get current authenticated user profile")
async def get_my_profile(
    current_user: User = Depends(get_current_user),
):
    """Retrieve profile and roles of the currently authenticated identity."""
    return current_user


@router.patch("/me", response_model=UserProfileResponse, summary="Update current user profile")
async def update_my_profile(
    payload: UserUpdateRequest,
    request: Request,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update profile attributes such as full name, phone number, and avatar."""
    changes = {}
    if payload.full_name is not None and payload.full_name != current_user.full_name:
        changes["full_name"] = {"old": current_user.full_name, "new": payload.full_name}
        current_user.full_name = payload.full_name
    if payload.phone is not None and payload.phone != current_user.phone:
        changes["phone"] = {"old": current_user.phone, "new": payload.phone}
        current_user.phone = payload.phone
    if payload.avatar_url is not None and payload.avatar_url != current_user.avatar_url:
        changes["avatar_url"] = {"old": current_user.avatar_url, "new": payload.avatar_url}
        current_user.avatar_url = payload.avatar_url

    if changes:
        current_user.updated_at = datetime.now(timezone.utc)
        client_ip = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent")

        await log_audit_event(
            db=db,
            action="user.update_profile",
            resource_type="user",
            resource_id=str(current_user.id),
            user_id=current_user.id,
            changes=changes,
            ip_address=client_ip,
            user_agent=user_agent,
        )
        await db.commit()

    return current_user


@router.post("/sync", response_model=UserProfileResponse, summary="Confirm Supabase user sync")
async def sync_supabase_user(
    payload: UserSyncRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Called after Supabase signup/login to verify local PostgreSQL user profile
    and apply any additional metadata from the client.
    """
    if payload.phone and current_user.phone != payload.phone:
        current_user.phone = payload.phone
        await db.commit()
    return current_user


@router.post("/roles/assign", response_model=UserProfileResponse, summary="Assign role to a user (Admin only)")
async def assign_role(
    payload: RoleAssignRequest,
    request: Request,
    admin_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """Assigns an authorized role to a user. Requires admin or super_admin privilege."""
    client_ip = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")

    updated_user = await assign_user_role(
        db=db,
        user_id=payload.user_id,
        role_name=payload.role_name,
        actor_id=admin_user.id,
        ip_address=client_ip,
        user_agent=user_agent,
    )
    return updated_user


@router.post("/roles/revoke", response_model=UserProfileResponse, summary="Revoke role from a user (Admin only)")
async def revoke_role(
    payload: RoleRevokeRequest,
    request: Request,
    admin_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """Revokes a role from a user. Requires admin or super_admin privilege."""
    client_ip = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")

    updated_user = await revoke_user_role(
        db=db,
        user_id=payload.user_id,
        role_name=payload.role_name,
        actor_id=admin_user.id,
        ip_address=client_ip,
        user_agent=user_agent,
    )
    return updated_user


@router.get("/audit-logs", response_model=PaginatedAuditLogsResponse, summary="View audit logs (Admin only)")
async def get_audit_logs(
    page: int = Query(1, ge=1),
    limit: int = Query(50, ge=1, le=200),
    user_id: Optional[UUID] = Query(None),
    action: Optional[str] = Query(None),
    admin_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """Retrieves immutable security and transaction audit logs with filtering and pagination."""
    query = select(AuditLog)
    count_query = select(func.count(AuditLog.id))

    if user_id:
        query = query.where(AuditLog.user_id == user_id)
        count_query = count_query.where(AuditLog.user_id == user_id)
    if action:
        query = query.where(AuditLog.action == action)
        count_query = count_query.where(AuditLog.action == action)

    total_count_res = await db.execute(count_query)
    total = total_count_res.scalar() or 0

    query = query.order_by(desc(AuditLog.created_at)).offset((page - 1) * limit).limit(limit)
    res = await db.execute(query)
    items = res.scalars().all()

    return PaginatedAuditLogsResponse(
        items=[AuditLogResponse.model_validate(item) for item in items],
        total=total,
        page=page,
        limit=limit,
    )


@router.post("/dev-token", response_model=DevTokenResponse, summary="Issue test JWT (Dev/Test mode only)")
async def generate_dev_token(payload: DevTokenRequest):
    """
    Issues a development JWT for testing roles and auth flows.
    Only permitted in non-production environments.
    """
    if settings.ENVIRONMENT == "production":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Dev token generation is strictly disabled in production",
        )

    sub = payload.sub or str(UUID(int=hash(payload.email) & 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF))
    claims = {
        "sub": sub,
        "email": payload.email,
        "role": payload.roles[0] if payload.roles else "student",
        "roles": payload.roles,
        "user_metadata": {
            "full_name": payload.full_name,
        },
    }
    token = create_jwt_token(claims)
    return DevTokenResponse(
        access_token=token,
        token_type="bearer",
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )
