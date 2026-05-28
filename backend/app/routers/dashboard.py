from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import StudySession, RoomMember, User
from app.schemas.schemas import DashboardResponse, SessionResponse
from app.routers.auth import get_authenticated_user

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])

@router.get("/", response_model=DashboardResponse)
def get_dashboard(
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db)
):
    sessions_completed = db.query(StudySession).filter(
        StudySession.user_id == current_user.id,
        StudySession.ended_at != None
    ).count()

    active_rooms = db.query(RoomMember).filter(
        RoomMember.user_id == current_user.id
    ).count()

    recent_sessions = db.query(StudySession).filter(
        StudySession.user_id == current_user.id,
        StudySession.ended_at != None
    ).order_by(StudySession.started_at.desc()).limit(5).all()

    return DashboardResponse(
        total_study_minutes=current_user.total_study_minutes,
        current_streak=current_user.current_streak,
        longest_streak=current_user.longest_streak,
        sessions_completed=sessions_completed,
        active_rooms=active_rooms,
        recent_sessions=[SessionResponse.model_validate(s) for s in recent_sessions]
    )