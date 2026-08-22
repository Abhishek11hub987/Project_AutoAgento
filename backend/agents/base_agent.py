class BaseAgent:
    def __init__(self, name: str, role: str, system_prompt: str, tools: list = None):
        self.name = name
        self.role = role
        self.system_prompt = system_prompt
        self.tools = tools if tools else []
        self.conversation_history = []

    def _execute_tool_loop(self, user_message: str, context: dict = None) -> str:
        from services.llm_service import llm_service
        
        # Append user message
        if context and 'file_path' in context:
            msg = f"User attached a file at {context['file_path']}\nUser Message: {user_message}"
        else:
            msg = user_message
            
        self.conversation_history.append({"role": "user", "content": msg})
        
        max_loops = 5
        for _ in range(max_loops):
            response = llm_service.generate_response_with_tools(
                self.system_prompt,
                self.conversation_history,
                self.tools
            )
            
            if response["type"] == "text":
                self.conversation_history.append({"role": "model", "content": response["text"]})
                return response["text"]
                
            elif response["type"] == "tool_call":
                func_name = response["function_name"]
                args = response["args"]
                
                # Execute tool
                tool_result = f"Error: Tool {func_name} not found."
                for tool in self.tools:
                    if tool.__name__ == func_name:
                        try:
                            tool_result = str(tool(**args))
                        except Exception as e:
                            tool_result = f"Error executing tool: {str(e)}"
                        break
                        
                self.conversation_history.append({
                    "role": "user", 
                    "type": "tool_response",
                    "function_name": func_name,
                    "content": tool_result
                })
        
        return "Error: Reached maximum tool execution loops without a final answer."

    def process_message(self, user_message: str, context: dict = None) -> dict:
        """
        Synchronous processing.
        """
        response_text = self._execute_tool_loop(user_message, context)
        return {
            "role": "agent",
            "content": response_text,
            "hasApproval": False
        }

    def process_message_stream(self, user_message: str, context: dict = None):
        """
        Stream the agent's response. Tool calling is synchronous internally, 
        and we yield the final result.
        """
        import json
        
        # We can yield a "thinking" message here if we want
        yield f"data: {json.dumps({'text': 'Thinking... '})}\n\n"
        
        response_text = self._execute_tool_loop(user_message, context)
        
        # In a real app we'd stream this word by word, but for now we yield the whole thing
        yield f"data: {json.dumps({'text': response_text.replace('Thinking... ', '')})}\n\n"
