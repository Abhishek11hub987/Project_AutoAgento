import os
from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

from database import SessionLocal, engine, Base, Agent, User
import json

# Ensure tables exist
Base.metadata.create_all(bind=engine)

def seed_database():
    db = SessionLocal()
    
    # Check if we already have users
    if db.query(User).first():
        print("Database already seeded!")
        db.close()
        return

    print("Seeding database with initial data...")
    
    # 1. Create default user
    user = User(
        email="admin@autoagento.com",
        name="Admin User",
        company_name="AutoAgento Demo",
        preferred_language="en"
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    # 2. Create the default agents
    agents = [
        Agent(
            user_id=user.id,
            name="Priya",
            role="Finance Executive",
            domain="finance",
            color="var(--accent-pink)",
            avatar_emoji="👩‍💼",
            certifications=["GST Filing", "Tally Integration", "Bank Reconciliation"],
            autonomy_level=2,
            status="online",
            performance_score=5.0,
            outcomes_delivered=0,
            is_hired=True
        ),
        Agent(
            user_id=user.id,
            name="Rahul",
            role="B2B Sales Researcher",
            domain="sales",
            color="var(--accent-blue)",
            avatar_emoji="👨‍💼",
            certifications=["LinkedIn Navigator", "Lead Enrichment"],
            autonomy_level=2,
            status="online",
            performance_score=5.0,
            outcomes_delivered=0,
            is_hired=True
        ),
        Agent(
            user_id=user.id,
            name="Anjali",
            role="Legal Assistant",
            domain="legal",
            color="var(--accent-purple)",
            avatar_emoji="👩‍⚖️",
            certifications=["Contract Act Compliance", "Company Law"],
            autonomy_level=1,
            status="idle",
            performance_score=5.0,
            outcomes_delivered=0,
            is_hired=True
        ),
        Agent(
            user_id=user.id,
            name="Rohit",
            role="Data Analyst",
            domain="data",
            color="var(--accent-emerald)",
            avatar_emoji="👨‍💻",
            certifications=["Excel Automation", "Python Pandas", "MIS Reports"],
            autonomy_level=2,
            status="online",
            performance_score=5.0,
            outcomes_delivered=0,
            is_hired=True
        )
    ]
    
    db.add_all(agents)
    db.commit()
    
    print("Database seeding completed successfully!")
    db.close()

if __name__ == "__main__":
    seed_database()
