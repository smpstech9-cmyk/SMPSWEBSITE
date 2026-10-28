"""VTU Engineering Internships REST API Router."""
from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.domains.auth.dependencies import get_current_user, require_admin
from app.domains.auth.models import User
from app.domains.internships.schemas import (
    InternshipProgramResponse,
    ApplicationCreateRequest,
    ApplicationResponse,
    ApplicationStatusUpdateRequest,
    EnrollmentResponse,
    CertificateVerificationResponse,
)
from app.domains.internships.services import (
    list_programs,
    get_program_by_slug,
    submit_application,
    list_user_applications,
    list_user_enrollments,
    admin_list_applications,
    create_enrollment_for_application,
    update_application_status,
    verify_certificate,
)

router = APIRouter()


@router.get("/programs", response_model=List[InternshipProgramResponse], summary="List internship programs")
async def get_internship_programs(
    domain: Optional[str] = Query(None, description="Filter by domain"),
    branch: Optional[str] = Query(None, description="Filter by engineering branch (e.g. CSE, ECE)"),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve all active VTU accredited internship programs and available batches."""
    return await list_programs(db=db, domain=domain, branch=branch)


@router.get("/programs/{slug}", response_model=InternshipProgramResponse, summary="Get program details")
async def get_internship_program(
    slug: str,
    db: AsyncSession = Depends(get_db),
):
    """Retrieve full curriculum, syllabus modules, and batch availability for a program slug."""
    program = await get_program_by_slug(db=db, slug=slug)
    if not program:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Internship program '{slug}' not found",
        )
    return program


@router.post("/applications", response_model=ApplicationResponse, summary="Submit internship application")
async def apply_for_internship(
    payload: ApplicationCreateRequest,
    request: Request,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Submits a student application for a specific batch.
    Validates VTU seat number (USN), semester bounds (1-8), and ensures seat capacity.
    """
    client_ip = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")

    return await submit_application(
        db=db,
        user=current_user,
        payload=payload,
        ip_address=client_ip,
        user_agent=user_agent,
    )


@router.get("/my-applications", response_model=List[ApplicationResponse], summary="Get my applications")
async def get_my_applications(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve all internship applications submitted by the current authenticated student."""
    return await list_user_applications(db=db, user_id=current_user.id)


@router.get("/my-enrollments", response_model=List[EnrollmentResponse], summary="Get my active enrollments")
async def get_my_enrollments(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve all confirmed course enrollments and certificate status for the current student."""
    return await list_user_enrollments(db=db, user_id=current_user.id)


@router.get("/admin/applications", response_model=List[ApplicationResponse], summary="Admin: List applications")
async def admin_get_applications(
    status_filter: Optional[str] = Query(None, alias="status"),
    admin_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """Administrative retrieval of all student applications with review status filtering."""
    return await admin_list_applications(db=db, status_filter=status_filter)


@router.post("/admin/applications/{application_id}/enroll", response_model=EnrollmentResponse, summary="Admin: Confirm enrollment")
async def admin_confirm_enrollment(
    application_id: UUID,
    admin_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """Manually approve and issue a sequential enrollment number for an application."""
    return await create_enrollment_for_application(
        db=db,
        application_id=application_id,
        actor_id=admin_user.id,
    )


@router.patch("/admin/applications/{application_id}/status", response_model=ApplicationResponse, summary="Admin: Update status")
async def admin_update_status(
    application_id: UUID,
    payload: ApplicationStatusUpdateRequest,
    admin_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """Admin endpoint to update student application status (PENDING, APPROVED, REJECTED)."""
    return await update_application_status(
        db=db,
        application_id=application_id,
        new_status=payload.status,
        actor_id=admin_user.id,
    )


@router.get("/verify/{certificate_id}", response_model=CertificateVerificationResponse, summary="Public certificate verification")
async def verify_internship_certificate(
    certificate_id: str,
    db: AsyncSession = Depends(get_db),
):
    """
    Publicly verifiable endpoint for university registrars and employers to confirm
    VTU-VRIF Center internship credentials and digital signature hashes.
    """
    return await verify_certificate(db=db, certificate_id=certificate_id)

