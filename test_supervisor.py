import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from agents import agents_registry

supervisor = agents_registry.get('supervisor')

context = {
    "multi_agent": True,
    "file_path": "uploads/mock_invoices.csv"
}

prompt = "Analyze the dataset. First, tell me the total amount of all pending invoices. Then, generate a polished markdown report named 'invoice_summary.md' containing a table of only the overdue invoices."

print("Starting agent...")
try:
    response = supervisor.process_message(prompt, context)
    print("--- RESPONSE ---")
    print(response['content'])
except Exception as e:
    print(f"Error: {e}")
