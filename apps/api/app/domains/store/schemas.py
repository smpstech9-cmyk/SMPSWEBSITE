"""Pydantic v2 schemas for Hardware Store, Products, SKUs, and Inventory."""
from uuid import UUID
from datetime import datetime
from decimal import Decimal
from typing import Optional, List, Any, Dict
from pydantic import BaseModel, Field, ConfigDict


class CategoryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    name: str
    slug: str
    description: Optional[str] = None
    icon_name: Optional[str] = None


class SKUResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    product_id: UUID
    sku_code: str
    title: str
    price_inr: Decimal
    hsn_code: str
    tax_rate_percent: Decimal
    weight_kg: Optional[Decimal] = None
    quantity_available: int = 0
    is_active: bool


class ProductResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    category_id: UUID
    slug: str
    name: str
    brand_line: str
    short_description: str
    description: str
    specifications_json: Dict[str, Any]
    datasheet_url: Optional[str] = None
    primary_image_url: Optional[str] = None
    is_published: bool
    skus: List[SKUResponse] = []
    category: Optional[CategoryResponse] = None


class SKUCreateRequest(BaseModel):
    sku_code: str = Field(..., min_length=3, max_length=60)
    title: str = Field(..., min_length=2, max_length=255)
    price_inr: Decimal = Field(..., gt=Decimal("0.0"))
    hsn_code: str = Field(..., min_length=4, max_length=20)
    tax_rate_percent: Decimal = Field(default=Decimal("18.00"), ge=Decimal("0.0"), le=Decimal("100.0"))
    weight_kg: Optional[Decimal] = None
    initial_stock: int = Field(default=10, ge=0)


class ProductCreateRequest(BaseModel):
    category_id: UUID
    slug: str = Field(..., min_length=3, max_length=120)
    name: str = Field(..., min_length=3, max_length=255)
    brand_line: str = Field(..., min_length=2, max_length=100)
    short_description: str = Field(..., min_length=10, max_length=500)
    description: str = Field(..., min_length=10)
    specifications_json: Dict[str, Any] = {}
    datasheet_url: Optional[str] = None
    primary_image_url: Optional[str] = None
    is_published: bool = True
    skus: List[SKUCreateRequest] = []


class ProductUpdateRequest(BaseModel):
    name: Optional[str] = None
    short_description: Optional[str] = None
    description: Optional[str] = None
    specifications_json: Optional[Dict[str, Any]] = None
    datasheet_url: Optional[str] = None
    primary_image_url: Optional[str] = None
    is_published: Optional[bool] = None


class InventoryAdjustRequest(BaseModel):
    quantity_available: int = Field(..., ge=0)
    low_stock_threshold: Optional[int] = Field(default=5, ge=1)
