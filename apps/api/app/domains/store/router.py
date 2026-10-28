"""Hardware Store REST API Router."""
from decimal import Decimal
from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.domains.auth.dependencies import require_admin
from app.domains.auth.models import User
from app.domains.store.schemas import (
    CategoryResponse,
    ProductResponse,
    ProductCreateRequest,
    ProductUpdateRequest,
    SKUResponse,
    InventoryAdjustRequest,
)
from app.domains.store.services import (
    list_categories,
    list_products,
    get_product_by_slug,
    get_product_by_id,
    admin_create_product,
    admin_update_product,
    admin_adjust_inventory,
)

router = APIRouter()


@router.get("/categories", response_model=List[CategoryResponse], summary="List all product categories")
async def get_categories(
    db: AsyncSession = Depends(get_db),
):
    """Retrieve all hardware categories with slugs and icons."""
    return await list_categories(db=db)


@router.get("/products", response_model=List[ProductResponse], summary="List hardware products")
async def get_products(
    category: Optional[str] = Query(None, description="Filter by category slug"),
    brand: Optional[str] = Query(None, description="Filter by brand line (PURNA BESS, SaralaChip, etc.)"),
    search: Optional[str] = Query(None, description="Search term across name and descriptions"),
    min_price: Optional[Decimal] = Query(None, description="Minimum price in INR"),
    max_price: Optional[Decimal] = Query(None, description="Maximum price in INR"),
    in_stock_only: bool = Query(False, description="Filter only items currently in stock"),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve published hardware catalog products with active SKUs and live stock."""
    return await list_products(
        db=db,
        category_slug=category,
        brand_line=brand,
        search=search,
        min_price=min_price,
        max_price=max_price,
        in_stock_only=in_stock_only,
        is_published=True,
    )


@router.get("/products/{slug}", response_model=ProductResponse, summary="Get product by slug")
async def get_product_detail(
    slug: str,
    db: AsyncSession = Depends(get_db),
):
    """Retrieve full product details, specs, and SKUs by unique URL slug."""
    product = await get_product_by_slug(db=db, slug=slug)
    if not product or not product.is_published:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product '{slug}' not found",
        )
    return product


# --- Admin Endpoints ---

@router.get("/admin/products", response_model=List[ProductResponse], summary="List all products including drafts (Admin)")
async def admin_get_all_products(
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    """Admin-only: Retrieve all products (published and drafts)."""
    return await list_products(db=db, is_published=None)


@router.post("/admin/products", response_model=ProductResponse, status_code=status.HTTP_201_CREATED, summary="Create product (Admin)")
async def admin_create_new_product(
    payload: ProductCreateRequest,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    """Admin-only: Create a new hardware product with SKUs and stock."""
    return await admin_create_product(db=db, payload=payload, actor_id=admin.id)


@router.patch("/admin/products/{product_id}", response_model=ProductResponse, summary="Update product (Admin)")
async def admin_modify_product(
    product_id: UUID,
    payload: ProductUpdateRequest,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    """Admin-only: Update product info, specifications, or publication state."""
    return await admin_update_product(db=db, product_id=product_id, payload=payload, actor_id=admin.id)


@router.patch("/admin/inventory/{sku_id}", response_model=SKUResponse, summary="Adjust SKU inventory (Admin)")
async def admin_modify_inventory(
    sku_id: UUID,
    payload: InventoryAdjustRequest,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    """Admin-only: Adjust live SKU stock quantity and low stock alert threshold."""
    return await admin_adjust_inventory(
        db=db,
        sku_id=sku_id,
        quantity_available=payload.quantity_available,
        low_stock_threshold=payload.low_stock_threshold,
        actor_id=admin.id,
    )
