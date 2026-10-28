"""Orders domain services: Cart calculations, order creation, stock reservation, and lifecycle management."""
import uuid
from uuid import UUID
from datetime import datetime, timezone
from decimal import Decimal, ROUND_HALF_UP
from typing import Optional, List, Dict, Any

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.domains.orders.models import Order, OrderItem
from app.domains.orders.schemas import OrderCreateRequest
from app.domains.store.models import SKU, Inventory
from app.domains.auth.models import User
from app.domains.auth.services import log_audit_event


def generate_order_number() -> str:
    """Generate high-entropy unique order number: SMPS-ORD-YYYYMMDD-XXXXXX."""
    now_str = datetime.now(timezone.utc).strftime("%Y%m%d")
    suffix = uuid.uuid4().hex[:6].upper()
    return f"SMPS-ORD-{now_str}-{suffix}"


async def get_order_by_id(db: AsyncSession, order_id: UUID) -> Optional[Order]:
    """Retrieve order with loaded items and SKU details by UUID."""
    stmt = (
        select(Order)
        .options(
            selectinload(Order.items).selectinload(OrderItem.sku),
            selectinload(Order.user),
        )
        .where(Order.id == order_id)
    )
    result = await db.execute(stmt)
    return result.scalars().first()


async def get_order_by_number(db: AsyncSession, order_number: str) -> Optional[Order]:
    """Retrieve order with loaded items and SKU details by human-readable order number."""
    stmt = (
        select(Order)
        .options(
            selectinload(Order.items).selectinload(OrderItem.sku),
            selectinload(Order.user),
        )
        .where(Order.order_number == order_number)
    )
    result = await db.execute(stmt)
    return result.scalars().first()


async def list_user_orders(db: AsyncSession, user_id: UUID) -> List[Order]:
    """Retrieve all orders placed by a specific user, sorted newest first."""
    stmt = (
        select(Order)
        .options(
            selectinload(Order.items).selectinload(OrderItem.sku),
        )
        .where(Order.user_id == user_id)
        .order_by(Order.created_at.desc())
    )
    result = await db.execute(stmt)
    return list(result.scalars().all())


async def admin_list_orders(
    db: AsyncSession,
    status_filter: Optional[str] = None,
) -> List[Order]:
    """Admin-only: Retrieve all orders across the system with optional status filtering."""
    stmt = (
        select(Order)
        .options(
            selectinload(Order.items).selectinload(OrderItem.sku),
            selectinload(Order.user),
        )
        .order_by(Order.created_at.desc())
    )
    if status_filter:
        stmt = stmt.where(Order.status == status_filter)

    result = await db.execute(stmt)
    return list(result.scalars().all())


async def create_order(
    db: AsyncSession,
    user_id: UUID,
    payload: OrderCreateRequest,
) -> Order:
    """
    Create a new order from active cart items.
    Validates stock, reserves quantities in inventory, computes exact Decimal GST, and logs audit trail.
    """
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    subtotal_inr = Decimal("0.00")
    total_tax_inr = Decimal("0.00")
    order_items_to_create = []

    for item_req in payload.items:
        # Load SKU with its inventory
        stmt = (
            select(SKU)
            .options(selectinload(SKU.inventory), selectinload(SKU.product))
            .where(SKU.id == item_req.sku_id)
        )
        res = await db.execute(stmt)
        sku = res.scalars().first()

        if not sku or not sku.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"SKU {item_req.sku_id} is inactive or does not exist.",
            )

        # Check stock availability
        available_qty = sku.inventory.quantity_available if sku.inventory else 0
        if available_qty < item_req.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Insufficient inventory for {sku.title}. Requested: {item_req.quantity}, Available: {available_qty}",
            )

        # Precise Indian GST calculation
        qty = Decimal(str(item_req.quantity))
        item_unit_price = Decimal(str(sku.price_inr))
        item_tax_rate = Decimal(str(sku.tax_rate_percent))

        item_subtotal = (qty * item_unit_price).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        item_tax = (item_subtotal * (item_tax_rate / Decimal("100.00"))).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        item_total = item_subtotal + item_tax

        subtotal_inr += item_subtotal
        total_tax_inr += item_tax

        # Reserve inventory immediately upon order placement
        if sku.inventory:
            sku.inventory.quantity_available -= item_req.quantity
            sku.inventory.quantity_reserved += item_req.quantity

        order_items_to_create.append({
            "sku": sku,
            "quantity": item_req.quantity,
            "unit_price_inr": item_unit_price,
            "tax_rate_percent": item_tax_rate,
            "total_price_inr": item_total,
        })

    # Free shipping on orders over ₹2,000, otherwise standard insured courier fee of ₹150
    shipping_fee_inr = Decimal("0.00") if subtotal_inr >= Decimal("2000.00") else Decimal("150.00")
    discount_inr = Decimal("0.00")
    final_order_total = subtotal_inr + total_tax_inr + shipping_fee_inr - discount_inr

    new_order = Order(
        id=uuid.uuid4(),
        order_number=generate_order_number(),
        user_id=user_id,
        status="CREATED",
        subtotal_inr=subtotal_inr,
        tax_inr=total_tax_inr,
        shipping_fee_inr=shipping_fee_inr,
        discount_inr=discount_inr,
        total_inr=final_order_total,
        shipping_address_json=payload.shipping_address.model_dump(),
        billing_address_json=payload.billing_address.model_dump(),
    )
    db.add(new_order)
    await db.flush()

    for item_data in order_items_to_create:
        order_item = OrderItem(
            id=uuid.uuid4(),
            order_id=new_order.id,
            sku_id=item_data["sku"].id,
            quantity=item_data["quantity"],
            unit_price_inr=item_data["unit_price_inr"],
            tax_rate_percent=item_data["tax_rate_percent"],
            total_price_inr=item_data["total_price_inr"],
        )
        db.add(order_item)

    await db.commit()

    await log_audit_event(
        db=db,
        user_id=user_id,
        action="order.create",
        resource_type="orders",
        resource_id=str(new_order.id),
        changes={
            "order_number": new_order.order_number,
            "total_inr": str(final_order_total),
            "items_count": len(order_items_to_create),
        },
    )

    return await get_order_by_id(db, new_order.id)  # type: ignore


async def update_order_status(
    db: AsyncSession,
    order_id: UUID,
    new_status: str,
    tracking_number: Optional[str] = None,
    carrier_name: Optional[str] = None,
    actor_id: Optional[UUID] = None,
) -> Order:
    """
    Update order fulfillment status (e.g., CREATED -> PAID -> SHIPPED -> DELIVERED).
    If cancelling an order, releases reserved stock back to available warehouse pool.
    """
    order = await get_order_by_id(db, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found",
        )

    previous_status = order.status

    # If cancelling, release reserved stock back to inventory
    if new_status == "CANCELLED" and previous_status in ["CREATED", "PAID"]:
        for item in order.items:
            sku_stmt = (
                select(SKU)
                .options(selectinload(SKU.inventory))
                .where(SKU.id == item.sku_id)
            )
            sku = (await db.execute(sku_stmt)).scalars().first()
            if sku and sku.inventory:
                sku.inventory.quantity_reserved = max(0, sku.inventory.quantity_reserved - item.quantity)
                sku.inventory.quantity_available += item.quantity

    order.status = new_status
    if tracking_number is not None:
        order.tracking_number = tracking_number
    if carrier_name is not None:
        order.carrier_name = carrier_name

    await db.commit()

    await log_audit_event(
        db=db,
        user_id=actor_id,
        action="order.update_status",
        resource_type="orders",
        resource_id=str(order.id),
        changes={
            "previous_status": previous_status,
            "new_status": new_status,
            "tracking_number": tracking_number,
            "carrier_name": carrier_name,
        },
    )

    return await get_order_by_id(db, order.id)  # type: ignore
