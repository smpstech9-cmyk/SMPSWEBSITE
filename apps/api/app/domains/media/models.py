"""SQLAlchemy 2.0 models for Media Assets and Showcase Gallery Items."""
import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    String,
    Text,
    DateTime,
    Integer,
)
from app.core.database import Base


class GalleryItem(Base):
    __tablename__ = "gallery_items"

    id = Column(String(100), primary_key=True, default=lambda: f"gal-{uuid.uuid4().hex[:10]}")
    title = Column(String(255), nullable=False)
    category = Column(String(50), nullable=False, default="labs", index=True)
    date = Column(String(100), nullable=False, default="")
    location = Column(String(255), nullable=False, default="")
    image_url = Column(Text, nullable=False)
    description = Column(Text, nullable=False, default="")

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)


class MediaAsset(Base):
    __tablename__ = "media_assets"

    id = Column(String(100), primary_key=True, default=lambda: f"asset-{uuid.uuid4().hex[:12]}")
    filename = Column(String(255), nullable=False)
    file_url = Column(String(500), nullable=False, index=True)
    mime_type = Column(String(100), nullable=False)
    size_bytes = Column(Integer, nullable=False, default=0)

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
