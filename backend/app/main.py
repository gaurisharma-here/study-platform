from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import auth, rooms, sessions, dashboard, ws

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Study Room Platform", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(rooms.router)
app.include_router(sessions.router)
app.include_router(dashboard.router)
app.include_router(ws.router)

@app.get("/")
def root():
    return {"message": "Study Room Platform API is running"}