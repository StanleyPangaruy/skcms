# main.py
from fastapi import FastAPI
from database import Base, engine
from routers import members, projects, reports
import auth
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[""],  # Or specify your React frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(members.router)
app.include_router(projects.router)
app.include_router(reports.router)
