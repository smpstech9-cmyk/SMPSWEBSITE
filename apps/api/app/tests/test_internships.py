"""VTU Engineering Internships Domain Unit & Integration Tests."""
import uuid
from decimal import Decimal
from datetime import date, timedelta
import pytest
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from app.core.database import Base
from app.domains.auth.models import User, Role, UserRole
from app.domains.orders.models import Order, OrderItem
from app.domains.payments.models import Payment, PaymentEvent
from app.domains.internships.models import InternshipProgram, Batch, Application, Enrollment
from app.domains.internships.schemas import ApplicationCreateRequest
from app.domains.internships.services import (
    list_programs,
    get_program_by_slug,
    submit_application,
    list_user_applications,
    create_enrollment_for_application,
    update_application_status,
)


@pytest.fixture
async def async_internship_db():
    """In-memory async SQLite engine with schema and sample program/batch seeded."""
    engine = create_async_engine("sqlite+aiosqlite:///:memory:")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    AsyncSession = async_sessionmaker(bind=engine, expire_on_commit=False)
    async with AsyncSession() as session:
        # Create student user
        user = User(
            id=uuid.uuid4(),
            email="aarav.student@vtu.ac.in",
            full_name="Aarav Sharma",
            is_active=1,
        )
        # Create sample internship program
        program = InternshipProgram(
            id=uuid.uuid4(),
            slug="bess-battery-engineering",
            title="PURNA BESS™ Battery Storage Internship",
            domain="Power Electronics",
            target_branches=["EEE", "ECE", "MECH"],
            description="Hands-on 100kWh BESS testing and battery management systems.",
            syllabus_json={"modules": ["Cell chemistry", "BMS firmware", "Grid PCS integration"]},
            eligibility_criteria="VTU engineering students 5th-8th sem",
            duration_weeks=6,
            is_active=True,
        )
        batch = Batch(
            id=uuid.uuid4(),
            program_id=program.id,
            batch_code="BESS-2025-JAN-B1",
            start_date=date.today() + timedelta(days=10),
            end_date=date.today() + timedelta(days=50),
            mode="OFFLINE_BENGALURU_VTU",
            capacity=30,
            enrolled_count=0,
            price_inr=Decimal("12500.00"),
            is_open=True,
        )
        session.add_all([user, program, batch])
        await session.commit()

        yield {
            "session": session,
            "user": user,
            "program": program,
            "batch": batch,
        }


@pytest.mark.asyncio
async def test_list_programs_and_domain_filter(async_internship_db):
    """Verifies listing of active programs and filtering by domain and branch."""
    session = async_internship_db["session"]

    # All programs
    programs = await list_programs(session)
    assert len(programs) >= 1
    assert programs[0].slug == "bess-battery-engineering"
    assert len(programs[0].batches) == 1

    # Filter by domain
    power_progs = await list_programs(session, domain="Power Electronics")
    assert len(power_progs) == 1

    empty_progs = await list_programs(session, domain="NonExistentDomain")
    assert len(empty_progs) == 0

    # Filter by branch
    ece_progs = await list_programs(session, branch="ECE")
    assert len(ece_progs) == 1


@pytest.mark.asyncio
async def test_get_program_by_slug(async_internship_db):
    """Verifies program retrieval with attached batches by unique slug."""
    session = async_internship_db["session"]
    prog = await get_program_by_slug(session, "bess-battery-engineering")
    assert prog is not None
    assert prog.title == "PURNA BESS™ Battery Storage Internship"
    assert prog.batches[0].batch_code == "BESS-2025-JAN-B1"


@pytest.mark.asyncio
async def test_submit_valid_application(async_internship_db):
    """Verifies successful application creation with valid VTU USN."""
    session = async_internship_db["session"]
    user = async_internship_db["user"]
    batch = async_internship_db["batch"]

    payload = ApplicationCreateRequest(
        batch_id=batch.id,
        college_name="R.V. College of Engineering",
        usn="1RV21EC045",
        branch="ECE",
        semester=6,
        cgpa=Decimal("8.85"),
    )

    app = await submit_application(session, user, payload)
    assert app is not None
    assert app.usn == "1RV21EC045"
    assert app.status in ("PENDING", "APPROVED")
    assert app.college_name == "R.V. College of Engineering"

    # Verify student can list their applications
    user_apps = await list_user_applications(session, user.id)
    assert len(user_apps) == 1
    assert user_apps[0].id == app.id


@pytest.mark.asyncio
async def test_duplicate_application_rejected(async_internship_db):
    """Verifies that duplicate applications by the same user to the same batch are rejected with 409."""
    session = async_internship_db["session"]
    user = async_internship_db["user"]
    batch = async_internship_db["batch"]

    payload = ApplicationCreateRequest(
        batch_id=batch.id,
        college_name="BMS College of Engineering",
        usn="1BM21EC012",
        branch="ECE",
        semester=6,
    )

    # First submission -> Success
    await submit_application(session, user, payload)

    # Second submission -> 409 Conflict
    with pytest.raises(HTTPException) as exc_info:
        await submit_application(session, user, payload)
    assert exc_info.value.status_code == 409
    assert "already submitted an application" in exc_info.value.detail.lower()


@pytest.mark.asyncio
async def test_batch_capacity_rejection(async_internship_db):
    """Verifies that an application to a fully booked batch is rejected."""
    session = async_internship_db["session"]
    user = async_internship_db["user"]
    batch = async_internship_db["batch"]

    # Set batch capacity to equal enrolled count
    batch.capacity = 1
    batch.enrolled_count = 1
    await session.commit()

    payload = ApplicationCreateRequest(
        batch_id=batch.id,
        college_name="MSRIT",
        usn="1MS21CS099",
        branch="CSE",
        semester=5,
    )

    with pytest.raises(HTTPException) as exc_info:
        await submit_application(session, user, payload)
    assert exc_info.value.status_code == 400
    assert "capacity is fully booked" in exc_info.value.detail.lower()


@pytest.mark.asyncio
async def test_create_enrollment_and_number_generation(async_internship_db):
    """Verifies enrollment confirmation, batch enrolled counter increment, and enrollment number format."""
    session = async_internship_db["session"]
    user = async_internship_db["user"]
    batch = async_internship_db["batch"]

    payload = ApplicationCreateRequest(
        batch_id=batch.id,
        college_name="PES University",
        usn="1PE21EE030",
        branch="EEE",
        semester=7,
    )
    app = await submit_application(session, user, payload)
    initial_enrolled = batch.enrolled_count

    # Confirm enrollment
    enrollment = await create_enrollment_for_application(session, app.id)
    assert enrollment is not None
    assert enrollment.enrollment_number.startswith("SMPS-VTU-")
    assert enrollment.status == "CONFIRMED"
    assert batch.enrolled_count == initial_enrolled + 1


@pytest.mark.asyncio
async def test_update_application_status(async_internship_db):
    """Verifies admin status modification with status transitions and audit trail."""
    session = async_internship_db["session"]
    user = async_internship_db["user"]
    batch = async_internship_db["batch"]

    payload = ApplicationCreateRequest(
        batch_id=batch.id,
        college_name="BMS College of Engineering",
        usn="1BM22EC015",
        branch="ECE",
        semester=6,
    )
    app = await submit_application(session, user, payload)
    assert app.status == "APPROVED"

    # Reject application
    updated = await update_application_status(session, app.id, "REJECTED")
    assert updated.status == "REJECTED"
