"""Orders REST API Router."""
from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel

from app.core.database import get_db
from app.domains.auth.dependencies import get_current_user, require_admin
from app.domains.auth.models import User
from app.domains.orders.schemas import (
    OrderCreateRequest,
    OrderResponse,
)
from app.domains.orders.services import (
    create_order,
    get_order_by_id,
    get_order_by_number,
    list_user_orders,
    admin_list_orders,
    update_order_status,
)

router = APIRouter()


class OrderStatusUpdateRequest(BaseModel):
    status: str
    tracking_number: Optional[str] = None
    carrier_name: Optional[str] = None


@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED, summary="Create new order from cart")
async def place_order(
    payload: OrderCreateRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Place an order with live inventory reservation and automated GST computation."""
    return await create_order(db=db, user_id=current_user.id, payload=payload)


@router.get("/me", response_model=List[OrderResponse], summary="List user orders")
async def get_my_orders(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Retrieve all previous orders placed by the authenticated customer."""
    return await list_user_orders(db=db, user_id=current_user.id)


@router.get("/number/{order_number}", response_model=OrderResponse, summary="Get order by number")
async def get_order_by_num(
    order_number: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Retrieve full order details and items by order number."""
    order = await get_order_by_number(db=db, order_number=order_number)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")

    # Authorize: user must own order or be admin
    is_admin = any(r.name in ["super_admin", "admin", "ops"] for r in current_user.roles)
    if order.user_id != current_user.id and not is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

    return order


@router.get("/{order_id}", response_model=OrderResponse, summary="Get order by ID")
async def get_order(
    order_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Retrieve full order details and items by UUID."""
    order = await get_order_by_id(db=db, order_id=order_id)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")

    is_admin = any(r.name in ["super_admin", "admin", "ops"] for r in current_user.roles)
    if order.user_id != current_user.id and not is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

    return order


# --- Admin / Ops Endpoints ---

@router.get("/admin/all", response_model=List[OrderResponse], summary="List all orders across system (Admin)")
async def admin_get_all_orders(
    order_status: Optional[str] = Query(None, alias="status", description="Filter by status"),
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    """Admin-only: Retrieve all orders across the system with status filters."""
    return await admin_list_orders(db=db, status_filter=order_status)


@router.patch("/admin/{order_id}/status", response_model=OrderResponse, summary="Update order status and dispatch (Admin)")
async def admin_modify_order_status(
    order_id: UUID,
    payload: OrderStatusUpdateRequest,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    """Admin-only: Update order fulfillment status and attach courier tracking info."""
    return await update_order_status(
        db=db,
        order_id=order_id,
        new_status=payload.status,
        tracking_number=payload.tracking_number,
        carrier_name=payload.carrier_name,
        actor_id=admin.id,
    )
