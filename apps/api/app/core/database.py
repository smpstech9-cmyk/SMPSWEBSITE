"""Database async connection management and declarative base."""
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base
from sqlalchemy import JSON, String, Uuid
from sqlalchemy.dialects.postgresql import JSONB, ARRAY
from app.core.config import settings

is_sqlite = "sqlite" in settings.DATABASE_URL
engine_kwargs = {
    "echo": settings.DEBUG,
    "future": True,
}
if is_sqlite:
    engine_kwargs["connect_args"] = {"check_same_thread": False}
else:
    engine_kwargs["pool_pre_ping"] = True

engine = create_async_engine(
    settings.DATABASE_URL,
    **engine_kwargs,
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
)

Base = declarative_base()

# Cross-dialect compatible types for PostgreSQL (production) & SQLite (unit tests / local dev)
CompatibleUUID = Uuid
CompatibleJSON = JSONB().with_variant(JSON(), "sqlite")
CompatibleStringArray = ARRAY(String).with_variant(JSON(), "sqlite")


async def get_db():
    """Dependency for providing database sessions per request."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
