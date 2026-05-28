from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Room, RoomMember, Message
from app.schemas.schemas import RoomCreate, RoomResponse, JoinRoom, MessageResponse
from app.services.room_service import create_room, join_room, get_user_rooms, get_room_members
from app.routers.auth import get_authenticated_user
from app.models.models import User

router = APIRouter(prefix="/api/rooms", tags=["rooms"])

@router.post("/", response_model=RoomResponse)
def create_new_room(
    room_data: RoomCreate,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db)
):
    room = create_room(room_data.name, room_data.description, current_user.id, db)
    member_count = db.query(RoomMember).filter(RoomMember.room_id == room.id).count()
    room.member_count = member_count
    return room

@router.get("/", response_model=list[RoomResponse])
def get_my_rooms(
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db)
):
    return get_user_rooms(current_user.id, db)

@router.post("/join", response_model=RoomResponse)
def join_existing_room(
    join_data: JoinRoom,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db)
):
    room, status = join_room(join_data.invite_code, current_user.id, db)
    if room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    member_count = db.query(RoomMember).filter(RoomMember.room_id == room.id).count()
    room.member_count = member_count
    return room

@router.get("/{room_id}", response_model=RoomResponse)
def get_room(
    room_id: str,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db)
):
    room = db.query(Room).filter(Room.id == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    member = db.query(RoomMember).filter(
        RoomMember.room_id == room_id,
        RoomMember.user_id == current_user.id
    ).first()
    if not member:
        raise HTTPException(status_code=403, detail="You are not a member of this room")
    member_count = db.query(RoomMember).filter(RoomMember.room_id == room_id).count()
    room.member_count = member_count
    return room

@router.get("/{room_id}/members")
def get_members(
    room_id: str,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db)
):
    return get_room_members(room_id, db)

@router.get("/{room_id}/messages", response_model=list[MessageResponse])
def get_messages(
    room_id: str,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db)
):
    messages = db.query(Message).filter(
        Message.room_id == room_id
    ).order_by(Message.created_at.asc()).limit(100).all()

    result = []
    for msg in messages:
        user = db.query(User).filter(User.id == msg.user_id).first()
        result.append(MessageResponse(
            id=msg.id,
            room_id=msg.room_id,
            user_id=msg.user_id,
            username=user.username if user else "Unknown",
            content=msg.content,
            created_at=msg.created_at
        ))
    return result

@router.delete("/{room_id}")
def delete_room(
    room_id: str,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db)
):
    room = db.query(Room).filter(Room.id == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    if room.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Only the owner can delete this room")
    room.is_active = False
    db.commit()
    return {"message": "Room deleted successfully"}