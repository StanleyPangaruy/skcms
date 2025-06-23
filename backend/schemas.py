# schemas.py
from typing import Literal, Optional
from pydantic import BaseModel
from datetime import datetime

class AdminLogin(BaseModel):
    username: str
    password: str

class Member(BaseModel):
    name: str
    position: str
    photo_url: str
    committee: Optional[str] = None
    about: Optional[str] = None

class Project(BaseModel):
    title: str
    description: str
    category: str
    date: str
    image_url: str
    status: Literal["Completed", "Ongoing", "Planned"]
    budget: str
    

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
    committee: Optional[str] = None
    about: Optional[str] = None

class MemberCreate(MemberBase):
    pass

class Member(BaseModel):
    id: int
    name: str
    position: str
    committee: Optional[str] = None
    about: Optional[str] = None
    photo_url: Optional[str] = None  # ← must match model

    class Config:
        orm_mode = True


class ProjectBase(BaseModel):
    title: str
    description: str
    status: Literal["Completed", "Ongoing", "Planned"]
    budget: str
    date: str
    category: str
    image_url: str | None = None  # NEW

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int

    class Config:
        orm_mode = True

class ReportBase(BaseModel):
    title: str

class ReportOut(ReportBase):
    id: int
    file_path: str
    uploaded_at: datetime

    class Config:
        orm_mode = True