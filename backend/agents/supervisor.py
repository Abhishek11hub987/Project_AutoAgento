from .base_agent import BaseAgent

# Delegation tools that programmatically call other agents
def delegate_to_priya(task: str) -> str:
    """
    Delegate a task to Priya, the Certified Finance Executive.
    Use this for GST compliance, Tally integration, bank reconciliation, math verification, and invoice generation.
    Pass the clear instructions and data needed as the task argument.
    """
    from . import agents_registry
    priya = agents_registry.get("priya")
    if not priya:
        return "Error: Agent Priya not found."
    response = priya.process_message(task, context={"multi_agent": False})
    return f"[Priya's Response]:\n{response['content']}"

def delegate_to_rohit(task: str) -> str:
    """
    Delegate a task to Rohit, the Data Architect.
    Use this for complex data cleaning, python pandas scripting, database architecture, or formatting raw data files.
    Pass the clear instructions and data needed as the task argument.
    """
    from . import agents_registry
    rohit = agents_registry.get("rohit")
    if not rohit:
        return "Error: Agent Rohit not found."
    response = rohit.process_message(task, context={"multi_agent": False})
    return f"[Rohit's Response]:\n{response['content']}"

def delegate_to_rahul(task: str) -> str:
    """
    Delegate a task to Rahul, the Growth & Marketing Lead.
    Use this for writing emails, analyzing leads, generating marketing copy, or reaching out to prospects.
    Pass the clear instructions and data needed as the task argument.
    """
    from . import agents_registry
    rahul = agents_registry.get("rahul")
    if not rahul:
        return "Error: Agent Rahul not found."
    response = rahul.process_message(task, context={"multi_agent": False})
    return f"[Rahul's Response]:\n{response['content']}"

def delegate_to_anjali(task: str) -> str:
    """
    Delegate a task to Anjali, the E-Commerce Manager.
    Use this for inventory sync, order fulfillment, WooCommerce/Shopify logic, and product cataloging.
    Pass the clear instructions and data needed as the task argument.
    """
    from . import agents_registry
    anjali = agents_registry.get("anjali")
    if not anjali:
        return "Error: Agent Anjali not found."
    response = anjali.process_message(task, context={"multi_agent": False})
    return f"[Anjali's Response]:\n{response['content']}"

supervisor_system_prompt = """
You are the AutoAgento Supervisor Agent, an elite AI manager.
Your job is to analyze complex user requests, break them down into actionable sub-tasks, and delegate them to your team of specialized agents.
You have access to 4 team members:
1. Priya (Finance & GST)
2. Rohit (Data & Python Scripting)
3. Rahul (Marketing & Leads)
4. Anjali (E-Commerce)

You also have access to standard tools like file reading, python execution, and report generation, but you should delegate specific logic to the appropriate team members whenever possible.

CRITICAL INSTRUCTION: When you respond to the user, you MUST format your final response strictly as a "Managerial Report" with the following 4 sections exactly:

### 1. Team Assembly
List which agents you hired for this task and why. (e.g., "I hired Rohit for data analysis and Priya for financial validation.")

### 2. Execution Log
Provide a short summary of what each agent did. 
IMPORTANT: You must include a markdown link to the specific agent's workspace so the user can review their work.
Use these exact links:
- For Priya: [View Priya's Log](/dashboard/agent/1)
- For Rohit: [View Rohit's Log](/dashboard/agent/4)
- For Rahul: [View Rahul's Log](/dashboard/agent/2)
- For Anjali: [View Anjali's Log](/dashboard/agent/3)

### 3. Generated Artifacts
Provide the direct markdown links to any files you or your team generated (e.g., `[Download invoice_summary.md](/uploads/invoice_summary.md)`). If no files were generated, state "None".

### 4. Final Summary
Synthesize the information from your team into a single, cohesive, and professional response for the user. Do not simply copy-paste their responses; provide a true managerial summary answering the user's prompt.
"""

# Include standard tools plus the delegation tools
from .tools import AVAILABLE_TOOLS
supervisor_tools = AVAILABLE_TOOLS + [
    delegate_to_priya,
    delegate_to_rohit,
    delegate_to_rahul,
    delegate_to_anjali
]

supervisor_agent = BaseAgent(
    name="Supervisor",
    role="Multi-Agent Orchestrator",
    system_prompt=supervisor_system_prompt,
    tools=supervisor_tools
)
