"""FastAPI router for Authoritative CMS Site Content storage."""
from datetime import datetime, timezone
from typing import Any, Dict
from fastapi import APIRouter, Depends, HTTPException, status, Body
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.domains.content.models import SiteContent

router = APIRouter()

MASTER_KEY = "master"


@router.get("", response_model=Dict[str, Any])
async def get_master_content(db: AsyncSession = Depends(get_db)):
    """Fetch authoritative site content JSON from the persistent database."""
    stmt = select(SiteContent).where(SiteContent.key == MASTER_KEY)
    result = await db.execute(stmt)
    record = result.scalar_one_or_none()
    if not record:
        return {}
    return record.data


@router.put("", response_model=Dict[str, Any])
async def save_master_content(
    payload: Dict[str, Any] = Body(...),
    db: AsyncSession = Depends(get_db),
):
    """Save or update authoritative site content JSON into the database."""
    stmt = select(SiteContent).where(SiteContent.key == MASTER_KEY)
    result = await db.execute(stmt)
    record = result.scalar_one_or_none()

    now = datetime.now(timezone.utc)
    if record:
        record.data = payload
        record.updated_at = now
    else:
        record = SiteContent(key=MASTER_KEY, data=payload, updated_at=now)
        db.add(record)

    await db.commit()
    await db.refresh(record)
    return record.data


@router.get("/section/{section_name}", response_model=Dict[str, Any])
async def get_section_content(
    section_name: str,
    db: AsyncSession = Depends(get_db),
):
    """Fetch a specific section content from master site content."""
    stmt = select(SiteContent).where(SiteContent.key == MASTER_KEY)
    result = await db.execute(stmt)
    record = result.scalar_one_or_none()
    if not record or not isinstance(record.data, dict):
        return {}
    return record.data.get(section_name, {})


@router.put("/section/{section_name}", response_model=Dict[str, Any])
async def update_section_content(
    section_name: str,
    payload: Any = Body(...),
    db: AsyncSession = Depends(get_db),
):
    """Update a specific section in master site content and persist to database."""
    stmt = select(SiteContent).where(SiteContent.key == MASTER_KEY)
    result = await db.execute(stmt)
    record = result.scalar_one_or_none()

    now = datetime.now(timezone.utc)
    if record:
        data = dict(record.data) if isinstance(record.data, dict) else {}
        data[section_name] = payload
        record.data = data
        record.updated_at = now
    else:
        record = SiteContent(key=MASTER_KEY, data={section_name: payload}, updated_at=now)
        db.add(record)

    await db.commit()
    await db.refresh(record)
    return record.data
