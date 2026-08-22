from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from database import get_db, Agent

router = APIRouter()

@router.get("/", response_model=List[Dict[str, Any]])
def get_agents(db: Session = Depends(get_db)):
    """Fetch all hired agents from the database."""
    agents = db.query(Agent).filter(Agent.is_hired == True).all()
    
    return [
        {
            "id": agent.id,
            "name": agent.name,
            "role": agent.role,
            "domain": agent.domain,
            "emoji": agent.avatar_emoji,
            "color": agent.color,
            "certifications": agent.certifications or [],
            "status": agent.status,
            "tasks": agent.outcomes_delivered,
            "score": agent.performance_score
        }
        for agent in agents
    ]

@router.get("/{agent_id}", response_model=Dict[str, Any])
def get_agent(agent_id: int, db: Session = Depends(get_db)):
    """Fetch a specific agent by ID."""
    agent = db.query(Agent).filter(Agent.id == agent_id).first()
    
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
        
    return {
        "id": agent.id,
        "name": agent.name,
        "role": agent.role,
        "domain": agent.domain,
        "emoji": agent.avatar_emoji,
        "color": agent.color,
        "certifications": agent.certifications or [],
        "status": agent.status,
        "tasks": agent.outcomes_delivered,
        "score": agent.performance_score,
        "autonomy_level": agent.autonomy_level
    }
