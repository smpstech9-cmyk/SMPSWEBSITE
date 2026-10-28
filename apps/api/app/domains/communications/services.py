"""
SMPS Tech Lab - Transactional Notification and Communications Service.
Supports automated dispatch for Admissions, Orders, Invoices, and VTU Certificates.
"""
import logging
from typing import Dict, Any, Optional

logger = logging.getLogger("smps.communications")


class CommunicationsService:
    @staticmethod
    async def send_email(
        to_email: str,
        subject: str,
        html_content: str,
        metadata: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """Dispatch transactional email. In development, logs cleanly and returns mock receipt."""
        logger.info(f"[EMAIL DISPATCH] To: {to_email} | Subject: {subject}")
        return {
            "status": "SENT",
            "provider": "MOCK_RESEND",
            "to": to_email,
            "subject": subject,
            "message_id": f"msg_{hash(to_email + subject) & 0xffffffff:08x}",
        }

    @classmethod
    async def send_application_received(
        cls, to_email: str, student_name: str, usn: str, program_title: str
    ) -> Dict[str, Any]:
        subject = f"Application Received: {program_title} — SMPS Tech Lab"
        html = f"""
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1d1d1f; border: 1px solid #e5e5ea; border-radius: 16px;">
            <div style="background: #0071e3; color: white; padding: 16px 20px; border-radius: 12px; font-weight: bold; font-size: 16px;">
                SMPS Tech Lab • VTU-VRIF Center of Excellence
            </div>
            <h2 style="font-size: 20px; font-weight: 800; margin-top: 24px;">Application Received</h2>
            <p>Dear {student_name},</p>
            <p>Thank you for applying to the <strong>{program_title}</strong> internship program at our Bengaluru VTU facility.</p>
            <div style="background: #fbfbfd; border: 1px solid #e5e5ea; border-radius: 12px; padding: 16px; margin: 20px 0;">
                <p style="margin: 4px 0; font-size: 13px;"><strong>Student USN:</strong> {usn}</p>
                <p style="margin: 4px 0; font-size: 13px;"><strong>Program:</strong> {program_title}</p>
                <p style="margin: 4px 0; font-size: 13px;"><strong>Status:</strong> Under Academic Clearance Screening</p>
            </div>
            <p style="font-size: 13px; color: #6e6e73;">You will receive another update once the lab director reviews your eligibility credentials.</p>
        </div>
        """
        return await cls.send_email(to_email, subject, html)

    @classmethod
    async def send_enrollment_approved(
        cls,
        to_email: str,
        student_name: str,
        enrollment_number: str,
        batch_code: str,
        start_date: str,
    ) -> Dict[str, Any]:
        subject = f"Congratulations! Enrollment Confirmed: {enrollment_number} — SMPS Tech Lab"
        html = f"""
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1d1d1f; border: 1px solid #e5e5ea; border-radius: 16px;">
            <div style="background: #10b981; color: white; padding: 16px 20px; border-radius: 12px; font-weight: bold; font-size: 16px;">
                SMPS Tech Lab • Official VTU Enrollment
            </div>
            <h2 style="font-size: 20px; font-weight: 800; margin-top: 24px;">Welcome to the Cohort!</h2>
            <p>Dear {student_name},</p>
            <p>Your academic credentials have been verified and your admission seat is confirmed.</p>
            <div style="background: #fbfbfd; border: 1px solid #e5e5ea; border-radius: 12px; padding: 16px; margin: 20px 0;">
                <p style="margin: 4px 0; font-size: 13px;"><strong>Sequential VTU ID:</strong> {enrollment_number}</p>
                <p style="margin: 4px 0; font-size: 13px;"><strong>Cohort Batch:</strong> {batch_code}</p>
                <p style="margin: 4px 0; font-size: 13px;"><strong>Lab Commencement Date:</strong> {start_date}</p>
                <p style="margin: 4px 0; font-size: 13px;"><strong>Location:</strong> VTU-VRIF Center, Nagarbhavi, Bengaluru</p>
            </div>
            <p style="font-size: 13px; color: #6e6e73;">Log in to your student dashboard at <a href="http://localhost:3000/dashboard" style="color: #0071e3;">localhost:3000/dashboard</a> to access practical schematics and lab assignments.</p>
        </div>
        """
        return await cls.send_email(to_email, subject, html)

    @classmethod
    async def send_order_confirmation(
        cls, to_email: str, order_number: str, total_amount: str, invoice_url: str
    ) -> Dict[str, Any]:
        subject = f"Order Confirmed: {order_number} — SMPS Tech Lab"
        html = f"""
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1d1d1f; border: 1px solid #e5e5ea; border-radius: 16px;">
            <div style="background: #0071e3; color: white; padding: 16px 20px; border-radius: 12px; font-weight: bold; font-size: 16px;">
                SMPS Tech Lab • Hardware Procurement
            </div>
            <h2 style="font-size: 20px; font-weight: 800; margin-top: 24px;">Thank you for your order!</h2>
            <p>Your payment has been reconciled and your hardware package is being prepared for dispatch.</p>
            <div style="background: #fbfbfd; border: 1px solid #e5e5ea; border-radius: 12px; padding: 16px; margin: 20px 0;">
                <p style="margin: 4px 0; font-size: 13px;"><strong>Order Number:</strong> {order_number}</p>
                <p style="margin: 4px 0; font-size: 13px;"><strong>Total Paid:</strong> ₹{total_amount}</p>
                <p style="margin: 4px 0; font-size: 13px;"><strong>Tax Invoice:</strong> <a href="{invoice_url}" style="color: #0071e3;">View Official Tax Invoice</a></p>
            </div>
            <p style="font-size: 13px; color: #6e6e73;">You will receive logistics courier tracking updates once your consignment is dispatched.</p>
        </div>
        """
        return await cls.send_email(to_email, subject, html)

    @classmethod
    async def send_certificate_awarded(
        cls,
        to_email: str,
        student_name: str,
        certificate_id: str,
        program_title: str,
        verification_url: str,
    ) -> Dict[str, Any]:
        subject = f"Digital Certificate Issued: {certificate_id} — Visvesvaraya Technological University"
        html = f"""
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1d1d1f; border: 1px solid #e5e5ea; border-radius: 16px;">
            <div style="background: #0071e3; color: white; padding: 16px 20px; border-radius: 12px; font-weight: bold; font-size: 16px;">
                Visvesvaraya Technological University • VRIF Center
            </div>
            <h2 style="font-size: 20px; font-weight: 800; margin-top: 24px;">Certificate of Completion Awarded</h2>
            <p>Dear {student_name},</p>
            <p>Congratulations on completing the <strong>{program_title}</strong> with distinguished attendance and practical lab project submission.</p>
            <div style="background: #fbfbfd; border: 1px solid #e5e5ea; border-radius: 12px; padding: 16px; margin: 20px 0;">
                <p style="margin: 4px 0; font-size: 13px;"><strong>Certificate ID:</strong> {certificate_id}</p>
                <p style="margin: 4px 0; font-size: 13px;"><strong>SHA-256 Hash:</strong> Cryptographically Attested</p>
                <p style="margin: 4px 0; font-size: 13px;"><strong>Permanent Verification URL:</strong> <a href="{verification_url}" style="color: #0071e3;">{verification_url}</a></p>
            </div>
            <p style="font-size: 13px; color: #6e6e73;">You may download or print your official certificate directly from the verification portal.</p>
        </div>
        """
        return await cls.send_email(to_email, subject, html)
