class BaseAgent:
    def __init__(self, name: str, role: str, system_prompt: str, tools: list = None):
        self.name = name
        self.role = role
        self.system_prompt = system_prompt
        self.tools = tools if tools else []
        self.conversation_history = []

    def _execute_tool_loop_gen(self, user_message: str, context: dict = None):
        from services.llm_service import llm_service
        import json
        
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
                yield {"type": "text", "content": response["text"]}
                return
                
            elif response["type"] == "tool_call":
                func_name = response["function_name"]
                args = response["args"]
                
                # Yield a tool call event to the frontend
                yield {"type": "tool_call", "function_name": func_name}
                
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
        
        yield {"type": "text", "content": "Error: Reached maximum tool execution loops without a final answer."}

    def process_message(self, user_message: str, context: dict = None) -> dict:
        """
        Synchronous processing. We exhaust the generator and return the final text.
        """
        final_text = ""
        for event in self._execute_tool_loop_gen(user_message, context):
            if event["type"] == "text":
                final_text = event["content"]
                
        return {
            "role": "agent",
            "content": final_text,
            "hasApproval": False
        }

    def process_message_stream(self, user_message: str, context: dict = None):
        """
        Stream the agent's response, including live tool events.
        """
        import json
        for event in self._execute_tool_loop_gen(user_message, context):
            if event["type"] == "tool_call":
                yield f"data: {json.dumps({'type': 'tool_call', 'text': f'⚙️ Agent is using {event.get('function_name', 'a tool')}...\\n'})}\n\n"
            elif event["type"] == "text":
                yield f"data: {json.dumps({'type': 'text', 'text': event['content']})}\n\n"
