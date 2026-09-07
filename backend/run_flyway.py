#!/usr/bin/env python3
"""
Convenience CLI script to trigger Flyway migrations.
Usage:
    python3 run_flyway.py
"""

import sys
from app.flyway_starter import run_migrations

if __name__ == "__main__":
    print("=== WTF University Database Migration Starter ===")
    success = run_migrations()
    if success:
        print("=== Database Migrations Finished Successfully ===")
        sys.exit(0)
    else:
        print("=== Database Migration Failed ===")
        sys.exit(1)

