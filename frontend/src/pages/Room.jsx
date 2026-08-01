import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getRoom,
  getRoomMembers,
  getRoomMessages,
  deleteRoom,
} from "../api/rooms";
import { startSession, endSession, getActiveSession } from "../api/sessions";
import useAuthStore from "../store/authStore";
import useRoomSocket from "../hooks/useRoomSocket";
import useTimer from "../hooks/useTimer";
import Navbar from "../components/Navbar";

const Room = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuthStore();
  const [room, setRoom] = useState(null);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [activeSession, setActiveSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const timer = useTimer();

  const handleSocketMessage = (data) => {
    if (data.type === "chat") {
      setMessages((prev) => [...prev, data]);
    }
  };

  const { isConnected, onlineUsers, sendMessage } = useRoomSocket(
    id,
    token,
    handleSocketMessage,
  );

  useEffect(() => {
    Promise.all([
      getRoom(id),
      getRoomMembers(id),
      getRoomMessages(id),
      getActiveSession(),
    ])
      .then(([roomRes, membersRes, messagesRes, sessionRes]) => {
        setRoom(roomRes.data);
        setMembers(membersRes.data);
        setMessages(messagesRes.data);
        if (sessionRes.data.active) {
          setActiveSession(sessionRes.data.session);
          timer.start();
        }
      })
      .catch(() => navigate("/rooms"))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendMessage({ type: "chat", content: chatInput });
    setChatInput("");
  };

  const handleStartSession = async () => {
    try {
      const res = await startSession(id);
      setActiveSession(res.data);
      timer.start();
      sendMessage({ type: "session_start" });
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to start session");
    }
  };

  const handleEndSession = async () => {
    try {
      await endSession(activeSession.id);
      setActiveSession(null);
      timer.reset();
      sendMessage({ type: "session_end" });
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to end session");
    }
  };

  const handleDeleteRoom = async () => {
    if (!confirm("Delete this room?")) return;
    try {
      await deleteRoom(id);
      navigate("/rooms");
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to delete room");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-6 w-full flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{room?.name}</h1>
            <p className="text-gray-500 text-sm">{room?.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs border border-gray-800 text-gray-400 px-3 py-1 rounded-full">
              <span
                className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"}`}
              />
              {isConnected ? "Connected" : "Disconnected"}
            </span>
            <span className="text-xs border border-gray-800 text-gray-400 px-3 py-1 rounded-full">
              🔑 {room?.invite_code}
            </span>
            {room?.owner_id === user?.id && (
              <button
                onClick={handleDeleteRoom}
                className="text-gray-500 hover:text-red-400 text-sm transition"
              >
                Delete
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Timer */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
              <p className="text-gray-500 text-sm mb-2">Study Timer</p>
              <p className="text-5xl font-mono font-bold text-white mb-4">
                {timer.format()}
              </p>
              {!activeSession ? (
                <button
                  onClick={handleStartSession}
                  className="bg-white hover:bg-gray-200 text-gray-950 px-8 py-3 rounded-lg font-semibold transition"
                >
                  Start Session
                </button>
              ) : (
                <button
                  onClick={handleEndSession}
                  className="border border-gray-700 hover:border-red-400 hover:text-red-400 text-white px-8 py-3 rounded-lg font-semibold transition"
                >
                  End Session
                </button>
              )}
            </div>

            {/* Chat */}
            <div
              className="bg-gray-900 border border-gray-800 rounded-xl flex flex-col"
              style={{ height: "400px" }}
            >
              <div className="px-4 py-3 border-b border-gray-800">
                <h2 className="font-semibold">Room Chat</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center mt-10">
                    No messages yet. Say hello!
                  </p>
                ) : (
                  messages.map((msg, i) => (
                    <div
                      key={msg.id || i}
                      className={`flex flex-col ${msg.user_id === user?.id ? "items-end" : "items-start"}`}
                    >
                      <span className="text-xs text-gray-500 mb-1">
                        {msg.username}
                      </span>
                      <div
                        className={`px-4 py-2 rounded-2xl text-sm max-w-xs ${msg.user_id === user?.id ? "bg-white text-gray-950" : "bg-gray-800 text-gray-200"}`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
              <form
                onSubmit={handleSendMessage}
                className="p-4 border-t border-gray-800 flex gap-3"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-950 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-500"
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-gray-200 text-gray-950 px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Send
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <h2 className="font-semibold mb-3">
                Online ({onlineUsers.length})
              </h2>
              {onlineUsers.length === 0 ? (
                <p className="text-gray-500 text-sm">No one online yet</p>
              ) : (
                <div className="space-y-2">
                  {onlineUsers.map((u) => (
                    <div key={u.user_id} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-300">
                        {u.username}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <h2 className="font-semibold mb-3">Members ({members.length})</h2>
              <div className="space-y-2">
                {members.map((m) => (
                  <div key={m.id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{m.username}</span>
                    <span className="text-xs text-gray-500">
                      🔥 {m.current_streak}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
