from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
from typing import Dict, List
from app.database import get_db
from app.models.models import Message, User, RoomMember
from app.services.auth_service import verify_token
import json

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[dict]] = {}

    async def connect(self, websocket: WebSocket, room_id: str, user_id: str, username: str):
        await websocket.accept()
        if room_id not in self.active_connections:
            self.active_connections[room_id] = []
        # Remove any existing connection for this user
        self.active_connections[room_id] = [
            conn for conn in self.active_connections[room_id]
            if conn["user_id"] != user_id
        ]
        self.active_connections[room_id].append({
            "websocket": websocket,
            "user_id": user_id,
            "username": username
        })

    def disconnect(self, websocket: WebSocket, room_id: str):
        if room_id in self.active_connections:
            self.active_connections[room_id] = [
                conn for conn in self.active_connections[room_id]
                if conn["websocket"] != websocket
            ]

    async def broadcast(self, message: dict, room_id: str):
        if room_id in self.active_connections:
            for connection in self.active_connections[room_id]:
                try:
                    await connection["websocket"].send_text(json.dumps(message))
                except:
                    pass

    def get_online_users(self, room_id: str):
        if room_id not in self.active_connections:
            return []
        seen = set()
        users = []
        for c in self.active_connections[room_id]:
            if c["user_id"] not in seen:
                seen.add(c["user_id"])
                users.append({"user_id": c["user_id"], "username": c["username"]})
        return users

manager = ConnectionManager()

@router.websocket("/ws/{room_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    room_id: str,
    token: str,
    db: Session = Depends(get_db)
):
    user_id = verify_token(token)
    if not user_id:
        await websocket.close(code=4001)
        return

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        await websocket.close(code=4001)
        return

    member = db.query(RoomMember).filter(
        RoomMember.room_id == room_id,
        RoomMember.user_id == user_id
    ).first()
    if not member:
        await websocket.close(code=4003)
        return

    await manager.connect(websocket, room_id, user_id, user.username)

    await manager.broadcast({
        "type": "user_joined",
        "user_id": user_id,
        "username": user.username,
        "online_users": manager.get_online_users(room_id)
    }, room_id)

    try:
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)

            if payload.get("type") == "chat":
                message = Message(
                    room_id=room_id,
                    user_id=user_id,
                    content=payload.get("content", "")
                )
                db.add(message)
                db.commit()
                db.refresh(message)

                await manager.broadcast({
                    "type": "chat",
                    "id": message.id,
                    "user_id": user_id,
                    "username": user.username,
                    "content": message.content,
                    "created_at": message.created_at.isoformat()
                }, room_id)

            elif payload.get("type") == "session_start":
                await manager.broadcast({
                    "type": "session_start",
                    "user_id": user_id,
                    "username": user.username
                }, room_id)

            elif payload.get("type") == "session_end":
                await manager.broadcast({
                    "type": "session_end",
                    "user_id": user_id,
                    "username": user.username
                }, room_id)

    except WebSocketDisconnect:
        manager.disconnect(websocket, room_id)
        await manager.broadcast({
            "type": "user_left",
            "user_id": user_id,
            "username": user.username,
            "online_users": manager.get_online_users(room_id)
        }, room_id)