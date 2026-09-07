"""
Health and Diagnostic Endpoints.
Guarded by JWT authentication for full system metrics, with a public ping endpoint.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import get_db, check_database_connection
from app.config import settings
from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/health", tags=["Health"])

@router.get("/ping")
def public_ping():
    """
    Lightweight public liveness probe for load balancers.
    Does not require authentication.
    """
    return {"status": "ok", "service": settings.PROJECT_NAME}

@router.get("")
def health_check(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Comprehensive system health and readiness endpoint.
    Protected by JWT authentication.
    """
    db_healthy = check_database_connection()
    migrations_applied = 0

    if db_healthy:
        try:
            res = db.execute(text("SELECT COUNT(*) FROM flyway_schema_history WHERE success = true;"))
            migrations_applied = res.scalar() or 0
        except Exception:
            migrations_applied = 0

    return {
        "status": "healthy" if db_healthy else "degraded",
        "project": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "database": {
            "connected": db_healthy,
            "migrations_applied": migrations_applied,
        },
        "jwt": {
            "authenticated_as": current_user.email,
            "role": current_user.role,
            "algorithm": settings.ALGORITHM,
        },
        "smtp_host": settings.SMTP_HOST,
        "smtp_port": settings.SMTP_PORT,
    }
