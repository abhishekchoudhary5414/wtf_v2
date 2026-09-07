"""
Global JWT Authentication Middleware.
Ensures JWT token verification across every incoming request to protected API routes.
"""

from typing import List
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse
from app.core.security import decode_access_token

# Endpoints that are accessible without a JWT Bearer token
PUBLIC_PATH_PREFIXES: List[str] = [
    "/docs",
    "/redoc",
    "/openapi.json",
    "/api/v1/auth/login",
    "/api/v1/auth/register",
    "/api/v1/auth/forgot-password",
    "/api/v1/auth/reset-password",
    "/api/v1/admin/login",
    "/api/v1/health/ping",
]

class JWTMiddleware(BaseHTTPMiddleware):
    """
    Middleware that inspects the Authorization header for a valid JWT Bearer token.
    Populates request.state.jwt_payload on authenticated requests.
    Enforces JWT requirement on all non-whitelisted routes.
    """

    async def dispatch(self, request: Request, call_next):
        path = request.url.path

        # Allow root metadata endpoint
        if path == "/":
            return await call_next(request)

        # Allow CORS pre-flight OPTIONS requests
        if request.method == "OPTIONS":
            return await call_next(request)

        # Check if path is in public whitelist
        is_public = any(path.startswith(prefix) for prefix in PUBLIC_PATH_PREFIXES)

        auth_header = request.headers.get("Authorization")
        token = None

        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ", 1)[1].strip()

        if token:
            payload = decode_access_token(token)
            if payload:
                request.state.jwt_payload = payload
                request.state.user_id = payload.get("sub")
                # Keep role name for compatibility and expose numeric role id
                # expose numeric role id only (no role name claim)
                request.state.role_id = payload.get("role_id")
            elif not is_public:
                return JSONResponse(
                    status_code=401,
                    content={"detail": "Invalid or expired JWT authentication token"},
                    headers={"WWW-Authenticate": "Bearer"},
                )
        elif not is_public:
            return JSONResponse(
                status_code=401,
                content={"detail": "JWT authentication token required. Provide 'Authorization: Bearer <token>'"},
                headers={"WWW-Authenticate": "Bearer"},
            )

        response = await call_next(request)
        return response

