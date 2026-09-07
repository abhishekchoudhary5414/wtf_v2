#!/usr/bin/env python3
"""
CLI runner for the WTF University Flyway Starter.
Usage:
    python3 run.py
    or from project root:
    python3 backend/flyway_starter/run.py
"""

import sys
from pathlib import Path

# Ensure flyway_starter folder is in sys.path
CURRENT_DIR = Path(__file__).resolve().parent
if str(CURRENT_DIR) not in sys.path:
    sys.path.insert(0, str(CURRENT_DIR))

from starter import run_migrations

if __name__ == "__main__":
    print("==================================================")
    print("      WTF University - Flyway Starter Runner      ")
    print("==================================================")
    success = run_migrations()
    if success:
        print("==================================================")
        print("    Database Migrations Completed Successfully    ")
        print("==================================================")
        sys.exit(0)
    else:
        print("==================================================")
        print("          Database Migrations FAILED              ")
        print("==================================================")
        sys.exit(1)

