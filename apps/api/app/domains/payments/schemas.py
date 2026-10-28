"""Pydantic v2 schemas for Payments, Razorpay Orders, and Webhook verification."""
from uuid import UUID
from datetime import datetime
from decimal import Decimal
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field, ConfigDict


class PaymentInitRequest(BaseModel):
    reference_type: str = Field(..., pattern=r"^(ORDER|ENROLLMENT)$")
    reference_id: UUID


class RazorpayOrderResponse(BaseModel):
    payment_id: UUID
    gateway: str = "RAZORPAY"
    gateway_order_id: str
    amount_inr: Decimal
    currency: str = "INR"
    key_id: str


class PaymentVerifyRequest(BaseModel):
    payment_id: UUID
    gateway_order_id: str
    gateway_payment_id: str
    gateway_signature: str


class PaymentStatusResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    reference_type: str
    reference_id: UUID
    gateway: str
    gateway_order_id: str
    gateway_payment_id: Optional[str] = None
    amount_inr: Decimal
    currency: str
    status: str
    verified_at: Optional[datetime] = None
    created_at: datetime


class WebhookPayloadSchema(BaseModel):
    event: str
    payload: Dict[str, Any]
