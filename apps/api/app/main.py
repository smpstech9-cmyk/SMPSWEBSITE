"""
SMPS Tech Lab - Master FastAPI Application Entrypoint.
Provides versioned REST APIs under /api/v1/.
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Ensure all SQLAlchemy models are registered in metadata before request execution
import app.domains.auth.models  # noqa: F401
import app.domains.internships.models  # noqa: F401
import app.domains.store.models  # noqa: F401
import app.domains.orders.models  # noqa: F401
import app.domains.payments.models  # noqa: F401
import app.domains.media.models  # noqa: F401
import app.domains.content.models  # noqa: F401

from app.domains.auth.router import router as auth_router
from app.domains.internships.router import router as internships_router
from app.domains.store.router import router as store_router
from app.domains.orders.router import router as orders_router
from app.domains.payments.router import router as payments_router
from app.domains.communications.router import router as communications_router
from app.domains.media.router import router as media_router
from app.domains.content.router import router as content_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    from app.core.init_db import init_db_and_seed
    await init_db_and_seed()
    yield


app = FastAPI(
    title="SMPS Tech Lab Authoritative API",
    version="1.0.0",
    docs_url="/api/v1/docs",
    openapi_url="/api/v1/openapi.json",
    lifespan=lifespan,
)

from app.core.config import settings

# CORS Configuration - Supports Localhost, Vercel deployments, and production domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS if settings.ALLOWED_ORIGINS and "*" not in settings.ALLOWED_ORIGINS else ["*"],
    allow_origin_regex=r"https://.*\.vercel\.app|https://.*\.onrender\.com|http://localhost:\d+",
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Register Domain Routers
app.include_router(auth_router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(internships_router, prefix="/api/v1/internships", tags=["internships"])
app.include_router(store_router, prefix="/api/v1/store", tags=["store"])
app.include_router(orders_router, prefix="/api/v1/orders", tags=["orders"])
app.include_router(payments_router, prefix="/api/v1/payments", tags=["payments"])
app.include_router(communications_router, prefix="/api/v1/communications", tags=["communications"])
app.include_router(media_router, prefix="/api/v1", tags=["media", "gallery"])
app.include_router(content_router, prefix="/api/v1/content", tags=["content"])



@app.get("/api/v1/health")
async def health_check():
    """Health and readiness probe."""
    return {"status": "ok", "service": "smps-api", "version": "1.0.0"}
