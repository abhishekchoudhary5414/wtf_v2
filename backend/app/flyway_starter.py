"""
Flyway Migration Starter for FastAPI.
Provides migration execution via:
1. Flyway CLI (if installed)
2. Docker Flyway image (if Docker is installed)
3. Native SQL fallback runner compatible with flyway_schema_history table
"""

import os
import re
import sys
import glob
import hashlib
import subprocess
from pathlib import Path
from typing import List, Tuple

def get_migrations_dir() -> Path:
    current_dir = Path(__file__).resolve().parent.parent
    return current_dir / "migrations"

def run_flyway_cli() -> bool:
    """Run flyway using the native CLI if installed."""
    try:
        res = subprocess.run(["flyway", "-v"], capture_output=True, text=True)
        if res.returncode == 0:
            print("[Flyway Starter] Found Flyway CLI. Executing 'flyway migrate'...")
            backend_dir = Path(__file__).resolve().parent.parent
            proc = subprocess.run(["flyway", "-configFiles=flyway.conf", "migrate"], cwd=backend_dir)
            return proc.returncode == 0
    except FileNotFoundError:
        pass
    return False

def run_flyway_docker() -> bool:
    """Run flyway using Docker container if docker is available."""
    try:
        res = subprocess.run(["docker", "--version"], capture_output=True, text=True)
        if res.returncode == 0:
            print("[Flyway Starter] Found Docker. Attempting migration via flyway container...")
            backend_dir = Path(__file__).resolve().parent.parent
            migrations_dir = backend_dir / "migrations"
            conf_file = backend_dir / "flyway.conf"
            
            cmd = [
                "docker", "run", "--rm", "--net=host",
                "-v", f"{migrations_dir}:/flyway/sql:ro",
                "-v", f"{conf_file}:/flyway/conf/flyway.conf:ro",
                "flyway/flyway:latest",
                "migrate"
            ]
            proc = subprocess.run(cmd)
            if proc.returncode == 0:
                print("[Flyway Starter] Docker Flyway migration completed successfully.")
                return True
    except Exception as e:
        print(f"[Flyway Starter] Docker attempt note: {e}")
    return False

def run_python_fallback(database_url: str = None) -> bool:
    """
    Native Python SQL migration runner compatible with Flyway's flyway_schema_history.
    Ensures seamless development experience even when neither Flyway CLI nor Docker is available.
    """
    if not database_url:
        from app.config import settings
        database_url = settings.DATABASE_URL

    print("[Flyway Starter] Running migrations via database engine...")
    try:
        from sqlalchemy import create_engine, text
        
        engine = create_engine(database_url)
        with engine.begin() as conn:
            # Create flyway_schema_history table if not exists (standard Flyway format)
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

            # Query applied migrations
            res = conn.execute(text("SELECT version FROM flyway_schema_history WHERE success = true;"))
            applied_versions = {row[0] for row in res.fetchall() if row[0] is not None}

            # Find all V*__*.sql files
            migrations_dir = get_migrations_dir()
            sql_files = sorted(glob.glob(str(migrations_dir / "V*.sql")))

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
                
                # Execute SQL statements
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
                print(f"[Flyway Starter] Successfully applied V{version} in {execution_time}ms.")

        print("[Flyway Starter] All migrations applied successfully.")
        return True
    except Exception as e:
        print(f"[Flyway Starter] Migration error: {e}", file=sys.stderr)
        return False

def run_migrations() -> bool:
    """Executes migrations using the best available method."""
    # 1. Try Flyway CLI
    if run_flyway_cli():
        return True
    # 2. Try Docker Flyway
    if run_flyway_docker():
        return True
    # 3. Fallback to native runner
    return run_python_fallback()

if __name__ == "__main__":
    success = run_migrations()
    sys.exit(0 if success else 1)

