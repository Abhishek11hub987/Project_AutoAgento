import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, inspect

load_dotenv()

db_url = os.getenv("DATABASE_URL")
if not db_url:
    print("No DATABASE_URL found in .env")
    exit(1)

# Render uses postgres://, but SQLAlchemy requires postgresql://
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

print(f"Connecting to: {db_url.split('@')[-1]}")

try:
    engine = create_engine(db_url)
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    print("Successfully connected to the database!")
    if tables:
        print(f"Found {len(tables)} tables: {', '.join(tables)}")
    else:
        print("Connected, but no tables found in the database.")
except Exception as e:
    print(f"Failed to connect to the database: {e}")
