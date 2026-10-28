"""Pydantic schemas for Media Assets and Gallery Items."""
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, Field


class GalleryItemBase(BaseModel):
    title: str = Field(..., max_length=255)
    category: str = Field("labs", max_length=50)
    date: str = Field("", max_length=100)
    location: str = Field("", max_length=255)
    image_url: str = Field(...)
    description: str = Field("")


class GalleryItemCreate(GalleryItemBase):
    id: Optional[str] = None


class GalleryItemUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    date: Optional[str] = None
    location: Optional[str] = None
    image_url: Optional[str] = None
    description: Optional[str] = None


class GalleryItemRead(GalleryItemBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class GalleryBatchSync(BaseModel):
    items: List[GalleryItemCreate]


class MediaAssetCreate(BaseModel):
    filename: str
    file_url: str
    mime_type: str
    size_bytes: int = 0


class MediaAssetRead(BaseModel):
    id: str
    filename: str
    file_url: str
    mime_type: str
    size_bytes: int
    created_at: datetime

    class Config:
        from_attributes = True
