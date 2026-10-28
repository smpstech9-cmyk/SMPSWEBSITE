"""
FastAPI router for transactional communications and notification testing.
"""
from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from app.domains.communications.services import CommunicationsService

router = APIRouter()


class TestNotificationRequest(BaseModel):
    to_email: EmailStr
    template: str
    student_name: str = "Aarav Sharma"
    usn: str = "1BM22EC045"
    program_title: str = "Power Electronics & SMPS Design"
    enrollment_number: str = "VTU-PE-2026-0042"
    order_number: str = "SMPS-ORD-20261026-62A8"


@router.post("/send-test")
async def send_test_notification(payload: TestNotificationRequest):
    """Trigger a sample transactional communication for audit verification."""
    if payload.template == "application_received":
        return await CommunicationsService.send_application_received(
            to_email=payload.to_email,
            student_name=payload.student_name,
            usn=payload.usn,
            program_title=payload.program_title,
        )
    elif payload.template == "enrollment_approved":
        return await CommunicationsService.send_enrollment_approved(
            to_email=payload.to_email,
            student_name=payload.student_name,
            enrollment_number=payload.enrollment_number,
            batch_code="VTU-PE-2026-B1",
            start_date="15-Nov-2026",
        )
    elif payload.template == "order_confirmation":
        return await CommunicationsService.send_order_confirmation(
            to_email=payload.to_email,
            order_number=payload.order_number,
            total_amount="17,11,000",
            invoice_url="http://localhost:3000/receipts?orderNumber=" + payload.order_number,
        )
    elif payload.template == "certificate_awarded":
        return await CommunicationsService.send_certificate_awarded(
            to_email=payload.to_email,
            student_name=payload.student_name,
            certificate_id="VTU-CERT-2026-SMPS-882",
            program_title=payload.program_title,
            verification_url="http://localhost:3000/verify/VTU-CERT-2026-SMPS-882",
        )
    return {"status": "UNKNOWN_TEMPLATE", "available": ["application_received", "enrollment_approved", "order_confirmation", "certificate_awarded"]}
