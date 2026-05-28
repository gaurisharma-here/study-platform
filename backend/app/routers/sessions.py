from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from app.database import get_db
from app.models.models import StudySession, RoomMember, User
from app.schemas.schemas import SessionResponse
from app.services.auth_service import update_streak
from app.routers.auth import get_authenticated_user

router = APIRouter(prefix="/api/sessions", tags=["sessions"])

@router.post("/start/{room_id}", response_model=SessionResponse)
def start_session(
    room_id: str,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db)
):
    member = db.query(RoomMember).filter(
        RoomMember.room_id == room_id,
        RoomMember.user_id == current_user.id
    ).first()
    if not member:
        raise HTTPException(status_code=403, detail="You are not a member of this room")

    active_session = db.query(StudySession).filter(
        StudySession.user_id == current_user.id,
        StudySession.ended_at == None
    ).first()
    if active_session:
        raise HTTPException(status_code=400, detail="You already have an active session")

    session = StudySession(
        room_id=room_id,
        user_id=current_user.id
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    return session

@router.post("/end/{session_id}", response_model=SessionResponse)
def end_session(
    session_id: str,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db)
):
    session = db.query(StudySession).filter(
        StudySession.id == session_id,
        StudySession.user_id == current_user.id
    ).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    if session.ended_at:
        raise HTTPException(status_code=400, detail="Session already ended")

    session.ended_at = datetime.utcnow()
    duration = (session.ended_at - session.started_at).total_seconds() / 60
    session.duration_minutes = int(duration)

    current_user.total_study_minutes += session.duration_minutes
    update_streak(current_user, db)

    db.commit()
    db.refresh(session)
    return session

@router.get("/active")
def get_active_session(
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db)
):
    session = db.query(StudySession).filter(
        StudySession.user_id == current_user.id,
        StudySession.ended_at == None
    ).first()
    if not session:
        return {"active": False, "session": None}
    return {"active": True, "session": session}