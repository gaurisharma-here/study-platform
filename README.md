# StudyRoom - Collaborative Study Platform

A real-time collaborative study platform where students can create virtual study rooms, invite friends, track study sessions, and chat together.

## Live Demo
- Frontend: (add Vercel URL after deployment)
- Backend API: (add Render URL after deployment)

## Features
- User authentication (signup/login with JWT)
- Create and join study rooms via invite codes
- Real-time chat using WebSockets
- Study session timer with duration tracking
- Study streaks and progress dashboard
- Live online presence (see who's studying)

## Tech Stack
- **Frontend:** React, Vite, Zustand, Axios
- **Backend:** FastAPI, SQLAlchemy, JWT
- **Database:** Supabase (PostgreSQL)
- **Real-time:** WebSockets
- **Deployment:** Vercel (frontend) + Render (backend)

## Setup Instructions

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

**backend/.env**
DATABASE_URL=your_supabase_db_url
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

**frontend/.env**
VITE_API_URL=http://127.0.0.1:8000
VITE_WS_URL=ws://127.0.0.1:8000

Save it, then run:
bashgit add README.md
git commit -m "add README"
git push origin main
Tell me when done!You said: make read me.make read me..lil more helpful
within one msg
so i just copy paste12:31 PMClaude responded: Here's your complete README — copy and paste the entire thing into your README.Here's your complete README — copy and paste the entire thing into your README.md file:
markdown# 📚 StudyRoom — Collaborative Study Platform

A real-time collaborative study platform where students can create virtual study rooms, invite friends, track study sessions, and stay accountable together.

Built for students preparing for exams, interviews, or anyone who studies better with others.

## 🌐 Live Demo
- **Frontend:** coming soon
- **Backend API Docs:** coming soon

---

## ✨ Features

### 🔐 Authentication
- Secure signup and login with JWT tokens
- Protected routes — only logged-in users can access rooms

### 🏠 Study Rooms
- Create study rooms with a name and description
- Auto-generated unique invite codes for sharing
- Join any room using an invite code
- See member count on each room card
- Delete rooms you own

### ⏱️ Session Tracking
- Start and end study sessions inside a room
- Session duration tracked automatically in minutes
- All sessions saved to your history

### 💬 Real-time Chat
- Live room chat powered by WebSockets
- Messages appear instantly for all room members
- Chat history loaded when you enter a room

### 🟢 Live Presence
- See who is currently online in the room
- Online count updates in real time as users join or leave

### 📊 Activity Dashboard
- Total study time tracked in minutes
- Current study streak (consecutive study days)
- Longest streak record
- Total sessions completed
- Recent session history
- Active rooms count

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Zustand |
| Backend | FastAPI, SQLAlchemy |
| Database | Supabase (PostgreSQL) |
| Auth | JWT (python-jose, passlib) |
| Real-time | WebSockets (FastAPI) |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

## 📁 Project Structure
STUDY-PLATFORM/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── config.py
│   │   ├── routers/        # auth, rooms, sessions, dashboard, websocket
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── services/       # auth and room business logic
│   └── requirements.txt
└── frontend/
├── src/
│   ├── api/            # axios API calls
│   ├── components/     # Navbar, RoomCard, StatCard, ProtectedRoute
│   ├── hooks/          # useRoomSocket, useTimer
│   ├── pages/          # Landing, Login, Signup, Dashboard, Rooms, Room
│   └── store/          # Zustand auth store
└── vite.config.js

---

## ⚙️ Local Setup Instructions

### Prerequisites
- Python 3.10+
- Node.js 18+
- A Supabase account with a project created

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/STUDY-PLATFORM.git
cd STUDY-PLATFORM
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
```

Create a `.env` file inside `/backend`:
DATABASE_URL=your_supabase_postgresql_url
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

Run the backend:
```bash
uvicorn app.main:app --reload
```
API will be available at `http://127.0.0.1:8000`
Interactive docs at `http://127.0.0.1:8000/docs`

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file inside `/frontend`:
VITE_API_URL=http://127.0.0.1:8000
VITE_WS_URL=ws://127.0.0.1:8000

Run the frontend:
```bash
npm run dev
```
App will be available at `http://localhost:5173`

---

## 🚀 Deployment

### Backend — Render
- Root directory: `backend`
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port 10000`
- Add all backend `.env` variables in Render's environment settings

### Frontend — Vercel
- Root directory: `frontend`
- Framework preset: Vite
- Add environment variables:
  - `VITE_API_URL` = your Render backend URL
  - `VITE_WS_URL` = your Render backend URL with `wss://` instead of `https://`

---

## 📌 Additional Notes
- `.env` files are gitignored — never commit credentials
- WebSocket connections are deduplicated per user per room
- Study streaks reset if you miss a day
- Sessions must be ended manually to save duration to dashboard