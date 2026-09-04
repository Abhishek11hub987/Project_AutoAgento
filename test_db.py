from backend.database import SessionLocal, Conversation

db = SessionLocal()
history = db.query(Conversation).all()
print(f"Total messages in DB: {len(history)}")
for msg in history:
    print(f"[{msg.role}]: {msg.content[:50]}...")
