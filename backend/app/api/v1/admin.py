"""
Admin authentication endpoints (login, dashboard).
"""
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.auth import AdminLoginRequest, AdminTokenResponse, AdminDetailsResponse
from app.models.admin import AdminLogin, AdminDetails
from app.core.security import verify_password, create_access_token
from app.config import settings
from app.api.deps import security_scheme

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.post("/login", response_model=AdminTokenResponse)
def admin_login(data: AdminLoginRequest, db: Session = Depends(get_db)):
    entry = db.query(AdminLogin).filter(AdminLogin.email_id == data.email.lower()).first()
    if not entry or not verify_password(data.password, entry.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not entry.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin account is inactive")

    # create token with subject = admin_login.id and role=admin
    access_token = create_access_token(subject=str(entry.id), role="admin")

    # update last_login
    entry.last_login = datetime.now(timezone.utc)
    entry.failed_login_attempts = 0
    db.commit()

    admin = db.query(AdminDetails).filter(AdminDetails.id == entry.admin_id).first()

    return AdminTokenResponse(
        access_token=access_token,
        token_type="bearer",
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        admin=admin,
    )


@router.get("/dashboard", response_model=AdminDetailsResponse)
def admin_dashboard(credentials=Depends(security_scheme), db: Session = Depends(get_db)):
    from app.core.security import decode_access_token

    token = credentials.credentials
    payload = decode_access_token(token)
    if not payload or payload.get("role") != "admin":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    subject = payload.get("sub")
    try:
        admin_login_id = int(subject)
        entry = db.query(AdminLogin).filter(AdminLogin.id == admin_login_id).first()
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token subject")

    if not entry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Admin not found")

    admin = db.query(AdminDetails).filter(AdminDetails.id == entry.admin_id).first()
    if not admin:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Admin details not found")

    return admin
