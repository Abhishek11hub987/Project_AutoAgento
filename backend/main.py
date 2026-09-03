import os
from dotenv import load_dotenv
load_dotenv()

os.environ["PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION"] = "python"

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat, files, dashboard, agents
from database import engine, Base
import sentry_sdk

sentry_dsn = os.getenv("SENTRY_DSN")
if sentry_dsn:
    sentry_sdk.init(
        dsn=sentry_dsn,
        # Set traces_sample_rate to 1.0 to capture 100%
        # of transactions for performance monitoring.
        traces_sample_rate=1.0,
        # Set profiles_sample_rate to 1.0 to profile 100%
        # of sampled transactions.
        profiles_sample_rate=1.0,
    )

# Create database tables
Base.metadata.create_all(bind=engine)

# Auto-seed the database if it's empty (crucial for Render deployments using ephemeral SQLite)
try:
    from seed import seed_database
    seed_database()
except Exception as e:
    print(f"Error seeding database: {e}")

app = FastAPI(title="AutoAgento API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Update for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to AutoAgento API"}

# Include routers here when ready
app.include_router(chat.router, prefix="/api")
app.include_router(files.router, prefix="/api/files")
app.include_router(dashboard.router, prefix="/api/dashboard")
app.include_router(agents.router, prefix="/api/agents")
