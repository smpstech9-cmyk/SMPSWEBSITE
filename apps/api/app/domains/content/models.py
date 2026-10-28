"""Database models for persistent Site Content / CMS storage."""
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime
from app.core.database import Base, CompatibleJSON


class SiteContent(Base):
    """Stores full site JSON content or sectional content key-values in SQLite/PostgreSQL."""
    __tablename__ = "site_contents"

    key = Column(String(100), primary_key=True, index=True)
    data = Column(CompatibleJSON, nullable=False)
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
