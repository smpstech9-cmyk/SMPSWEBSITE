"""Pydantic schemas for Site Content payload validation."""
from typing import Any, Dict, Optional
from datetime import datetime
from pydantic import BaseModel, Field


class ContentPayload(BaseModel):
    data: Dict[str, Any] = Field(..., description="Arbitrary nested CMS content dictionary")


class ContentResponse(BaseModel):
    key: str
    data: Dict[str, Any]
    updated_at: datetime

    class Config:
        from_attributes = True
