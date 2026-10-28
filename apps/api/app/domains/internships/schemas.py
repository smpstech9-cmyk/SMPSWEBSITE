"""Pydantic v2 schemas for VTU Internships, Batches, Applications, and Enrollments."""
from uuid import UUID
from datetime import date, datetime
from decimal import Decimal
from typing import Optional, List, Any, Dict
from pydantic import BaseModel, Field, ConfigDict


class BatchResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    program_id: UUID
    batch_code: str
    start_date: date
    end_date: date
    mode: str
    location: Optional[str] = None
    capacity: int
    enrolled_count: int
    price_inr: Decimal
    is_open: bool


class InternshipProgramResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    title: str
    domain: str
    target_branches: List[str]
    description: str
    syllabus_json: Dict[str, Any]
    eligibility_criteria: str
    duration_weeks: int
    is_active: bool
    batches: List[BatchResponse] = []


class ApplicationCreateRequest(BaseModel):
    batch_id: UUID
    college_name: str = Field(..., min_length=3, max_length=200)
    usn: str = Field(..., min_length=8, max_length=20, pattern=r"^[1-4][A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}$")
    branch: str = Field(..., min_length=2, max_length=50)
    semester: int = Field(..., ge=1, le=8)
    cgpa: Optional[Decimal] = Field(None, ge=Decimal("0.0"), le=Decimal("10.0"))
    resume_url: Optional[str] = None


class ApplicationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    user_id: UUID
    batch_id: UUID
    college_name: str
    usn: str
    branch: str
    semester: int
    cgpa: Optional[Decimal] = None
    status: str
    applied_at: datetime
    batch: Optional[BatchResponse] = None


class ApplicationStatusUpdateRequest(BaseModel):
    status: str = Field(..., pattern=r"^(PENDING|APPROVED|REJECTED|ENROLLED)$")


class EnrollmentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    application_id: UUID
    user_id: UUID
    batch_id: UUID
    enrollment_number: str
    status: str
    attendance_percent: Decimal
    certificate_issued: bool
    certificate_id: Optional[str] = None
    created_at: datetime
    batch: Optional[BatchResponse] = None


class CertificateVerificationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    certificate_id: str
    status: str
    student_name: str
    usn: str
    college_name: str
    program_title: str
    domain: str
    batch_code: str
    duration_weeks: int
    attendance_percent: Decimal
    issue_date: str
    issuer: str
    digital_signature_hash: str

