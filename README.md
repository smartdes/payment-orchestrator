# Payment & Billing Orchestration

FastAPI + PostgreSQL + React (Vite) payment orchestration service.
Phase 1: Visa/Mastercard via Paystack Sandbox. Phase 2: M-Pesa via Daraja Sandbox.

## Run locally
Backend: `cd backend && source .venv/bin/activate && uvicorn app.main:app --reload --port 8000`
Frontend: `cd frontend && npm run dev`

Copy `.env.example` to `.env` in both `backend/` and `frontend/`.
