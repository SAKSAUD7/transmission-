"""
Django Settings
===============
Development: SQLite (default, zero-config)
Production:  MySQL on Hostinger (set ENV vars to switch)

Environment variables for production:
  DB_ENGINE=django.db.backends.mysql
  DB_NAME=your_db_name
  DB_USER=your_db_user
  DB_PASSWORD=your_password
  DB_HOST=localhost
  DB_PORT=3306
"""
import os
from pathlib import Path

# Load .env file if present (production VPS uses this for DB credentials)
try:
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).resolve().parent.parent / ".env")
except ImportError:
    pass  # dotenv not installed — fall back to system env vars

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get(
    "DJANGO_SECRET_KEY",
    "django-insecure-6jm!@he79pvu&b^z6-l81dwq1mwi!p149gj#lw)w(rg@w7nt@4"
)

DEBUG = os.environ.get("DJANGO_DEBUG", "True") == "True"
ALLOWED_HOSTS = ["*"]
APPEND_SLASH = False   # Prevent Django redirect loops via the Next.js /api/* proxy

# Trusted origins for CSRF — add your domain/IP here via env or directly
_trusted = os.environ.get("CSRF_TRUSTED_ORIGINS", "")
CSRF_TRUSTED_ORIGINS = [o.strip() for o in _trusted.split(",") if o.strip()] or [
    "http://2.25.151.68:8080",
    "http://2.25.151.68",
    "http://localhost:3000",
    "http://localhost:8000",
]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Project apps
    "vehicles",
    "parts",
    "leads",
    "reviews",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"

# ── Database ──────────────────────────────────────────────────────────────────
# Dev: SQLite  |  Prod: set DB_ENGINE=django.db.backends.mysql + other vars
DATABASES = {
    "default": {
        "ENGINE":   os.environ.get("DB_ENGINE")   or "django.db.backends.sqlite3",
        "NAME":     os.environ.get("DB_NAME")     or str(BASE_DIR / "db.sqlite3"),
        "USER":     os.environ.get("DB_USER")     or "",
        "PASSWORD": os.environ.get("DB_PASSWORD") or "",
        "HOST":     os.environ.get("DB_HOST")     or "",
        "PORT":     os.environ.get("DB_PORT")     or "",
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL  = "/django-static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ── Media (360° videos + thumbnails) ──────────────────────────────────────────
MEDIA_URL  = "/media/"
MEDIA_ROOT = BASE_DIR / "media"
