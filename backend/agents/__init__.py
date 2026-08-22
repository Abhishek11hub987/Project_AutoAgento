from .priya import PriyaAgent
from .rohit import RohitAgent

# Initialize agents
priya = PriyaAgent()
rohit = RohitAgent()

# Create a registry for easy access
agents_registry = {
    "1": priya,
    "priya": priya,
    "2": rohit,
    "rohit": rohit
}
