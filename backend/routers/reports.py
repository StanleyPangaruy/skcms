# routers/reports.py
from fastapi import APIRouter, UploadFile, File, Form, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import TransparencyReport
from schemas import ReportOut
import shutil
import os
from datetime import datetime

router = APIRouter(prefix="/reports", tags=["Reports"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[ReportOut])
def get_reports(db: Session = Depends(get_db)):
    return db.query(TransparencyReport).all()

@router.post("/")
def upload_report(title: str = Form(...), file: UploadFile = File(...), db: Session = Depends(get_db)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    report = TransparencyReport(title=title, file_path=file_path)
    db.add(report)
    db.commit()
    db.refresh(report)
    return report
