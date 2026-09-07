"""
Database connection, session management, and base declarative class.
Supports PostgreSQL via psycopg driver.
"""

import logging
from typing import Generator
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import settings

logger = logging.getLogger(__name__)

# SQLAlchemy Engine
# Note: pool_pre_ping ensures healthy connections from the pool
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db() -> Generator:
    """
    FastAPI dependency that yields a SQLAlchemy database session per request
    and guarantees proper closing upon completion.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def check_database_connection() -> bool:
    """Utility function to verify connectivity with PostgreSQL."""
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return True
    except Exception as e:
        logger.warning(f"Database connection check failed: {e}")
        return False

