from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Project
from schemas import Project as ProjectSchema
from typing import List
import os
from uuid import uuid4

router = APIRouter(prefix="/projects", tags=["Projects"])

UPLOAD_DIR = "uploads"

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Get all projects
@router.get("/", response_model=List[ProjectSchema])
def get_projects(db: Session = Depends(get_db)):
    return db.query(Project).all()

# Add a new project with image upload
@router.post("/", response_model=ProjectSchema)
async def add_project(
    title: str = Form(...),
    description: str = Form(...),
    status: str = Form(...),
    budget: str = Form(...),
    date: str = Form(...),
    category: str = Form(...),
    image: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    filename = None
    if image:
        ext = image.filename.split(".")[-1]
        filename = f"{uuid4().hex}.{ext}"
        filepath = os.path.join(UPLOAD_DIR, filename)
        with open(filepath, "wb") as buffer:
            buffer.write(await image.read())

    new = Project(
        title=title,
        description=description,
        status=status,
        budget=budget,
        date=date,
        category=category,
        image_url=filename
    )

    db.add(new)
    db.commit()
    db.refresh(new)
    return new

# Update existing project
@router.put("/{project_id}", response_model=ProjectSchema)
async def update_project(
    project_id: int,
    title: str = Form(...),
    description: str = Form(...),
    status: str = Form(...),
    budget: str = Form(...),
    date: str = Form(...),
    category: str = Form(...),
    image: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    project = db.query(Project).get(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    filename = project.image_url
    if image:
        ext = image.filename.split(".")[-1]
        filename = f"{uuid4().hex}.{ext}"
        filepath = os.path.join(UPLOAD_DIR, filename)
        with open(filepath, "wb") as buffer:
            buffer.write(await image.read())

    project.title = title
    project.description = description
    project.status = status
    project.budget = budget
    project.date = date
    project.category = category
    project.image_url = filename

    db.commit()
    db.refresh(project)
    return project

# Delete a project
@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).get(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return {"detail": "Deleted"}
