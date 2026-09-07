# WTF University - Full Stack Platform

A healthcare & university wellness platform built with **Next.js 14** (Frontend) and **FastAPI** (Backend) with **JWT Authentication**, **PostgreSQL**, and **Flyway Database Migrations**.

---

## 📁 Repository Structure

```
├── frontend/               # Next.js 14 App Router application
│   ├── app/                # Pages, layouts, routing
│   ├── components/         # UI components & interactive modals
│   ├── data/               # Curriculum & mock content
│   ├── lib/                # API client & utility functions
│   ├── types/              # TypeScript type definitions
│   └── .env.local          # Frontend environment variables
│
├── backend/                # FastAPI application
│   ├── app/                # Application source code
│   │   ├── api/            # API routes (v1 auth, health, users)
│   │   ├── core/           # Security (JWT, bcrypt), Email (SMTP)
│   │   ├── models/         # SQLAlchemy 2.0 ORM models
│   │   ├── schemas/        # Pydantic v2 schemas
│   │   ├── config.py       # Pydantic Settings (.env loader)
│   │   ├── database.py     # SQLAlchemy DB connection & session
│   │   ├── flyway_starter.py # Flyway migration runner & fallback engine
│   │   └── main.py         # FastAPI entrypoint & CORS middleware
│   ├── migrations/         # Flyway versioned SQL migrations (V1, V2...)
│   ├── flyway.conf         # Flyway CLI/Docker configuration
│   ├── run_flyway.py       # Standalone migration script
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile          # Backend container file
│   └── .env                # Backend secrets & configuration
│
└── docker-compose.yml      # Orchestration (PostgreSQL + Flyway + Backend + Frontend)
```

---

## 🚀 Getting Started

### 1. Run Everything with Docker (Recommended)

Make sure Docker is running, then run:

```bash
docker compose up --build
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8000](http://localhost:8000)
- **Interactive Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### 2. Local Development

#### Backend Setup:

```bash
cd backend

# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run Flyway migrations
python3 run_flyway.py

# Start FastAPI dev server
uvicorn app.main:app --reload --port 8000
```

#### Frontend Setup:

```bash
cd frontend

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```

---

