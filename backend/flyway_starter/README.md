# WTF University - Flyway Starter

A dedicated, self-contained database migration starter for PostgreSQL.

---

## 📁 Directory Structure

```
flyway_starter/
├── flyway.conf              # Flyway CLI and Docker configuration
├── starter.py               # 3-tier migration engine (CLI -> Docker -> Native Python)
├── run.py                   # Standalone CLI execution entry point
├── migrations/              # Flyway SQL versioned migrations
│   ├── V1__initial_schema.sql       # Users, roles, password reset tokens
│   ├── V2__seed_roles.sql           # Default system role seeds
│   └── V3__create_admin_tables.sql  # Admin authentication and profile tables
└── README.md                # Documentation
```

---

## 🚀 How to Run Migrations

### 1. Standalone Python Runner (No Java or Flyway CLI required)
```bash
python3 backend/flyway_starter/run.py
```
Or from within the `flyway_starter` directory:
```bash
cd backend/flyway_starter
python3 run.py
```

### 2. Via Flyway CLI (If installed on your machine)
```bash
cd backend/flyway_starter
flyway migrate
```

### 3. Via Docker (Standalone container)
```bash
cd backend/flyway_starter
docker run --rm --net=host \
  -v $(pwd)/migrations:/flyway/sql:ro \
  -v $(pwd)/flyway.conf:/flyway/conf/flyway.conf:ro \
  flyway/flyway:latest migrate
```

### 4. Via Docker Compose (Full stack)
```bash
docker compose up flyway
```

