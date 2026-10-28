"""SQLAlchemy 2.0 models for Payments, PaymentEvents (idempotent webhooks), and Refunds."""
import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    String,
    Text,
    DateTime,
    ForeignKey,
    Numeric,
    CheckConstraint,
)
from sqlalchemy.orm import relationship
from app.core.database import Base, CompatibleJSON, CompatibleUUID as UUID


class Payment(Base):
    __tablename__ = "payments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    reference_type = Column(String(20), nullable=False, index=True)  # ORDER, ENROLLMENT
    reference_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    gateway = Column(String(30), default="RAZORPAY", nullable=False)
    gateway_order_id = Column(String(100), unique=True, nullable=False, index=True)
    gateway_payment_id = Column(String(100), unique=True, nullable=True, index=True)
    gateway_signature = Column(String(255), nullable=True)
    amount_inr = Column(Numeric(12, 2), nullable=False)
    currency = Column(String(10), default="INR", nullable=False)
    status = Column(String(30), default="INITIATED", nullable=False, index=True)  # INITIATED, SUCCESS, FAILED, REFUNDED

    verified_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False, index=True)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    __table_args__ = (
        CheckConstraint("amount_inr > 0", name="check_positive_payment_amount"),
    )

    refunds = relationship("Refund", back_populates="payment", cascade="all, delete-orphan")


class PaymentEvent(Base):
    __tablename__ = "payment_events"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    event_id = Column(String(100), unique=True, nullable=False, index=True)  # Webhook event ID (idempotency key)
    event_type = Column(String(100), nullable=False, index=True)  # payment.captured, payment.failed, etc.
    payload = Column(CompatibleJSON, nullable=False)
    processed_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)


class Refund(Base):
    __tablename__ = "refunds"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    payment_id = Column(UUID(as_uuid=True), ForeignKey("payments.id", ondelete="RESTRICT"), nullable=False, index=True)
    gateway_refund_id = Column(String(100), unique=True, nullable=True, index=True)
    amount_inr = Column(Numeric(12, 2), nullable=False)
    reason = Column(Text, nullable=False)
    authorized_by = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="RESTRICT"), nullable=False, index=True)
    status = Column(String(30), default="PENDING", nullable=False, index=True)  # PENDING, COMPLETED, FAILED

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    processed_at = Column(DateTime(timezone=True), nullable=True)

    __table_args__ = (
        CheckConstraint("amount_inr > 0", name="check_positive_refund_amount"),
    )

    payment = relationship("Payment", back_populates="refunds")
