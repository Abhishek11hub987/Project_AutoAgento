from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from agents import agents_registry
from typing import Optional, List
from database import get_db, Conversation
from sqlalchemy.orm import Session
from fastapi.responses import StreamingResponse
import json

router = APIRouter()

class ChatRequest(BaseModel):
    agent_id: str
    user_id: int
    message: str
    context: Optional[dict] = None

class ChatResponse(BaseModel):
    role: str
    content: str
    hasApproval: bool

def get_agent_int_id(agent_id_str: str) -> int:
    # Use 99 for supervisor so it doesn't collide
    agent_id_map = {"priya": 1, "rahul": 2, "anjali": 3, "rohit": 4, "supervisor": 99}
    return agent_id_map.get(agent_id_str.lower(), 1)

@router.get("/chat/history/{agent_id}")
async def get_chat_history(agent_id: str, db: Session = Depends(get_db)):
    agent_int_id = get_agent_int_id(agent_id)
    
    # Defaulting user_id to 1 since we don't have full JWT auth parsing yet.
    history = db.query(Conversation).filter(
        Conversation.agent_id == agent_int_id,
        Conversation.user_id == 1
    ).order_by(Conversation.created_at.asc()).all()
    
    return [
        {
            "id": msg.id,
            "role": msg.role,
            "content": msg.content,
            "type": msg.message_type
        } for msg in history
    ]

@router.delete("/chat/history/{agent_id}")
async def clear_chat_history(agent_id: str, db: Session = Depends(get_db)):
    agent_int_id = get_agent_int_id(agent_id)
    
    db.query(Conversation).filter(
        Conversation.agent_id == agent_int_id,
        Conversation.user_id == 1
    ).delete()
    db.commit()
    return {"message": f"History cleared for agent {agent_id}"}

@router.post("/chat", response_model=ChatResponse)
async def chat_with_agent(request: ChatRequest):
    agent_id = request.agent_id.lower()
    
    if request.context and request.context.get("multi_agent") is True:
        agent_id = "supervisor"
        
    agent = agents_registry.get(agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
        
    try:
        response = agent.process_message(request.message, request.context)
        return ChatResponse(
            role=response.get("role", "agent"),
            content=response.get("content", ""),
            hasApproval=response.get("hasApproval", False)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chat/stream")
async def chat_with_agent_stream(request: ChatRequest, db: Session = Depends(get_db)):
    agent_id = request.agent_id.lower()
    
    if request.context and request.context.get("multi_agent") is True:
        agent_id = "supervisor"

    agent = agents_registry.get(agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
        
    agent_int_id = get_agent_int_id(agent_id)
    
    # Save the user's message to the DB
    user_msg = Conversation(
        agent_id=agent_int_id,
        user_id=1, # Hardcoded until JWT auth
        role="user",
        content=request.message,
        message_type="text"
    )
    db.add(user_msg)
    db.commit()
        
    async def event_stream():
        full_response = ""
        for chunk in agent.process_message_stream(request.message, request.context):
            # The chunk is formatted as "data: {...}\n\n"
            if chunk.startswith("data: "):
                try:
                    data = json.loads(chunk[6:])
                    if data.get("text") and not chunk.startswith("data: {\"type\": \"tool_call\""):
                        full_response += data["text"]
                except:
                    pass
            yield chunk
            
        # Save the agent's final text response to the DB
        if full_response.strip():
            agent_msg = Conversation(
                agent_id=agent_int_id,
                user_id=1,
                role="agent",
                content=full_response,
                message_type="text"
            )
            db.add(agent_msg)
            db.commit()

    try:
        return StreamingResponse(
            event_stream(),
            media_type="text/event-stream"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
