"""
Standalone Flyway Starter & Migration Engine.
Dedicated module for executing database schema migrations.
Supports:
1. Native Flyway CLI
2. Dockerized Flyway container
3. Python SQL fallback engine maintaining flyway_schema_history
"""

import os
import re
import sys
import glob
import hashlib
import subprocess
from pathlib import Path
from typing import Optional

CURRENT_DIR = Path(__file__).resolve().parent
MIGRATIONS_DIR = CURRENT_DIR / "migrations"
CONF_FILE = CURRENT_DIR / "flyway.conf"

def get_database_url() -> str:
    """Finds DATABASE_URL from environment or nearest .env file."""
    if os.environ.get("DATABASE_URL"):
        return os.environ["DATABASE_URL"]

    # Search for .env in current, parent, or grandparent dir
    search_paths = [
        CURRENT_DIR / ".env",
        CURRENT_DIR.parent / ".env",
        CURRENT_DIR.parent.parent / ".env",
    ]
    for env_file in search_paths:
        if env_file.exists():
            with open(env_file, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line.startswith("DATABASE_URL="):
                        return line.split("=", 1)[1].strip()

    # Fallback to default local URL
    return "postgresql+psycopg://postgres:postgres@localhost:5432/wtf_db"

def run_flyway_cli() -> bool:
    """Attempt execution using Flyway CLI if available in system PATH."""
    try:
        check = subprocess.run(["flyway", "-v"], capture_output=True, text=True)
        if check.returncode == 0:
            print("[Flyway Starter] Found Flyway CLI. Executing migrations...")
            proc = subprocess.run(
                ["flyway", f"-configFiles={CONF_FILE}", f"-locations=filesystem:{MIGRATIONS_DIR}", "migrate"],
                cwd=CURRENT_DIR
            )
            return proc.returncode == 0
    except FileNotFoundError:
        pass
    return False

def run_flyway_docker() -> bool:
    """Attempt execution using Docker flyway container if Docker is available."""
    try:
        check = subprocess.run(["docker", "--version"], capture_output=True, text=True)
        if check.returncode == 0:
            print("[Flyway Starter] Found Docker. Running official flyway/flyway container...")
            cmd = [
                "docker", "run", "--rm", "--net=host",
                "-v", f"{MIGRATIONS_DIR}:/flyway/sql:ro",
                "-v", f"{CONF_FILE}:/flyway/conf/flyway.conf:ro",
                "flyway/flyway:latest",
                "migrate"
            ]
            proc = subprocess.run(cmd)
            if proc.returncode == 0:
                print("[Flyway Starter] Docker Flyway migration completed successfully.")
                return True
    except Exception as e:
        print(f"[Flyway Starter] Docker runner notice: {e}")
    return False

def run_python_fallback(database_url: Optional[str] = None) -> bool:
    """
    Python fallback migrator that creates and updates flyway_schema_history
    table with exact Flyway specification.
    """
    db_url = database_url or get_database_url()
    print(f"[Flyway Starter] Executing SQL migrations via database engine ({db_url.split('@')[-1]})...")

    try:
        from sqlalchemy import create_engine, text
        engine = create_engine(db_url)
        with engine.begin() as conn:
            # 1. Create flyway_schema_history table if not exists
            conn.execute(text("""
                CREATE TABLE IF NOT EXISTS flyway_schema_history (
                    installed_rank INT NOT NULL,
                    version VARCHAR(50),
                    description VARCHAR(200) NOT NULL,
                    type VARCHAR(20) NOT NULL,
                    script VARCHAR(1000) NOT NULL,
                    checksum INT,
                    installed_by VARCHAR(100) NOT NULL,
                    installed_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    execution_time INT NOT NULL,
                    success BOOLEAN NOT NULL,
                    CONSTRAINT flyway_schema_history_pk PRIMARY KEY (installed_rank)
                );
            """))

            # 2. Get applied versions
            res = conn.execute(text("SELECT version FROM flyway_schema_history WHERE success = true;"))
            applied_versions = {row[0] for row in res.fetchall() if row[0] is not None}

            # 3. Read migration files
            sql_files = sorted(glob.glob(str(MIGRATIONS_DIR / "V*.sql")))
            if not sql_files:
                print(f"[Flyway Starter] No migration files found in {MIGRATIONS_DIR}")
                return False

            installed_rank_res = conn.execute(text("SELECT COALESCE(MAX(installed_rank), 0) FROM flyway_schema_history;"))
            installed_rank = installed_rank_res.scalar() or 0

            for filepath in sql_files:
                filename = os.path.basename(filepath)
                match = re.match(r"^V([0-9_]+)__(.+)\.sql$", filename)
                if not match:
                    continue

                version = match.group(1).replace("_", ".")
                description = match.group(2).replace("_", " ")

                if version in applied_versions:
                    print(f"[Flyway Starter] Migration V{version} ({description}) already applied.")
                    continue

                print(f"[Flyway Starter] Applying migration V{version}: {description}...")
                with open(filepath, "r", encoding="utf-8") as f:
                    sql_content = f.read()

                import time
                start_time = time.time()

                for stmt in sql_content.split(";"):
                    trimmed = stmt.strip()
                    if trimmed:
                        conn.execute(text(trimmed))

                execution_time = int((time.time() - start_time) * 1000)
                installed_rank += 1
                checksum = int(hashlib.md5(sql_content.encode("utf-8")).hexdigest()[:8], 16) % (2**31)

                conn.execute(text("""
                    INSERT INTO flyway_schema_history (
                        installed_rank, version, description, type, script,
                        checksum, installed_by, execution_time, success
                    ) VALUES (
                        :rank, :version, :desc, 'SQL', :script,
                        :checksum, 'flyway-starter', :exec_time, true
                    );
                """), {
                    "rank": installed_rank,
                    "version": version,
                    "desc": description,
                    "script": filename,
                    "checksum": checksum,
                    "exec_time": execution_time
                })
                print(f"[Flyway Starter] Successfully applied V{version} ({execution_time}ms).")

        print("[Flyway Starter] All database migrations are up to date.")
        return True
    except Exception as e:
        print(f"[Flyway Starter] Migration error: {e}", file=sys.stderr)
        return False

def run_migrations(database_url: Optional[str] = None) -> bool:
    """Executes migrations using Flyway CLI, Docker, or native engine."""
    if run_flyway_cli():
        return True
    if run_flyway_docker():
        return True
    return run_python_fallback(database_url)

if __name__ == "__main__":
    success = run_migrations()
    sys.exit(0 if success else 1)
