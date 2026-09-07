"""
Authentication API Endpoints (Registration, Login, Me, Password Reset).
"""

import secrets
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from app.database import get_db
from app.config import settings
from app.models.user import User, PasswordResetToken
from app.schemas.auth import (
    UserRegister,
    UserLogin,
    UserResponse,
    Token,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    MsgResponse,
)
from app.core.security import get_password_hash, verify_password, create_access_token
from app.core.email import send_welcome_email, send_password_reset_email
from app.api.deps import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(
    user_in: UserRegister,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Register a new user (Student, Coach, or Institution).
    Sends welcome confirmation email upon successful registration.
    """
    existing_user = db.query(User).filter(User.email == user_in.email.lower()).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email address already exists",
        )

    # Validate role
    allowed_roles = {"student", "coach", "institution", "admin"}
    role = user_in.role.lower()
    if role not in allowed_roles:
        role = "student"

    new_user = User(
        email=user_in.email.lower(),
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        role=role,
        organization=user_in.organization,
        is_active=True,
        is_verified=False,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Send welcome email in background
    background_tasks.add_task(
        send_welcome_email,
        to_email=new_user.email,
        full_name=new_user.full_name,
        role=new_user.role,
    )

    return new_user

@router.post("/login", response_model=Token)
def login(
    user_in: UserLogin,
    db: Session = Depends(get_db)
):
    """
    Authenticate user credentials and issue a signed JWT bearer token.
    """
    user = db.query(User).filter(User.email == user_in.email.lower()).first()
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email address or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive. Please contact support.",
        )

    access_token = create_access_token(
        subject=str(user.id),
        role=user.role,
    )

    return Token(
        access_token=access_token,
        token_type="bearer",
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        user=UserResponse.model_validate(user),
    )

@router.get("/me", response_model=UserResponse)
def get_current_user_profile(
    current_user: User = Depends(get_current_user)
):
    """
    Fetch details of the currently authenticated user.
    """
    return current_user

@router.post("/forgot-password", response_model=MsgResponse)
def forgot_password(
    data: ForgotPasswordRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Initiate password reset flow by sending reset token link via SMTP.
    """
    user = db.query(User).filter(User.email == data.email.lower()).first()
    # Always return success message even if user not found to prevent user enumeration attacks
    if user and user.is_active:
        reset_token = secrets.token_urlsafe(32)
        expires_at = datetime.now(timezone.utc) + timedelta(hours=1)
        
        token_entry = PasswordResetToken(
            user_id=user.id,
            token=reset_token,
            expires_at=expires_at,
            used=False,
        )
        db.add(token_entry)
        db.commit()

        background_tasks.add_task(
            send_password_reset_email,
            to_email=user.email,
            reset_token=reset_token,
        )

    return MsgResponse(
        message="If this email is registered, a password reset link has been dispatched."
    )

@router.post("/reset-password", response_model=MsgResponse)
def reset_password(
    data: ResetPasswordRequest,
    db: Session = Depends(get_db)
):
    """
    Validate password reset token and update user password.
    """
    token_entry = db.query(PasswordResetToken).filter(
        PasswordResetToken.token == data.token,
        PasswordResetToken.used == False
    ).first()

    if not token_entry:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired password reset token",
        )

    # Check expiration
    if token_entry.expires_at.replace(tzinfo=timezone.utc) < datetime.now(timezone.utc):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password reset token has expired",
        )

    user = db.query(User).filter(User.id == token_entry.user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Associated user not found",
        )

    user.hashed_password = get_password_hash(data.new_password)
    token_entry.used = True
    db.commit()

    return MsgResponse(message="Password has been successfully updated. You may now sign in.")

