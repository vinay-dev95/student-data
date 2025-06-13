# backend/main.py
import os
from dotenv import load_dotenv
from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from routes.student_routes import router
from backend.routes.student_routes import router
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

app = FastAPI()

frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://95.217.xxx.yyy:8000")



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Try "*" for testing, but specify origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


app.include_router(router, prefix="/students", tags=["Students"])
