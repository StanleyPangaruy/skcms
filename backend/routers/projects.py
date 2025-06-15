# routers/projects.py
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Project
from schemas import Project as ProjectSchema

router = APIRouter(prefix="/projects", tags=["Projects"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_projects(category: str = Query(None), db: Session = Depends(get_db)):
    if category:
        return db.query(Project).filter(Project.category == category).all()
    return db.query(Project).all()

@router.post("/")
def add_project(project: ProjectSchema, db: Session = Depends(get_db)):
    new = Project(**project.dict())
    db.add(new)
    db.commit()
    db.refresh(new)
    return new
