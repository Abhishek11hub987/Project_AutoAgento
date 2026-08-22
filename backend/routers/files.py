from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # In a real app, here we would trigger pdfplumber or pytesseract
        # For the MVP, we just acknowledge receipt
        return {"filename": file.filename, "file_path": file_path, "status": "processed", "text_extracted": "Mock extracted text from document."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
