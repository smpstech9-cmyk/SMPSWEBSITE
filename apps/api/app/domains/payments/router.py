"""Payments REST API Router."""
from typing import List, Optional, Dict, Any
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Header, Request, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.domains.auth.dependencies import get_current_user, require_admin
from app.domains.auth.models import User
from app.domains.payments.models import Payment
from app.domains.payments.schemas import (
    PaymentInitRequest,
    RazorpayOrderResponse,
    PaymentVerifyRequest,
    PaymentStatusResponse,
)
from app.domains.payments.services import (
    initiate_razorpay_order,
    verify_razorpay_payment,
    handle_webhook_event,
    generate_tax_invoice_data,
)

router = APIRouter()


@router.post("/razorpay/create-order", response_model=RazorpayOrderResponse, summary="Initiate Razorpay payment order")
async def create_payment_order(
    payload: PaymentInitRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Generate server-signed Razorpay order ID for order checkout or internship enrollment."""
    return await initiate_razorpay_order(
        db=db,
        reference_type=payload.reference_type,
        reference_id=payload.reference_id,
        user_id=current_user.id,
    )


@router.post("/razorpay/verify", response_model=PaymentStatusResponse, summary="Verify Razorpay payment")
async def verify_payment(
    payload: PaymentVerifyRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Cryptographically verify Razorpay transaction signature and finalize order stock."""
    return await verify_razorpay_payment(
        db=db,
        payload=payload,
        user_id=current_user.id,
    )


@router.post("/webhook", status_code=status.HTTP_200_OK, summary="Payment gateway webhook receiver")
async def razorpay_webhook(
    request: Request,
    x_razorpay_event_id: Optional[str] = Header(None),
    x_razorpay_signature: Optional[str] = Header(None),
    db: AsyncSession = Depends(get_db),
):
    """Idempotent webhook endpoint for asynchronous payment notifications."""
    body_bytes = await request.body()
    try:
        data = await request.json()
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid JSON body")

    event_id = x_razorpay_event_id or data.get("event_id") or data.get("id") or f"evt_{hash(body_bytes)}"
    event_type = data.get("event", "payment.captured")

    event = await handle_webhook_event(
        db=db,
        event_id=str(event_id),
        event_type=event_type,
        payload_data=data,
    )
    return {"status": "ok", "event_id": event.event_id, "processed": True}


@router.get("/invoice/{order_id}", summary="Get Indian GST tax invoice")
async def get_invoice(
    order_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Retrieve full Indian GST compliant tax invoice breakdown for an order."""
    return await generate_tax_invoice_data(db=db, order_id=order_id)


# --- Admin Endpoints ---

@router.get("/admin/all", response_model=List[PaymentStatusResponse], summary="List all payments (Admin)")
async def admin_get_all_payments(
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    """Admin-only: Retrieve all payment transaction records."""
    stmt = select(Payment).order_by(Payment.created_at.desc())
    res = await db.execute(stmt)
    return list(res.scalars().all())
