"""
FastAPI Application Entry Point.
Initializes middleware, lifecycle events, and routes.
Enforces JWT authentication across endpoints.
"""

import sys
import logging
from pathlib import Path
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Ensure backend root is in sys.path so flyway_starter can be imported
BACKEND_ROOT = Path(__file__).resolve().parent.parent
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

from app.config import settings
from app.database import check_database_connection
from app.core.jwt_middleware import JWTMiddleware
from app.api.v1 import api_v1_router
from flyway_starter import run_migrations

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("wtf_api")

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan events:
    Runs on startup and shutdown.
    """
    logger.info(f"Starting {settings.PROJECT_NAME} v{settings.VERSION}...")

    # Check DB and attempt auto-migrations if database is reachable
    if check_database_connection():
        logger.info("PostgreSQL connection confirmed. Running Flyway database migrations...")
        try:
            run_migrations()
        except Exception as e:
            logger.warning(f"Automatic migration attempt encountered: {e}")
    else:
        logger.warning(
            "PostgreSQL is not currently reachable at DATABASE_URL. "
            "Server starting in standby mode. Run 'python3 backend/flyway_starter/run.py' once PostgreSQL is online."
        )

    yield

    logger.info(f"Shutting down {settings.PROJECT_NAME}...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="FastAPI Backend for WTF University with JWT Authentication, Flyway Migrations, and PostgreSQL",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# CORS Middleware Configuration
origins = list(set([
    settings.FRONTEND_BASE_URL,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
] + settings.ALLOWED_ORIGINS))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global JWT Authentication Middleware
app.add_middleware(JWTMiddleware)

# Include API Routers
app.include_router(api_v1_router, prefix=settings.API_V1_STR)

@app.get("/", tags=["Root"])
def root():
    return {
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "docs": "/docs",
        "redoc": "/redoc",
        "health": f"{settings.API_V1_STR}/health",
        "ping": f"{settings.API_V1_STR}/health/ping",
        "status": "online",
    }
