"""
System health and readiness check endpoint.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import get_db, check_database_connection
from app.config import settings

router = APIRouter(tags=["Health"])

@router.get("/health")
def health_check(db: Session = Depends(get_db)):
    """
    Health check endpoint returning system status, database connectivity,
    and migration details.
    """
    db_healthy = check_database_connection()
    migrations_applied = 0

    if db_healthy:
        try:
            res = db.execute(text("SELECT COUNT(*) FROM flyway_schema_history WHERE success = true;"))
            migrations_applied = res.scalar() or 0
        except Exception:
            # Table may not exist yet before first migration
            migrations_applied = 0

    return {
        "status": "healthy" if db_healthy else "degraded",
        "project": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "database": {
            "connected": db_healthy,
            "migrations_applied": migrations_applied,
        },
        "jwt_algorithm": settings.ALGORITHM,
        "smtp_host": settings.SMTP_HOST,
        "smtp_port": settings.SMTP_PORT,
    }

