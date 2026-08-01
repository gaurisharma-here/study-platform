# StudyRoom — Collaborative Study Room Platform

StudyRoom is a real-time collaborative study platform designed to help students stay focused and accountable while studying together online.

Users can create virtual study rooms, join sessions with friends, communicate through live chat, and track their study activity using a session dashboard.

---

## Live Deployment

* Frontend: https://study-platform-hazel.vercel.app
* Backend API: https://study-platform-iwig.onrender.com
* API Documentation: https://study-platform-iwig.onrender.com/docs
---

## Features Implemented

### Authentication

* User signup and login
* JWT-based authentication
* Protected routes

### Study Room Management

* Create study rooms
* Join rooms using invite codes
* View room participants
* Room activity tracking

### Study Sessions

* Start and end study sessions
* Session duration tracking
* Pomodoro-style study timer

### Realtime Features

* Realtime room chat using WebSockets
* Live participant updates
* Instant room activity updates

### Dashboard

* Total study hours
* Study streak tracking
* Sessions completed
* Recent activity history

---

## Tech Stack Used

### Frontend

* React
* Vite
* Tailwind CSS
* Zustand
* Axios

### Backend

* FastAPI
* SQLAlchemy
* Pydantic
* JWT Authentication

### Database

* Supabase PostgreSQL

### Realtime Communication

* FastAPI WebSockets

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## Project Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/heygaurihere/study-platform.git
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

### Create `.env` file inside backend folder

```env
DATABASE_URL=YOUR_SUPABASE_DATABASE_URL
SECRET_KEY=YOUR_SECRET_KEY
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

### Run Backend Server

```bash
uvicorn app.main:app --reload
```

Backend runs on:
`http://127.0.0.1:8000`

---

## Frontend Setup

```bash
cd frontend

npm install
npm run dev
```

### Create `.env` file inside frontend folder

```env
VITE_API_URL=http://127.0.0.1:8000
VITE_WS_URL=ws://127.0.0.1:8000
```

Frontend runs on:
`http://localhost:5173`

---

## Folder Structure

```text
studyroom/
│
├── backend/
│   ├── app/
│   ├── routers/
│   ├── models/
│   ├── schemas/
│   └── websocket/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── store/
│   └── services/
```

---

## Additional Enhancements

* Responsive UI
* Modern dashboard interface
* Realtime online presence
* Activity-based study tracking

---

## Important Notes

* Environment variables are excluded using `.gitignore`
* No credentials or secrets are exposed publicly
* Project developed individually as part of assessment submission

> Note: Backend is hosted on Render free tier, so the first request may take a few seconds to wake the server.