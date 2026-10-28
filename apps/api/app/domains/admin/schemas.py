"""Pydantic v2 schemas for Administrative Metrics and Audit views."""
from uuid import UUID
from datetime import datetime
from decimal import Decimal
from typing import Optional, Dict, Any
from pydantic import BaseModel, ConfigDict


class RevenueMetricsResponse(BaseModel):
    total_revenue_inr: Decimal
    internship_revenue_inr: Decimal
    product_revenue_inr: Decimal
    active_enrollments: int
    pending_applications: int
    total_orders: int


class AuditLogResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: Optional[UUID] = None
    action: str
    resource_type: str
    resource_id: str
    changes: Optional[Dict[str, Any]] = None
    ip_address: Optional[str] = None
    created_at: datetime
