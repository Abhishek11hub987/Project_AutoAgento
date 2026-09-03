from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from database import get_db, Agent

router = APIRouter()

@router.get("/", response_model=List[Dict[str, Any]])
def get_agents(db: Session = Depends(get_db)):
    """Fetch all hired agents from the database."""
    agents = db.query(Agent).filter(Agent.is_hired == True).all()
    
    agent_list = [
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
    
    # Dynamically inject the Supervisor so it appears on the dashboard
    agent_list.insert(0, {
        "id": "supervisor",
        "name": "Supervisor",
        "role": "Multi-Agent Orchestrator",
        "domain": "Management",
        "emoji": "👑",
        "color": "var(--accent-purple)",
        "certifications": ["Task Delegation", "Architecture", "QA Analysis"],
        "status": "online",
        "tasks": sum([a.outcomes_delivered for a in agents]),
        "score": 5.0
    })
    
    return agent_list

@router.get("/{agent_id}", response_model=Dict[str, Any])
def get_agent(agent_id: str, db: Session = Depends(get_db)):
    """Fetch a specific agent by ID."""
    if str(agent_id).lower() == "supervisor":
        return {
            "id": "supervisor",
            "name": "Supervisor",
            "role": "Multi-Agent Orchestrator",
            "domain": "Management",
            "emoji": "👑",
            "color": "var(--accent-purple)",
            "certifications": ["Task Delegation", "Architecture", "QA Analysis"],
            "status": "online",
            "tasks": 0,
            "score": 5.0,
            "autonomy_level": 3
        }
        
    try:
        agent_id_int = int(agent_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid agent ID format")
        
    agent = db.query(Agent).filter(Agent.id == agent_id_int).first()
    
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
