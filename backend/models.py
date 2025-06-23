# models.py
from sqlalchemy import Column, Integer, String, Text, DateTime
from database import Base
from datetime import datetime

class AdminUser(Base):
    __tablename__ = "admin_users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class CommitteeMember(Base):
    __tablename__ = "members"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    position = Column(String)
    photo_url = Column(String)

    committee = Column(String, nullable=True)
    about = Column(Text, nullable=True)
    

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    status = Column(String, nullable=False)
    budget = Column(String, nullable=False)
    date = Column(String, nullable=False)
    category = Column(String, nullable=False)
    image_url = Column(String, nullable=True)  # NEW

class TransparencyReport(Base):
    __tablename__ = "reports"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    file_path = Column(String)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
