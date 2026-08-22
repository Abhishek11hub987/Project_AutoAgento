from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from agents import agents_registry
from typing import Optional

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

from fastapi.responses import StreamingResponse

@router.post("/chat", response_model=ChatResponse)
async def chat_with_agent(request: ChatRequest):
    agent = agents_registry.get(request.agent_id.lower())
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
async def chat_with_agent_stream(request: ChatRequest):
    agent = agents_registry.get(request.agent_id.lower())
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
        
    try:
        return StreamingResponse(
            agent.process_message_stream(request.message, request.context),
            media_type="text/event-stream"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
