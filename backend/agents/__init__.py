from .priya import PriyaAgent
from .rohit import RohitAgent
from .base_agent import BaseAgent
from .supervisor import supervisor_agent

# Initialize agents
priya = PriyaAgent()
rohit = RohitAgent()
rahul = BaseAgent(name="Rahul", role="Marketing", system_prompt="You are Rahul, a marketing expert.")
anjali = BaseAgent(name="Anjali", role="E-Commerce", system_prompt="You are Anjali, an e-commerce manager.")

# Create a registry for easy access
agents_registry = {
    "1": priya,
    "priya": priya,
    "2": rohit,
    "rohit": rohit,
    "3": anjali,
    "anjali": anjali,
    "4": rahul,
    "rahul": rahul,
    "supervisor": supervisor_agent
}
