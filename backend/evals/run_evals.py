import sys
import os
import json

# Add parent dir to path so we can import from backend modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal, Agent
from agents import priya

class Evaluator:
    def __init__(self, agent, agent_db_id: int):
        self.agent = agent
        self.agent_db_id = agent_db_id
        
    def run_gst_eval(self) -> bool:
        print(f"\\n[Eval] Starting 'GST Filing' certification eval for {self.agent.name}...")
        
        # Define the test queries and the expected substrings in the answer
        tests = [
            {
                "query": "If I sell a laptop for Rs 50,000 to someone in the same state, and the GST rate is 18%, what are the CGST and SGST amounts?",
                "expected_keywords": ["4,500", "4500", "cgst", "sgst"]
            },
            {
                "query": "Is GSTR-1 for outward supplies or inward supplies?",
                "expected_keywords": ["outward", "sales"]
            },
            {
                "query": "If I have an IGST credit of Rs 10,000, can I use it to pay my CGST liability?",
                "expected_keywords": ["yes", "can be used", "set off"]
            }
        ]
        
        passed_all = True
        
        for i, test in enumerate(tests):
            print(f"\\n  Test {i+1}: {test['query']}")
            response = self.agent.process_message(test['query'])
            content = response.get("content", "").lower()
            print(f"  Agent Answer: {content[:100]}...")
            
            # Simple keyword matching for evaluation
            # In a real production system, you would use an LLM-as-a-judge here.
            matched = any(kw in content for kw in test['expected_keywords'])
            
            if matched:
                print(f"  [PASS] Pass")
            else:
                print(f"  [FAIL] Fail (Expected one of: {test['expected_keywords']})")
                passed_all = False
                
            import time
            time.sleep(8) # Avoid API rate limits
                
        return passed_all

def main():
    db = SessionLocal()
    
    # 1. Fetch Priya from the DB
    # Assuming Priya is agent ID 1 based on our seed script
    db_agent = db.query(Agent).filter(Agent.name == "Priya").first()
    
    if not db_agent:
        print("Error: Priya not found in the database. Run seed.py first.")
        return
        
    # 2. Run the Evaluator
    evaluator = Evaluator(priya, db_agent.id)
    passed = evaluator.run_gst_eval()
    
    # 3. Grant Certification if passed
    if passed:
        print(f"\\n[SUCCESS] {db_agent.name} PASSED the evaluation! Granting 'Advanced GST Filing' certification...")
        
        # Parse current certs, append, and save
        certs = db_agent.certifications or []
        if "Advanced GST Filing" not in certs:
            certs.append("Advanced GST Filing")
            db_agent.certifications = certs
            
            # Also increase performance score
            db_agent.performance_score = min(5.0, db_agent.performance_score + 0.2)
            
            db.commit()
            print("Database successfully updated!")
        else:
            print("Agent already has this certification.")
    else:
        print(f"\\n[FAILED] {db_agent.name} failed the evaluation. Certification denied.")
        
    db.close()

if __name__ == "__main__":
    main()
