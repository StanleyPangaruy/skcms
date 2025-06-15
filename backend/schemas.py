# schemas.py
from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class AdminLogin(BaseModel):
    username: str
    password: str

class Member(BaseModel):
    name: str
    position: str
    photo_url: str

class Project(BaseModel):
    title: str
    description: str
    category: str
    date: str
    image_url: str

class Report(BaseModel):
    title: str

class ReportOut(Report):
    id: int
    file_path: str
    uploaded_at: datetime
    class Config:
        orm_mode = True


class MemberBase(BaseModel):
    name: str
    position: str

class MemberCreate(MemberBase):
    pass

class Member(BaseModel):
    id: int
    name: str
    position: str
    photo_url: Optional[str] = None  # ← must match model

    class Config:
        orm_mode = True