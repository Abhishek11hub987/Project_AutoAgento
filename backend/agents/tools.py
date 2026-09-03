import pandas as pd
import os
import uuid
import sys
from io import StringIO

def read_excel_file(file_path: str) -> str:
    """
    Reads an Excel or CSV file and returns a summary of its data (columns, shape, and first 5 rows).
    """
    if not os.path.exists(file_path):
        return f"Error: File not found at {file_path}"
        
    try:
        if file_path.endswith('.csv'):
            df = pd.read_csv(file_path)
        elif file_path.endswith('.xlsx') or file_path.endswith('.xls'):
            df = pd.read_excel(file_path)
        else:
            return "Error: Unsupported file format. Only .csv and .xlsx are supported."
            
        summary = f"Dataset Shape: {df.shape[0]} rows, {df.shape[1]} columns.\n"
        summary += f"Columns: {', '.join(df.columns.tolist())}\n\n"
        summary += "Data Preview (first 5 rows):\n"
        summary += df.head().to_markdown(index=False)
        return summary
    except Exception as e:
        return f"Error reading data: {str(e)}"

def modify_excel_file(file_path: str, python_pandas_code: str) -> str:
    """
    Modifies an Excel or CSV file by executing the provided python_pandas_code.
    The code has access to a variable named 'df' which is the DataFrame of the file.
    The code must modify the 'df' variable. 
    Returns a URL to the newly created modified file.
    """
    if not os.path.exists(file_path):
        return f"Error: File not found at {file_path}"
        
    try:
        if file_path.endswith('.csv'):
            df = pd.read_csv(file_path)
        elif file_path.endswith('.xlsx') or file_path.endswith('.xls'):
            df = pd.read_excel(file_path)
        else:
            return "Error: Unsupported file format."
            
        # Create a safe local environment for execution
        local_env = {'df': df, 'pd': pd}
        
        # Execute the AI-provided code
        try:
            exec(python_pandas_code, {}, local_env)
        except Exception as e:
            return f"Error executing python code: {str(e)}\nMake sure you only modify the 'df' variable."
            
        modified_df = local_env['df']
        
        # Generate new file name
        base_name = os.path.basename(file_path)
        name, ext = os.path.splitext(base_name)
        new_filename = f"{name}_modified_{uuid.uuid4().hex[:6]}{ext}"
        new_filepath = os.path.join(os.path.dirname(file_path), new_filename)
        
        # Save file
        if new_filepath.endswith('.csv'):
            modified_df.to_csv(new_filepath, index=False)
        else:
            modified_df.to_excel(new_filepath, index=False)
            
        # In this prototype, we return the relative path that the frontend can download
        return f"Success! File modified and saved as: {new_filename}. You can tell the user to download it from the Files page."
        
    except Exception as e:
        return f"Error processing file: {str(e)}"

def execute_gst_filing_mock(gstin: str, data_summary: str) -> str:
    """
    Mock function representing an automation script that would log into a GST portal
    and file a return using Playwright.
    """
    return f"Success: GST Filed Successfully for GSTIN {gstin} based on the provided data."

def search_leads(industry: str, location: str) -> str:
    """
    Mock function to search for leads on LinkedIn or web.
    """
    return f"Found 3 leads for {industry} in {location}:\n1. TechCorp (CTO: Alice)\n2. Innovate LLC (CEO: Bob)\n3. DataSystems (VP: Charlie)"

def generate_markdown_report(filename: str, content: str) -> str:
    """
    Generates a Markdown file with the provided content and saves it to the disk.
    Use this to write comprehensive reports, summaries, or invoices.
    """
    try:
        # Create uploads directory if it doesn't exist
        os.makedirs("uploads", exist_ok=True)
        
        # Ensure filename is safe and ends with .md
        safe_filename = filename.replace("/", "").replace("\\", "").replace(" ", "_")
        if not safe_filename.endswith('.md'):
            safe_filename += '.md'
            
        filepath = os.path.join("uploads", safe_filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
            
        return f"Success! Report successfully generated and saved as {safe_filename}."
    except Exception as e:
        return f"Error generating report: {str(e)}"

def execute_python_script(code: str) -> str:
    """
    Executes raw Python code for data analysis, mathematical calculations, or file processing.
    The code runs in a secure sandbox. Any stdout (print statements) will be captured and returned.
    Use this when you need to crunch numbers, perform complex logic, or format data algorithmically.
    """
    try:
        # Capture standard output
        old_stdout = sys.stdout
        redirected_output = sys.stdout = StringIO()
        
        # Define a safe local environment
        local_env = {'pd': pd, 'os': os}
        
        # Execute the code
        exec(code, {}, local_env)
        
        # Restore stdout
        sys.stdout = old_stdout
        
        output = redirected_output.getvalue()
        if not output.strip():
            return "Script executed successfully, but produced no output (no print statements)."
            
        return f"Script Output:\n{output}"
    except Exception as e:
        sys.stdout = old_stdout
        return f"Error executing python script: {str(e)}\n\nMake sure your syntax is correct and you use print() to output results."

# Export the available tools
AVAILABLE_TOOLS = [
    read_excel_file, 
    modify_excel_file, 
    execute_gst_filing_mock, 
    search_leads,
    generate_markdown_report,
    execute_python_script
]
