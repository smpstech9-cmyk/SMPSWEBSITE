"""Hardware Store Domain Services: Categories, Products, SKUs, and Inventory management."""
import uuid
from uuid import UUID
from datetime import datetime, timezone
from decimal import Decimal
from typing import Optional, List, Dict, Any

from fastapi import HTTPException, status
from sqlalchemy import select, and_, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.domains.store.models import Category, Product, SKU, Inventory
from app.domains.store.schemas import ProductCreateRequest, ProductUpdateRequest, InventoryAdjustRequest
from app.domains.auth.services import log_audit_event


async def list_categories(db: AsyncSession) -> List[Category]:
    """Retrieve all store product categories."""
    stmt = select(Category).order_by(Category.name.asc())
    result = await db.execute(stmt)
    return list(result.scalars().all())


async def get_category_by_slug(db: AsyncSession, slug: str) -> Optional[Category]:
    """Retrieve single category by its slug."""
    stmt = select(Category).where(Category.slug == slug)
    result = await db.execute(stmt)
    return result.scalars().first()


async def list_products(
    db: AsyncSession,
    category_slug: Optional[str] = None,
    brand_line: Optional[str] = None,
    search: Optional[str] = None,
    min_price: Optional[Decimal] = None,
    max_price: Optional[Decimal] = None,
    in_stock_only: bool = False,
    is_published: Optional[bool] = True,
) -> List[Product]:
    """Retrieve catalog products with SKUs and stock, supporting multifaceted filtering."""
    stmt = (
        select(Product)
        .options(
            selectinload(Product.category),
            selectinload(Product.skus).selectinload(SKU.inventory),
        )
        .order_by(Product.created_at.desc())
    )

    if is_published is not None:
        stmt = stmt.where(Product.is_published == is_published)

    if category_slug:
        cat_stmt = select(Category.id).where(Category.slug == category_slug)
        cat_res = await db.execute(cat_stmt)
        cat_id = cat_res.scalar_one_or_none()
        if cat_id:
            stmt = stmt.where(Product.category_id == cat_id)
        else:
            return []

    if brand_line:
        stmt = stmt.where(Product.brand_line.ilike(f"%{brand_line}%"))

    if search:
        search_pattern = f"%{search}%"
        stmt = stmt.where(
            or_(
                Product.name.ilike(search_pattern),
                Product.short_description.ilike(search_pattern),
                Product.description.ilike(search_pattern),
            )
        )

    result = await db.execute(stmt)
    products = list(result.scalars().all())

    # In-memory filtering for SKU-level attributes (price and inventory availability)
    if min_price is not None or max_price is not None or in_stock_only:
        filtered = []
        for prod in products:
            active_skus = [s for s in prod.skus if s.is_active]
            if not active_skus:
                continue

            # Check price boundaries across product's active SKUs
            sku_prices = [s.price_inr for s in active_skus]
            if min_price is not None and not any(p >= min_price for p in sku_prices):
                continue
            if max_price is not None and not any(p <= max_price for p in sku_prices):
                continue

            # Check stock availability
            if in_stock_only:
                has_stock = any((s.inventory.quantity_available > 0) for s in active_skus if s.inventory)
                if not has_stock:
                    continue

            filtered.append(prod)
        return filtered

    return products


async def get_product_by_slug(db: AsyncSession, slug: str) -> Optional[Product]:
    """Retrieve product by unique URL slug with category and full SKU inventory data."""
    stmt = (
        select(Product)
        .options(
            selectinload(Product.category),
            selectinload(Product.skus).selectinload(SKU.inventory),
        )
        .where(Product.slug == slug)
    )
    result = await db.execute(stmt)
    return result.scalars().first()


async def get_product_by_id(db: AsyncSession, product_id: UUID) -> Optional[Product]:
    """Retrieve product by UUID with category and full SKU inventory data."""
    stmt = (
        select(Product)
        .options(
            selectinload(Product.category),
            selectinload(Product.skus).selectinload(SKU.inventory),
        )
        .where(Product.id == product_id)
    )
    result = await db.execute(stmt)
    return result.scalars().first()


async def admin_create_product(
    db: AsyncSession,
    payload: ProductCreateRequest,
    actor_id: UUID,
) -> Product:
    """Create a new product with initial SKUs and inventory tracking (Admin only)."""
    # Check category existence
    cat = await db.get(Category, payload.category_id)
    if not cat:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category '{payload.category_id}' does not exist.",
        )

    # Check slug uniqueness
    stmt = select(Product).where(Product.slug == payload.slug)
    existing = (await db.execute(stmt)).scalars().first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Product with slug '{payload.slug}' already exists.",
        )

    new_prod = Product(
        id=uuid.uuid4(),
        category_id=payload.category_id,
        slug=payload.slug,
        name=payload.name,
        brand_line=payload.brand_line,
        short_description=payload.short_description,
        description=payload.description,
        specifications_json=payload.specifications_json or {},
        datasheet_url=payload.datasheet_url,
        primary_image_url=payload.primary_image_url,
        is_published=payload.is_published,
    )
    db.add(new_prod)
    await db.flush()

    # Create associated SKUs and their inventory records
    for sku_req in payload.skus:
        # Check sku_code uniqueness
        sku_stmt = select(SKU).where(SKU.sku_code == sku_req.sku_code)
        dup_sku = (await db.execute(sku_stmt)).scalars().first()
        if dup_sku:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"SKU code '{sku_req.sku_code}' already exists.",
            )

        new_sku = SKU(
            id=uuid.uuid4(),
            product_id=new_prod.id,
            sku_code=sku_req.sku_code,
            title=sku_req.title,
            price_inr=sku_req.price_inr,
            hsn_code=sku_req.hsn_code,
            tax_rate_percent=sku_req.tax_rate_percent,
            weight_kg=sku_req.weight_kg,
            is_active=True,
        )
        db.add(new_sku)
        await db.flush()

        new_inv = Inventory(
            sku_id=new_sku.id,
            quantity_available=sku_req.initial_stock,
            quantity_reserved=0,
            low_stock_threshold=5,
        )
        db.add(new_inv)

    await db.commit()

    await log_audit_event(
        db=db,
        user_id=actor_id,
        action="admin.create_product",
        resource_type="products",
        resource_id=str(new_prod.id),
        changes={"slug": new_prod.slug, "name": new_prod.name, "skus_count": len(payload.skus)},
    )

    # Return eagerly loaded product
    return await get_product_by_id(db, new_prod.id)  # type: ignore


async def admin_update_product(
    db: AsyncSession,
    product_id: UUID,
    payload: ProductUpdateRequest,
    actor_id: UUID,
) -> Product:
    """Update product information and publication state (Admin only)."""
    product = await get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    updates = payload.model_dump(exclude_unset=True)
    for field, value in updates.items():
        setattr(product, field, value)

    await db.commit()

    await log_audit_event(
        db=db,
        user_id=actor_id,
        action="admin.update_product",
        resource_type="products",
        resource_id=str(product.id),
        changes={"updates": updates},
    )

    return await get_product_by_id(db, product_id)  # type: ignore


async def admin_adjust_inventory(
    db: AsyncSession,
    sku_id: UUID,
    quantity_available: int,
    low_stock_threshold: Optional[int],
    actor_id: UUID,
) -> SKU:
    """Adjust live inventory quantity and threshold for a SKU (Admin only)."""
    stmt = (
        select(SKU)
        .options(selectinload(SKU.inventory), selectinload(SKU.product))
        .where(SKU.id == sku_id)
    )
    res = await db.execute(stmt)
    sku = res.scalars().first()
    if not sku:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="SKU not found",
        )

    if not sku.inventory:
        inv = Inventory(
            sku_id=sku.id,
            quantity_available=quantity_available,
            quantity_reserved=0,
            low_stock_threshold=low_stock_threshold or 5,
        )
        db.add(inv)
        sku.inventory = inv
    else:
        sku.inventory.quantity_available = quantity_available
        if low_stock_threshold is not None:
            sku.inventory.low_stock_threshold = low_stock_threshold

    await db.commit()

    reloaded = await db.execute(
        select(SKU).options(selectinload(SKU.inventory), selectinload(SKU.product)).where(SKU.id == sku_id)
    )
    sku = reloaded.scalars().first()


    await log_audit_event(
        db=db,
        user_id=actor_id,
        action="admin.adjust_inventory",
        resource_type="skus",
        resource_id=str(sku.id),
        changes={
            "sku_code": sku.sku_code,
            "new_quantity_available": quantity_available,
            "low_stock_threshold": low_stock_threshold,
        },
    )

    return sku
