from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from database import SessionLocal
from models import TransparencyReport
from schemas import ReportOut
import shutil
import os

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

@router.get("/{report_id}", response_model=ReportOut)
def get_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(TransparencyReport).get(report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report

@router.post("/", response_model=ReportOut)
def upload_report(title: str = Form(...), file: UploadFile = File(...), db: Session = Depends(get_db)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    report = TransparencyReport(title=title, file_path=file_path)
    db.add(report)
    db.commit()
    db.refresh(report)
    return report

@router.put("/{report_id}", response_model=ReportOut)
def update_report(report_id: int, title: str = Form(...), db: Session = Depends(get_db)):
    report = db.query(TransparencyReport).get(report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    report.title = title
    db.commit()
    db.refresh(report)
    return report

@router.delete("/{report_id}")
def delete_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(TransparencyReport).get(report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    # Delete the actual file
    if os.path.exists(report.file_path):
        os.remove(report.file_path)
    db.delete(report)
    db.commit()
    return {"detail": "Report deleted"}

@router.get("/download/{report_id}")
def download_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(TransparencyReport).get(report_id)
    if not report or not os.path.exists(report.file_path):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(path=report.file_path, filename=os.path.basename(report.file_path), media_type="application/octet-stream")
