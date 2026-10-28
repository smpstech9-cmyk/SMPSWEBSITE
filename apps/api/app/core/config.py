"""Application configuration settings parsed from environment variables."""
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    ENVIRONMENT: str = "development"
    APP_NAME: str = "SMPS Tech Lab API"
    DEBUG: bool = False
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]

    DATABASE_URL: str = "sqlite+aiosqlite:///./smps_dev.db"

    SUPABASE_URL: str = ""
    SUPABASE_JWT_SECRET: str = "smps-dev-jwt-secret-key-must-be-at-least-32-chars-long"
    SUPABASE_SERVICE_ROLE_KEY: str = ""

    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    RAZORPAY_KEY_ID: str = ""
    RAZORPAY_KEY_SECRET: str = ""
    RAZORPAY_WEBHOOK_SECRET: str = ""

    EMAIL_API_KEY: str = ""
    EMAIL_FROM: str = "SMPS Tech Lab <no-reply@smpstechlab.com>"


settings = Settings()
