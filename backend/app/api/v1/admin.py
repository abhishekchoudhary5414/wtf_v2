"""
Admin authentication endpoints (login, dashboard).
Protected by JWT tokens.
"""

from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.auth import AdminLoginRequest, AdminTokenResponse, AdminDetailsResponse
from app.models.admin import AdminLogin, AdminDetails
from app.core.security import verify_password, create_access_token
from app.config import settings
from app.api.deps import get_current_admin

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.post("/login", response_model=AdminTokenResponse)
def admin_login(data: AdminLoginRequest, db: Session = Depends(get_db)):
    """
    Authenticate administrator credentials and issue a signed admin JWT bearer token.
    """
    entry = db.query(AdminLogin).filter(AdminLogin.email_id == data.email.lower()).first()
    if not entry or not verify_password(data.password, entry.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not entry.is_active or entry.is_locked:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin account is inactive or locked",
        )

    # Load admin details to obtain the numeric role id
    admin = db.query(AdminDetails).filter(AdminDetails.id == entry.admin_id).first()
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Admin details not found for this account",
        )

    # Issue JWT token with subject = admin_login.id and include numeric role_id
    access_token = create_access_token(subject=str(entry.id), role_id=admin.role_id)

    # Update last login timestamp
    entry.last_login = datetime.now(timezone.utc)
    entry.failed_login_attempts = 0
    db.commit()

    return AdminTokenResponse(
        access_token=access_token,
        token_type="bearer",
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        admin=admin,
    )

@router.get("/dashboard", response_model=AdminDetailsResponse)
def admin_dashboard(
    current_admin: AdminDetails = Depends(get_current_admin),
):
    """
    Retrieve authenticated admin profile.
    Guarded by admin JWT authentication.
    """
    return current_admin
