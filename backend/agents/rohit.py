import pandas as pd
import io
import os
from .base_agent import BaseAgent
from services.llm_service import llm_service

class RohitAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Rohit",
            role="B2B Sales Researcher / Data Analyst",
            system_prompt=(
                "You are Rohit, an expert B2B Sales Researcher and Data Analyst. "
                "You specialize in analyzing Excel spreadsheets and CSV data. "
                "When provided with data context, summarize findings clearly and answer the user's questions based on the numbers provided. "
                "Be highly analytical, concise, and professional."
            )
        )
        self.conversation_history = []
        
    def _read_data(self, file_path):
        """Helper to read an excel or csv file and return a summary string."""
        if not os.path.exists(file_path):
            return "Error: File not found."
            
        try:
            if file_path.endswith('.csv'):
                df = pd.read_csv(file_path)
            elif file_path.endswith('.xlsx') or file_path.endswith('.xls'):
                df = pd.read_excel(file_path)
            else:
                return "Unsupported file format."
                
            summary = []
            summary.append(f"Dataset has {df.shape[0]} rows and {df.shape[1]} columns.")
            summary.append(f"Columns: {', '.join(df.columns.tolist())}")
            
            # Add a small preview of the data (first 5 rows) in markdown table format
            summary.append("Data Preview (first 5 rows):")
            summary.append(df.head().to_markdown(index=False))
            
            return "\\n".join(summary)
        except Exception as e:
            return f"Error reading data: {str(e)}"

    def process_message(self, message: str, context: dict = None) -> dict:
        self.conversation_history.append({"role": "user", "content": message})
        
        # Build prompt
        prompt = f"System: {self.system_prompt}\\n\\n"
        
        # If there's a file attached in the context, read it
        if context and 'file_path' in context:
            file_path = context['file_path']
            data_summary = self._read_data(file_path)
            prompt += f"Attached Data Context:\\n{data_summary}\\n\\n"
            
        # Add history
        for msg in self.conversation_history[-5:]:
            prompt += f"{msg['role'].capitalize()}: {msg['content']}\\n"
            
        prompt += "Agent:"
        
        try:
            response_text = llm_service.generate_response(
                system_prompt=self.system_prompt, 
                user_message=prompt
            )
            self.conversation_history.append({"role": "agent", "content": response_text})
            
            return {
                "role": "agent",
                "content": response_text,
                "hasApproval": False
            }
        except Exception as e:
            return {
                "role": "agent",
                "content": f"I encountered an error analyzing the data: {str(e)}",
                "hasApproval": False
            }
