import os
import json
import requests
import google.generativeai as genai
from groq import Groq
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env')
load_dotenv(dotenv_path)

class LLMService:
    def __init__(self):
        # Initialize Gemini
        self.gemini_key = os.getenv("GEMINI_API_KEY")
        if self.gemini_key and self.gemini_key != "your_google_ai_studio_key_here":
            genai.configure(api_key=self.gemini_key)
            self.gemini_model = genai.GenerativeModel('gemini-1.5-flash')
        else:
            self.gemini_model = None
            
        # Initialize Groq as fallback
        self.groq_key = os.getenv("GROQ_API_KEY")
        if self.groq_key and self.groq_key != "your_groq_key_here":
            self.groq_client = Groq(api_key=self.groq_key)
        else:
            self.groq_client = None
            
        # Initialize Ollama
        self.ollama_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")

    def generate_response(self, system_prompt: str, user_message: str, fallback_level=0) -> str:
        """
        Generate a response using Gemini -> Groq -> Ollama
        """
        if fallback_level == 0 and self.gemini_model:
            try:
                response = self.gemini_model.generate_content([
                    {"role": "user", "parts": [f"System: {system_prompt}\n\nUser: {user_message}"]}
                ])
                return response.text
            except Exception as e:
                print(f"Gemini API Error: {e}. Falling back to Groq...")
                return self.generate_response(system_prompt, user_message, fallback_level=1)
                
        elif fallback_level <= 1 and self.groq_client:
            try:
                completion = self.groq_client.chat.completions.create(
                    model="groq/compound-mini",
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_message}
                    ],
                    temperature=0.5,
                )
                return completion.choices[0].message.content
            except Exception as e:
                print(f"Groq API Error: {e}. Falling back to Ollama...")
                return self.generate_response(system_prompt, user_message, fallback_level=2)
                
        else:
            # Fallback 2: Ollama Local Model
            try:
                response = requests.post(f"{self.ollama_url}/api/chat", json={
                    "model": "llama3",
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_message}
                    ],
                    "stream": False
                }, timeout=30)
                if response.status_code == 200:
                    return response.json().get("message", {}).get("content", "")
                else:
                    raise Exception(f"Ollama returned {response.status_code}")
            except Exception as e:
                print(f"Ollama Error: {e}")
                return "I'm sorry, I am currently unable to connect to any of my reasoning engines (Gemini, Groq, or Ollama). Please check your API keys or ensure Ollama is running."

    def generate_response_stream(self, system_prompt: str, user_message: str, fallback_level=0):
        """
        Stream a response using Gemini -> Groq -> Ollama
        """
        if fallback_level == 0 and self.gemini_model:
            try:
                response = self.gemini_model.generate_content(
                    [{"role": "user", "parts": [f"System: {system_prompt}\n\nUser: {user_message}"]}],
                    stream=True
                )
                for chunk in response:
                    yield f"data: {json.dumps({'text': chunk.text})}\n\n"
                return
            except Exception as e:
                print(f"Gemini API Error in stream: {e}. Falling back to Groq...")
                yield from self.generate_response_stream(system_prompt, user_message, fallback_level=1)
                return
                
        elif fallback_level <= 1 and self.groq_client:
            try:
                stream = self.groq_client.chat.completions.create(
                    model="groq/compound-mini",
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_message}
                    ],
                    temperature=0.5,
                    stream=True
                )
                for chunk in stream:
                    content = chunk.choices[0].delta.content
                    if content:
                        yield f"data: {json.dumps({'text': content})}\n\n"
                return
            except Exception as e:
                print(f"Groq API Error in stream: {e}. Falling back to Ollama...")
                yield from self.generate_response_stream(system_prompt, user_message, fallback_level=2)
                return
                
        else:
            # Fallback 2: Ollama Local Model Streaming
            try:
                response = requests.post(f"{self.ollama_url}/api/chat", json={
                    "model": "llama3",
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_message}
                    ],
                    "stream": True
                }, stream=True, timeout=30)
                
                if response.status_code == 200:
                    for line in response.iter_lines():
                        if line:
                            data = json.loads(line)
                            content = data.get("message", {}).get("content", "")
                            if content:
                                yield f"data: {json.dumps({'text': content})}\n\n"
                    return
                else:
                    raise Exception(f"Ollama returned {response.status_code}")
            except Exception as e:
                print(f"Ollama Error in stream: {e}")
                yield f"data: {json.dumps({'text': 'System Error: Unable to connect to any reasoning engines.'})}\n\n"

    def generate_response_with_tools(self, system_prompt: str, messages: list, tools: list):
        """
        messages: [{"role": "user", "content": "..."}, {"role": "model", "content": "..."}, ...]
        tools: [list of python functions]
        """
        if not self.gemini_model:
            return {"type": "text", "text": "Error: Tools are currently only supported with Gemini API. Please set GEMINI_API_KEY."}
            
        try:
            # Convert our message format to Gemini's expected format
            gemini_messages = []
            
            # Insert system prompt into the first user message
            if messages and messages[0]["role"] == "user":
                first_msg = f"System: {system_prompt}\n\nUser: {messages[0]['content']}"
                gemini_messages.append({"role": "user", "parts": [first_msg]})
                messages_to_process = messages[1:]
            else:
                gemini_messages.append({"role": "user", "parts": [f"System: {system_prompt}\n\nUser: hello"]})
                messages_to_process = messages
                
            for msg in messages_to_process:
                role = "user" if msg["role"] == "user" else "model"
                content = msg["content"]
                
                # Gemini doesn't like empty parts, and we need to handle tool responses
                if msg.get("type") == "tool_response":
                    role = "user"
                    content = f"Tool Response for {msg.get('function_name')}: {msg.get('content')}"
                
                gemini_messages.append({"role": role, "parts": [content]})

            response = self.gemini_model.generate_content(
                gemini_messages,
                tools=tools
            )
            
            if not response.candidates:
                return {"type": "text", "text": "Error: Empty response from model."}
                
            first_part = response.candidates[0].content.parts[0]
            
            if hasattr(first_part, "function_call") and first_part.function_call:
                fc = first_part.function_call
                args = {k: v for k, v in fc.args.items()}
                return {
                    "type": "tool_call",
                    "function_name": fc.name,
                    "args": args
                }
            else:
                return {
                    "type": "text",
                    "text": response.text
                }
                
        except Exception as e:
            print(f"Gemini Tool Error: {e}. Falling back to Groq for tools...")
            
            if not self.groq_client:
                return {"type": "text", "text": f"Error executing model with tools: {str(e)}\n(And Groq fallback is not configured)"}
                
            try:
                import inspect
                groq_tools = []
                for tool in tools:
                    sig = inspect.signature(tool)
                    properties = {}
                    required = []
                    for name, param in sig.parameters.items():
                        param_type = "string"
                        if param.annotation == int: param_type = "integer"
                        elif param.annotation == bool: param_type = "boolean"
                        
                        properties[name] = {"type": param_type, "description": f"{name} parameter"}
                        if param.default == inspect.Parameter.empty: required.append(name)
                            
                    groq_tools.append({
                        "type": "function",
                        "function": {
                            "name": tool.__name__,
                            "description": tool.__doc__.strip() if tool.__doc__ else f"Call {tool.__name__}",
                            "parameters": {
                                "type": "object",
                                "properties": properties,
                                "required": required
                            }
                        }
                    })
                
                # Format messages for Groq
                groq_messages = [{"role": "system", "content": system_prompt}]
                for msg in messages:
                    role = "user" if msg["role"] == "user" else "assistant"
                    content = msg["content"]
                    if msg.get("type") == "tool_response":
                        role = "user"
                        content = f"Tool Response for {msg.get('function_name')}: {msg.get('content')}"
                    groq_messages.append({"role": role, "content": content})
                    
                completion = self.groq_client.chat.completions.create(
                    model="groq/compound-mini", # Groq recommends this for tool calling
                    messages=groq_messages,
                    tools=groq_tools,
                    tool_choice="auto",
                    temperature=0.3
                )
                
                response_message = completion.choices[0].message
                
                if response_message.tool_calls:
                    tc = response_message.tool_calls[0]
                    args = json.loads(tc.function.arguments)
                    return {
                        "type": "tool_call",
                        "function_name": tc.function.name,
                        "args": args
                    }
                else:
                    return {
                        "type": "text",
                        "text": response_message.content
                    }
            except Exception as groq_e:
                print(f"Groq Tool Error: {groq_e}")
                return {"type": "text", "text": f"Both Gemini and Groq failed. Gemini error: {str(e)}. Groq error: {str(groq_e)}"}

llm_service = LLMService()
