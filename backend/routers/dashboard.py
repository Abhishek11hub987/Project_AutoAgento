from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Dict, Any
from database import get_db, Task, Agent, ActivityLog

router = APIRouter()

@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    # Calculate real stats from the database
    
    # 1. Total active agents (status == 'online' or 'busy')
    active_agents = db.query(func.count(Agent.id)).filter(Agent.status.in_(["online", "busy"])).scalar() or 0
    
    # 2. Total tasks completed
    tasks_completed = db.query(func.count(Task.id)).filter(Task.status == "completed").scalar() or 0
    
    # 3. Total revenue impact (sum of outcome_value for completed tasks)
    revenue_impact = db.query(func.sum(Task.outcome_value)).filter(Task.status == "completed").scalar() or 0.0
    
    # We will mock Avg Response time for now until we implement actual timers
    avg_response = "—"
    
    return {
        "stats": [
            {
                "label": "Active Agents",
                "value": str(active_agents),
                "change": "Active right now",
                "trend": "neutral" if active_agents == 0 else "up",
                "icon_name": "Users",
                "color": "var(--accent-lime)"
            },
            {
                "label": "Tasks Completed",
                "value": str(tasks_completed),
                "change": "All time",
                "trend": "neutral",
                "icon_name": "CheckCircle2",
                "color": "var(--accent-cyan)"
            },
            {
                "label": "Revenue Impact",
                "value": f"₹{revenue_impact:,.0f}",
                "change": "Value generated",
                "trend": "neutral",
                "icon_name": "IndianRupee",
                "color": "var(--accent-emerald)"
            },
            {
                "label": "Avg Response",
                "value": avg_response,
                "change": "Speed",
                "trend": "neutral",
                "icon_name": "Clock",
                "color": "var(--accent-purple)"
            }
        ]
    }

@router.get("/activity", response_model=List[Dict[str, Any]])
def get_recent_activity(db: Session = Depends(get_db), limit: int = 5):
    # Fetch recent activity logs from the database
    logs = db.query(ActivityLog).order_by(ActivityLog.created_at.desc()).limit(limit).all()
    
    return [
        {
            "id": log.id,
            "event_type": log.event_type,
            "description": log.description,
            "created_at": log.created_at.isoformat(),
            "agent_id": log.agent_id
        }
        for log in logs
    ]
