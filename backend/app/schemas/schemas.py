from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# Auth schemas
class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    username: str
    current_streak: int
    longest_streak: int
    total_study_minutes: int
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# Room schemas
class RoomCreate(BaseModel):
    name: str
    description: Optional[str] = None

class RoomResponse(BaseModel):
    id: str
    name: str
    description: Optional[str]
    owner_id: str
    invite_code: str
    is_active: bool
    created_at: datetime
    member_count: Optional[int] = 0

    class Config:
        from_attributes = True

class JoinRoom(BaseModel):
    invite_code: str

# Session schemas
class SessionResponse(BaseModel):
    id: str
    room_id: str
    user_id: str
    started_at: datetime
    ended_at: Optional[datetime]
    duration_minutes: int

    class Config:
        from_attributes = True

# Message schemas
class MessageCreate(BaseModel):
    content: str

class MessageResponse(BaseModel):
    id: str
    room_id: str
    user_id: str
    username: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True

# Dashboard schemas
class DashboardResponse(BaseModel):
    total_study_minutes: int
    current_streak: int
    longest_streak: int
    sessions_completed: int
    active_rooms: int
    recent_sessions: List[SessionResponse]