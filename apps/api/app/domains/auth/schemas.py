"""Pydantic v2 schemas for Authentication, RBAC, and Audit Logging."""
from uuid import UUID
from datetime import datetime
from typing import Optional, List, Any, Dict
from pydantic import BaseModel, EmailStr, Field, ConfigDict


class RoleSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: Optional[str] = None


class UserProfileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    email: EmailStr
    full_name: str
    phone: Optional[str] = None
    avatar_url: Optional[str] = None
    is_active: int = 1
    roles: List[RoleSchema] = []
    created_at: datetime
    updated_at: datetime


class UserUpdateRequest(BaseModel):
    full_name: Optional[str] = Field(None, min_length=2, max_length=100)
    phone: Optional[str] = Field(None, max_length=20)
    avatar_url: Optional[str] = Field(None, max_length=500)


class UserSyncRequest(BaseModel):
    email: EmailStr
    full_name: str = Field(..., min_length=2, max_length=100)
    phone: Optional[str] = Field(None, max_length=20)
    avatar_url: Optional[str] = Field(None, max_length=500)
    default_role: str = Field("student", description="Default role to assign if user is newly registered (student or customer)")


class RoleAssignRequest(BaseModel):
    user_id: UUID
    role_name: str = Field(..., min_length=2, max_length=50)


class RoleRevokeRequest(BaseModel):
    user_id: UUID
    role_name: str = Field(..., min_length=2, max_length=50)


class DevTokenRequest(BaseModel):
    email: EmailStr
    full_name: str = "Test Developer"
    roles: List[str] = ["student"]
    sub: Optional[str] = None


class DevTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class AuditLogResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: Optional[UUID] = None
    action: str
    resource_type: str
    resource_id: str
    changes: Optional[Dict[str, Any]] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    created_at: datetime


class PaginatedAuditLogsResponse(BaseModel):
    items: List[AuditLogResponse]
    total: int
    page: int
    limit: int
