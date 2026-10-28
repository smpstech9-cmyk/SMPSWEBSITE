"""Pydantic v2 schemas for Orders, Order Items, and Checkout."""
from uuid import UUID
from datetime import datetime
from decimal import Decimal
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, ConfigDict


class OrderItemRequest(BaseModel):
    sku_id: UUID
    quantity: int = Field(..., ge=1, le=100)


class AddressSchema(BaseModel):
    recipient_name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=10, max_length=15)
    street_line1: str = Field(..., min_length=3, max_length=200)
    street_line2: Optional[str] = None
    city: str = Field(..., min_length=2, max_length=100)
    state: str = Field(..., min_length=2, max_length=100)
    postal_code: str = Field(..., min_length=5, max_length=10)
    country: str = Field(default="IN", max_length=2)


class OrderCreateRequest(BaseModel):
    items: List[OrderItemRequest] = Field(..., min_length=1)
    shipping_address: AddressSchema
    billing_address: AddressSchema


class OrderItemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    sku_id: UUID
    quantity: int
    unit_price_inr: Decimal
    tax_rate_percent: Decimal
    total_price_inr: Decimal
    sku_code: Optional[str] = None
    title: Optional[str] = None



class OrderResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    order_number: str
    user_id: UUID
    status: str
    subtotal_inr: Decimal
    tax_inr: Decimal
    shipping_fee_inr: Decimal
    discount_inr: Decimal
    total_inr: Decimal
    shipping_address_json: Dict[str, Any]
    tracking_number: Optional[str] = None
    carrier_name: Optional[str] = None
    created_at: datetime
    items: List[OrderItemResponse] = []
