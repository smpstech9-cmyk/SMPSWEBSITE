"""SQLAlchemy 2.0 models for Orders and Order Items."""
import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    String,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    CheckConstraint,
)
from sqlalchemy.orm import relationship
from app.core.database import Base, CompatibleJSON, CompatibleUUID as UUID


class Order(Base):
    __tablename__ = "orders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_number = Column(String(50), unique=True, nullable=False, index=True)  # SMPS-ORD-YYYYMMDD-XXXX
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="RESTRICT"), nullable=False, index=True)
    status = Column(String(30), default="CREATED", nullable=False, index=True)  # CREATED, PAID, PROCESSING, SHIPPED, DELIVERED, CANCELLED

    subtotal_inr = Column(Numeric(12, 2), nullable=False)
    tax_inr = Column(Numeric(12, 2), nullable=False)
    shipping_fee_inr = Column(Numeric(8, 2), default=0.00, nullable=False)
    discount_inr = Column(Numeric(10, 2), default=0.00, nullable=False)
    total_inr = Column(Numeric(12, 2), nullable=False)

    shipping_address_json = Column(CompatibleJSON, nullable=False)
    billing_address_json = Column(CompatibleJSON, nullable=False)
    tracking_number = Column(String(100), nullable=True)
    carrier_name = Column(String(100), nullable=True)

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False, index=True)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    __table_args__ = (
        CheckConstraint("subtotal_inr >= 0", name="check_non_negative_subtotal"),
        CheckConstraint("tax_inr >= 0", name="check_non_negative_tax"),
        CheckConstraint("shipping_fee_inr >= 0", name="check_non_negative_shipping"),
        CheckConstraint("discount_inr >= 0", name="check_non_negative_discount"),
        CheckConstraint("total_inr >= 0", name="check_non_negative_order_total"),
    )

    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    sku_id = Column(UUID(as_uuid=True), ForeignKey("skus.id", ondelete="RESTRICT"), nullable=False, index=True)
    quantity = Column(Integer, nullable=False)
    unit_price_inr = Column(Numeric(12, 2), nullable=False)
    tax_rate_percent = Column(Numeric(4, 2), nullable=False)
    total_price_inr = Column(Numeric(12, 2), nullable=False)

    __table_args__ = (
        CheckConstraint("quantity > 0", name="check_positive_quantity"),
        CheckConstraint("unit_price_inr >= 0", name="check_non_negative_unit_price"),
        CheckConstraint("total_price_inr >= 0", name="check_non_negative_item_total"),
    )

    order = relationship("Order", back_populates="items")
    sku = relationship("SKU", back_populates="order_items")

    @property
    def sku_code(self) -> str:
        return self.sku.sku_code if self.sku else ""

    @property
    def title(self) -> str:
        return self.sku.title if self.sku else ""

