"""SQLAlchemy 2.0 models for Categories, Products, SKUs, and Inventory."""
import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    String,
    Text,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    Boolean,
    CheckConstraint,
)
from sqlalchemy.orm import relationship
from app.core.database import Base, CompatibleJSON, CompatibleUUID as UUID


class Category(Base):
    __tablename__ = "categories"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), unique=True, nullable=False, index=True)
    slug = Column(String(100), unique=True, nullable=False, index=True)
    description = Column(Text, nullable=True)
    icon_name = Column(String(50), nullable=True)

    products = relationship("Product", back_populates="category")


class Product(Base):
    __tablename__ = "products"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.id", ondelete="RESTRICT"), nullable=False, index=True)
    slug = Column(String(120), unique=True, nullable=False, index=True)
    name = Column(String(255), nullable=False)
    brand_line = Column(String(100), nullable=False, index=True)  # PURNA BESS, SUBAL PCS, SWARNALI, SaralaChip
    short_description = Column(String(500), nullable=False)
    description = Column(Text, nullable=False)
    specifications_json = Column(CompatibleJSON, nullable=False)
    datasheet_url = Column(String(500), nullable=True)
    primary_image_url = Column(String(500), nullable=True)
    is_published = Column(Boolean, default=False, nullable=False, index=True)

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    category = relationship("Category", back_populates="products")
    skus = relationship("SKU", back_populates="product", cascade="all, delete-orphan")


class SKU(Base):
    __tablename__ = "skus"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True)
    sku_code = Column(String(60), unique=True, nullable=False, index=True)  # e.g. SMPS-BESS-50KWH
    title = Column(String(255), nullable=False)
    price_inr = Column(Numeric(12, 2), nullable=False)  # Decimal precision, strictly non-float
    hsn_code = Column(String(20), nullable=False)  # Indian GST HSN code
    tax_rate_percent = Column(Numeric(4, 2), default=18.00, nullable=False)
    weight_kg = Column(Numeric(8, 2), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False, index=True)

    __table_args__ = (
        CheckConstraint("price_inr >= 0", name="check_non_negative_sku_price"),
        CheckConstraint("tax_rate_percent >= 0 AND tax_rate_percent <= 100", name="check_valid_tax_rate"),
    )

    product = relationship("Product", back_populates="skus")
    inventory = relationship("Inventory", back_populates="sku", uselist=False, cascade="all, delete-orphan")
    order_items = relationship("OrderItem", back_populates="sku")

    @property
    def quantity_available(self) -> int:
        return self.inventory.quantity_available if self.inventory else 0



class Inventory(Base):
    __tablename__ = "inventory"

    sku_id = Column(UUID(as_uuid=True), ForeignKey("skus.id", ondelete="CASCADE"), primary_key=True)
    quantity_available = Column(Integer, nullable=False, default=0)
    quantity_reserved = Column(Integer, nullable=False, default=0)
    low_stock_threshold = Column(Integer, nullable=False, default=5)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    __table_args__ = (
        CheckConstraint("quantity_available >= 0", name="check_non_negative_stock"),
        CheckConstraint("quantity_reserved >= 0", name="check_non_negative_reserved"),
    )

    sku = relationship("SKU", back_populates="inventory")
