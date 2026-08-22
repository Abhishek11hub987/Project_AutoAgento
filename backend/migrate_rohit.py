import os
from database import SessionLocal, Agent, User

def migrate_rohit():
    db = SessionLocal()
    
    # 1. Get the admin user
    user = db.query(User).filter(User.email == "admin@autoagento.com").first()
    if not user:
        print("Admin user not found. Please run seed.py first.")
        db.close()
        return

    # 2. Check if Rohit already exists
    rohit = db.query(Agent).filter(Agent.name == "Rohit").first()
    if rohit:
        print("Rohit already exists in the database!")
        db.close()
        return

    # 3. Add Rohit
    new_agent = Agent(
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
    
    db.add(new_agent)
    db.commit()
    print("Rohit successfully added to the database!")
    db.close()

if __name__ == "__main__":
    migrate_rohit()
