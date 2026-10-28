"""FastAPI router for Gallery items and Media assets."""
import uuid
from typing import List
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from app.core.database import get_db
from app.domains.media.models import GalleryItem, MediaAsset
from app.domains.media.schemas import (
    GalleryItemCreate,
    GalleryItemUpdate,
    GalleryItemRead,
    GalleryBatchSync,
    MediaAssetCreate,
    MediaAssetRead,
)

router = APIRouter()


@router.get("/gallery", response_model=List[GalleryItemRead])
async def list_gallery_items(db: AsyncSession = Depends(get_db)):
    """Fetch all showcase gallery items from the database."""
    stmt = select(GalleryItem).order_by(GalleryItem.created_at.desc())
    result = await db.execute(stmt)
    return result.scalars().all()


@router.post("/gallery", response_model=GalleryItemRead, status_code=status.HTTP_201_CREATED)
async def create_gallery_item(payload: GalleryItemCreate, db: AsyncSession = Depends(get_db)):
    """Create a new gallery item in the database."""
    item_id = payload.id if payload.id else f"gal-{uuid.uuid4().hex[:10]}"
    
    # Check if ID already exists
    existing = await db.get(GalleryItem, item_id)
    if existing:
        existing.title = payload.title
        existing.category = payload.category
        existing.date = payload.date
        existing.location = payload.location
        existing.image_url = payload.image_url
        existing.description = payload.description
        existing.updated_at = datetime.now(timezone.utc)
        await db.commit()
        await db.refresh(existing)
        return existing

    new_item = GalleryItem(
        id=item_id,
        title=payload.title,
        category=payload.category,
        date=payload.date,
        location=payload.location,
        image_url=payload.image_url,
        description=payload.description,
    )
    db.add(new_item)
    await db.commit()
    await db.refresh(new_item)
    return new_item


@router.put("/gallery/{item_id}", response_model=GalleryItemRead)
async def update_gallery_item(item_id: str, payload: GalleryItemUpdate, db: AsyncSession = Depends(get_db)):
    """Update an existing gallery item in the database."""
    item = await db.get(GalleryItem, item_id)
    if not item:
        raise HTTPException(status_code=404, detail=f"Gallery item with ID {item_id} not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, val in update_data.items():
        setattr(item, field, val)

    item.updated_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(item)
    return item


@router.delete("/gallery/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_gallery_item(item_id: str, db: AsyncSession = Depends(get_db)):
    """Delete a gallery item by ID."""
    item = await db.get(GalleryItem, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    await db.delete(item)
    await db.commit()
    return None


@router.post("/gallery/batch", response_model=List[GalleryItemRead])
async def batch_sync_gallery(payload: GalleryBatchSync, db: AsyncSession = Depends(get_db)):
    """Batch synchronize gallery items to authoritative database storage."""
    # Delete existing items and write current list
    await db.execute(delete(GalleryItem))
    
    saved_items = []
    for item in payload.items:
        new_obj = GalleryItem(
            id=item.id or f"gal-{uuid.uuid4().hex[:10]}",
            title=item.title,
            category=item.category,
            date=item.date,
            location=item.location,
            image_url=item.image_url,
            description=item.description,
        )
        db.add(new_obj)
        saved_items.append(new_obj)

    await db.commit()
    for obj in saved_items:
        await db.refresh(obj)
    return saved_items


@router.post("/media/record", response_model=MediaAssetRead, status_code=status.HTTP_201_CREATED)
async def record_media_asset(payload: MediaAssetCreate, db: AsyncSession = Depends(get_db)):
    """Record a newly uploaded media asset in the database."""
    asset = MediaAsset(
        id=f"asset-{uuid.uuid4().hex[:12]}",
        filename=payload.filename,
        file_url=payload.file_url,
        mime_type=payload.mime_type,
        size_bytes=payload.size_bytes,
    )
    db.add(asset)
    await db.commit()
    await db.refresh(asset)
    return asset


@router.get("/media", response_model=List[MediaAssetRead])
async def list_media_assets(db: AsyncSession = Depends(get_db)):
    """List recent uploaded media assets recorded in the database."""
    stmt = select(MediaAsset).order_by(MediaAsset.created_at.desc()).limit(50)
    result = await db.execute(stmt)
    return result.scalars().all()
