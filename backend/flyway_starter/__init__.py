"""
Flyway Starter package for WTF University database migrations.
"""

from .starter import run_migrations, run_flyway_cli, run_flyway_docker, run_python_fallback

__all__ = ["run_migrations", "run_flyway_cli", "run_flyway_docker", "run_python_fallback"]

