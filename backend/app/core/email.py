"""
Email notification service using SMTP with SSL support.
"""

import smtplib
import asyncio
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import settings

logger = logging.getLogger(__name__)

def _send_smtp_email_sync(to_email: str, subject: str, html_body: str, text_body: str = "") -> bool:
    """Synchronous worker that connects via SMTP_SSL (port 465) and sends email."""
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = settings.SMTP_FROM
        msg["To"] = to_email

        if text_body:
            msg.attach(MIMEText(text_body, "plain", "utf-8"))
        if html_body:
            msg.attach(MIMEText(html_body, "html", "utf-8"))

        if settings.SMTP_PORT == 465:
            # SSL Connection
            with smtplib.SMTP_SSL(settings.SMTP_HOST, settings.SMTP_PORT, timeout=15) as server:
                server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
                server.sendmail(settings.SMTP_FROM, [to_email], msg.as_string())
        else:
            # STARTTLS Connection
            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=15) as server:
                server.starttls()
                server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
                server.sendmail(settings.SMTP_FROM, [to_email], msg.as_string())

        logger.info(f"Email successfully sent to {to_email} with subject: {subject}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email to {to_email}: {e}")
        return False

async def send_email_async(to_email: str, subject: str, html_body: str, text_body: str = "") -> bool:
    """Asynchronous wrapper to send email without blocking the event loop."""
    return await asyncio.to_thread(_send_smtp_email_sync, to_email, subject, html_body, text_body)

async def send_welcome_email(to_email: str, full_name: str, role: str) -> bool:
    """Send welcome and onboarding confirmation email."""
    subject = "Welcome to WTF University - Your Wellness Journey Starts Here"
    html_content = f"""
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; borderRadius: 8px;">
        <h2 style="color: #0d9488;">Welcome to WTF University!</h2>
        <p>Hello <strong>{full_name}</strong>,</p>
        <p>Thank you for joining WTF University. Your account has been registered under the <strong>{role.capitalize()}</strong> pathway.</p>
        <p>Access your personalized portal, tracks, and support systems anytime:</p>
        <div style="margin: 24px 0;">
            <a href="{settings.FRONTEND_BASE_URL}" style="background-color: #0d9488; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Enter Your Portal
            </a>
        </div>
        <p style="font-size: 0.85rem; color: #777;">If you did not initiate this request, please contact support immediately.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 0.8rem; color: #999;">Work Through Frustration &copy; WTF University Platform</p>
    </div>
    """
    text_content = f"Welcome to WTF University, {full_name}! Your account has been created for role {role}. Visit {settings.FRONTEND_BASE_URL} to get started."
    return await send_email_async(to_email, subject, html_content, text_content)

async def send_password_reset_email(to_email: str, reset_token: str) -> bool:
    """Send password reset link with token."""
    reset_link = f"{settings.FRONTEND_BASE_URL}/reset-password?token={reset_token}"
    subject = "Reset Your WTF University Password"
    html_content = f"""
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; borderRadius: 8px;">
        <h2 style="color: #0d9488;">Password Reset Request</h2>
        <p>We received a request to reset your password. Click the link below to set a new password:</p>
        <div style="margin: 24px 0;">
            <a href="{reset_link}" style="background-color: #0d9488; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Reset Password
            </a>
        </div>
        <p style="font-size: 0.85rem; color: #666;">Or copy this URL into your browser:</p>
        <p style="font-size: 0.8rem; word-break: break-all; color: #0d9488;">{reset_link}</p>
        <p style="font-size: 0.85rem; color: #777;">This link expires in 60 minutes. If you did not request a password reset, you can safely ignore this email.</p>
    </div>
    """
    text_content = f"Password reset link: {reset_link}. Valid for 60 minutes."
    return await send_email_async(to_email, subject, html_content, text_content)

