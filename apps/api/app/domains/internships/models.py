"""SQLAlchemy 2.0 models for VTU Internships, Batches, Applications, and Enrollments."""
import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    String,
    Text,
    DateTime,
    Date,
    ForeignKey,
    Integer,
    Numeric,
    Boolean,
    CheckConstraint,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship
from app.core.database import Base, CompatibleJSON, CompatibleStringArray, CompatibleUUID as UUID


class InternshipProgram(Base):
    __tablename__ = "internship_programs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug = Column(String(100), unique=True, nullable=False, index=True)
    title = Column(String(255), nullable=False)
    domain = Column(String(100), nullable=False, index=True)  # Power Electronics, EV, IoT, BMS
    target_branches = Column(CompatibleStringArray, nullable=False)  # ['ECE', 'EEE', 'CSE', 'MECH']
    description = Column(Text, nullable=False)
    syllabus_json = Column(CompatibleJSON, nullable=False)  # Modules, practicals, outcomes
    eligibility_criteria = Column(Text, nullable=False)
    duration_weeks = Column(Integer, nullable=False, default=4)
    certificate_template = Column(String(100), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False, index=True)

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    batches = relationship("Batch", back_populates="program", cascade="all, delete-orphan")


class Batch(Base):
    __tablename__ = "batches"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    program_id = Column(UUID(as_uuid=True), ForeignKey("internship_programs.id", ondelete="RESTRICT"), nullable=False, index=True)
    batch_code = Column(String(50), unique=True, nullable=False, index=True)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    mode = Column(String(30), nullable=False)  # OFFLINE_BENGALURU_VTU, HYBRID
    location = Column(String(255), default="VTU-VRIF-TCOE Building, Nagarbhavi, Bengaluru")
    capacity = Column(Integer, nullable=False)
    enrolled_count = Column(Integer, default=0, nullable=False)
    price_inr = Column(Numeric(10, 2), nullable=False)  # Authoritative fee (no float)
    is_open = Column(Boolean, default=True, nullable=False, index=True)

    __table_args__ = (
        CheckConstraint("capacity > 0", name="check_positive_capacity"),
        CheckConstraint("enrolled_count >= 0", name="check_non_negative_enrolled"),
        CheckConstraint("enrolled_count <= capacity", name="check_capacity_not_exceeded"),
        CheckConstraint("price_inr >= 0", name="check_non_negative_program_price"),
    )

    program = relationship("InternshipProgram", back_populates="batches")
    applications = relationship("Application", back_populates="batch")
    enrollments = relationship("Enrollment", back_populates="batch")


class Application(Base):
    __tablename__ = "applications"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    batch_id = Column(UUID(as_uuid=True), ForeignKey("batches.id", ondelete="RESTRICT"), nullable=False, index=True)
    college_name = Column(String(255), nullable=False)
    usn = Column(String(50), nullable=False, index=True)  # VTU University Seat Number
    branch = Column(String(50), nullable=False)
    semester = Column(Integer, nullable=False)
    cgpa = Column(Numeric(4, 2), nullable=True)
    resume_url = Column(String(500), nullable=True)
    status = Column(String(30), default="PENDING", nullable=False, index=True)  # PENDING, APPROVED, REJECTED, ENROLLED
    review_notes = Column(Text, nullable=True)

    applied_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    reviewed_at = Column(DateTime(timezone=True), nullable=True)

    __table_args__ = (
        UniqueConstraint("user_id", "batch_id", name="uq_user_batch_application"),
        CheckConstraint("semester >= 1 AND semester <= 8", name="check_valid_semester"),
    )

    user = relationship("User", back_populates="applications")
    batch = relationship("Batch", back_populates="applications")
    enrollment = relationship("Enrollment", back_populates="application", uselist=False)


class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    application_id = Column(UUID(as_uuid=True), ForeignKey("applications.id", ondelete="RESTRICT"), unique=True, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="RESTRICT"), nullable=False, index=True)
    batch_id = Column(UUID(as_uuid=True), ForeignKey("batches.id", ondelete="RESTRICT"), nullable=False, index=True)
    enrollment_number = Column(String(60), unique=True, nullable=False, index=True)  # SMPS-VTU-YYYY-XXXX
    status = Column(String(30), default="CONFIRMED", nullable=False, index=True)  # CONFIRMED, COMPLETED, CANCELLED
    attendance_percent = Column(Numeric(5, 2), default=0.00)
    certificate_issued = Column(Boolean, default=False)
    certificate_id = Column(String(100), unique=True, nullable=True)

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    completed_at = Column(DateTime(timezone=True), nullable=True)

    user = relationship("User", back_populates="enrollments")
    batch = relationship("Batch", back_populates="enrollments")
    application = relationship("Application", back_populates="enrollment")
