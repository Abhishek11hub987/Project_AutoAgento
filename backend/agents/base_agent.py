class BaseAgent:
    def __init__(self, name: str, role: str, system_prompt: str):
        self.name = name
        self.role = role
        self.system_prompt = system_prompt

    def process_message(self, user_message: str, context: dict = None) -> dict:
        """
        Process the user message and return the agent's response.
        Subclasses should override this to handle specific logic, tool calls, and approvals.
        """
        from services.llm_service import llm_service
        
        response_text = llm_service.generate_response(self.system_prompt, user_message)
        
        return {
            "role": "agent",
            "content": response_text,
            "hasApproval": False
        }

    def process_message_stream(self, user_message: str, context: dict = None):
        """
        Stream the agent's response.
        """
        from services.llm_service import llm_service
        return llm_service.generate_response_stream(self.system_prompt, user_message)
