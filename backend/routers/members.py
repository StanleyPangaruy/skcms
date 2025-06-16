# routers/members.py

from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form
from sqlalchemy.orm import Session
from database import SessionLocal
from models import CommitteeMember
from schemas import Member, MemberCreate
from typing import List
import os
from uuid import uuid4

router = APIRouter(
    prefix="/members",
    tags=["Members"]
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

UPLOAD_DIR = "uploads"

# Get all members
@router.get("/", response_model=List[Member])
def get_members(db: Session = Depends(get_db)):
    return db.query(CommitteeMember).all()

# Add a new member
# Add a new member
@router.post("/", response_model=Member)
async def add_member(
    name: str = Form(...),
    position: str = Form(...),
    committee: str = Form(None),
    about: str = Form(None),
    photo: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    filename = None
    if photo:
        ext = photo.filename.split(".")[-1]
        filename = f"{uuid4().hex}.{ext}"
        filepath = os.path.join(UPLOAD_DIR, filename)
        with open(filepath, "wb") as buffer:
            buffer.write(await photo.read())

    new = CommitteeMember(name=name, position=position, photo_url=filename, committee=committee, about=about)
    db.add(new)
    db.commit()
    db.refresh(new)
    return new

# Update an existing member
@router.put("/{member_id}", response_model=Member)
async def update_member(
    member_id: int,
    name: str = Form(...),
    position: str = Form(...),
    committee: str = Form(None),
    about: str = Form(None),
    photo: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    member = db.query(CommitteeMember).get(member_id)
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")

    member.name = name
    member.position = position
    member.committee = committee
    member.about = about

    if photo:
        ext = photo.filename.split(".")[-1]
        filename = f"{uuid4().hex}.{ext}"
        filepath = os.path.join(UPLOAD_DIR, filename)
        with open(filepath, "wb") as buffer:
            buffer.write(await photo.read())
        member.photo_url = filename

    db.commit()
    db.refresh(member)
    return member


# Delete a member
@router.delete("/{member_id}")
def delete_member(member_id: int, db: Session = Depends(get_db)):
    member = db.query(CommitteeMember).get(member_id)
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    db.delete(member)
    db.commit()
    return {"detail": "Deleted"}
