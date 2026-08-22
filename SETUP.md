# Setup Guide for AutoAgento

## Prerequisites
- Node.js (v18+)
- Python (3.10+)
- Docker (Optional, for easy startup)

## Quick Start (Docker)
1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your API keys (especially `GEMINI_API_KEY`).
3. Run `docker-compose up --build`
4. Visit `http://localhost:5173`

## Manual Start

### Backend
1. Navigate to `/backend`
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Run the server: `uvicorn main:app --reload`
6. API will be available at `http://localhost:8000`

### Frontend
1. Navigate to `/frontend`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. App will be available at `http://localhost:5173`
