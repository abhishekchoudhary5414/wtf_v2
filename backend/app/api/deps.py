"""
Common FastAPI dependencies for authentication and database sessions.
Enforces JWT token validation and subject extraction.
"""

from typing import Generator, Optional, Dict, Any
from uuid import UUID
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.security import decode_access_token
from app.models.user import User
from app.models.admin import AdminLogin, AdminDetails

security_scheme = HTTPBearer(auto_error=True)

def get_jwt_payload(
    credentials: HTTPAuthorizationCredentials = Depends(security_scheme),
) -> Dict[str, Any]:
    """
    Validates JWT Bearer token and returns raw claims dictionary.
    """
    token = credentials.credentials
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid, expired, or malformed JWT authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return payload

def get_current_user(
    payload: Dict[str, Any] = Depends(get_jwt_payload),
    db: Session = Depends(get_db)
) -> User:
    """
    Validates JWT Bearer token and returns authenticated User entity.
    """
    user_id_str: Optional[str] = payload.get("sub")
    if not user_id_str:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="JWT token payload missing subject identifier",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        user_uuid = UUID(user_id_str)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user UUID in token payload",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = db.query(User).filter(User.id == user_uuid).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Authenticated user no longer exists in database",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is deactivated",
        )

    return user

def require_admin(
    payload: dict = Depends(get_jwt_payload),
    db: Session = Depends(get_db),
) -> User:
    """Restricts access to platform administrators using numeric role_id from JWT."""
    role_id = payload.get("role_id")
    if role_id is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Administrative privileges required",
        )

    # Validate that the role_id corresponds to an 'admin' role in the roles table
    try:
        from app.models.user import Role as RoleModel
        role_entry = db.query(RoleModel).filter(RoleModel.id == int(role_id)).first()
    except Exception:
        role_entry = None

    if not role_entry or (role_entry.name.lower() != "admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Administrative privileges required",
        )

    # Return the user object for convenience
    user_id_str = payload.get("sub")
    if not user_id_str:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="JWT missing subject")
    from uuid import UUID
    try:
        user_uuid = UUID(user_id_str)
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid user id in token")

    user = db.query(User).filter(User.id == user_uuid).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User account is deactivated")

    return user

def get_current_admin(
    payload: Dict[str, Any] = Depends(get_jwt_payload),
    db: Session = Depends(get_db)
) -> AdminDetails:
    """
    Validates JWT Bearer token and returns authenticated Admin entity.
    """
    # Require that the token includes a numeric role_id (admin role identifier)
    if payload.get("role_id") is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required for this endpoint",
        )

    subject = payload.get("sub")
    try:
        admin_login_id = int(subject)
        entry = db.query(AdminLogin).filter(AdminLogin.id == admin_login_id).first()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin identifier in JWT token",
        )

    if not entry or not entry.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin account is inactive or not found",
        )

    admin = db.query(AdminDetails).filter(AdminDetails.id == entry.admin_id).first()
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Admin details not found",
        )

    # Validate that role_id in token matches the admin's configured role_id
    token_role_id = payload.get("role_id")
    try:
        if int(token_role_id) != int(admin.role_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Token role_id does not match admin privileges",
            )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid role_id in token",
        )

    return admin
