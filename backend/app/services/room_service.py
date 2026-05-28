import random
import string
from sqlalchemy.orm import Session
from app.models.models import Room, RoomMember, User

def generate_invite_code(length: int = 8) -> str:
    characters = string.ascii_uppercase + string.digits
    return ''.join(random.choices(characters, k=length))

def create_room(name: str, description: str, owner_id: str, db: Session) -> Room:
    invite_code = generate_invite_code()
    while db.query(Room).filter(Room.invite_code == invite_code).first():
        invite_code = generate_invite_code()

    room = Room(
        name=name,
        description=description,
        owner_id=owner_id,
        invite_code=invite_code
    )
    db.add(room)
    db.flush()

    member = RoomMember(room_id=room.id, user_id=owner_id)
    db.add(member)
    db.commit()
    db.refresh(room)
    return room

def join_room(invite_code: str, user_id: str, db: Session):
    room = db.query(Room).filter(Room.invite_code == invite_code).first()
    if not room:
        return None, "Room not found"

    existing = db.query(RoomMember).filter(
        RoomMember.room_id == room.id,
        RoomMember.user_id == user_id
    ).first()
    if existing:
        return room, "already_member"

    member = RoomMember(room_id=room.id, user_id=user_id)
    db.add(member)
    db.commit()
    db.refresh(room)
    return room, "joined"

def get_user_rooms(user_id: str, db: Session):
    memberships = db.query(RoomMember).filter(
        RoomMember.user_id == user_id
    ).all()

    rooms = []
    for membership in memberships:
        room = db.query(Room).filter(Room.id == membership.room_id).first()
        if room and room.is_active:
            member_count = db.query(RoomMember).filter(
                RoomMember.room_id == room.id
            ).count()
            room.member_count = member_count
            rooms.append(room)
    return rooms

def get_room_members(room_id: str, db: Session):
    memberships = db.query(RoomMember).filter(
        RoomMember.room_id == room_id
    ).all()
    members = []
    for m in memberships:
        user = db.query(User).filter(User.id == m.user_id).first()
        if user:
            members.append({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "current_streak": user.current_streak
            })
    return members