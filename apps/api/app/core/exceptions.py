"""Standardized RFC 7807 error envelopes and global exception definitions."""
from pydantic import BaseModel
from typing import List, Optional, Any


class ErrorDetail(BaseModel):
    field: Optional[str] = None
    issue: str


class ErrorEnvelope(BaseModel):
    code: str
    message: str
    request_id: Optional[str] = None
    details: Optional[List[ErrorDetail]] = None


class StandardAPIException(Exception):
    def __init__(self, code: str, message: str, status_code: int = 400, details: Any = None):
        self.code = code
        self.message = message
        self.status_code = status_code
        self.details = details
