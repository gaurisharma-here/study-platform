import { useEffect, useState } from "react";
import { getRooms, createRoom, joinRoom } from "../api/rooms";
import RoomCard from "../components/RoomCard";
import Navbar from "../components/Navbar";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [createForm, setCreateForm] = useState({ name: "", description: "" });
  const [joinCode, setJoinCode] = useState("");
  const [error, setError] = useState("");

  const fetchRooms = () => {
    getRooms()
      .then((res) => setRooms(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createRoom(createForm);
      setShowCreate(false);
      setCreateForm({ name: "", description: "" });
      fetchRooms();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create room");
    }
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await joinRoom({ invite_code: joinCode });
      setShowJoin(false);
      setJoinCode("");
      fetchRooms();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to join room");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Study Rooms</h1>
            <p className="text-gray-400 mt-1">Join or create a study room</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowJoin(true);
                setShowCreate(false);
                setError("");
              }}
              className="border border-gray-700 hover:border-purple-500 text-white px-4 py-2 rounded-lg transition"
            >
              🔑 Join Room
            </button>
            <button
              onClick={() => {
                setShowCreate(true);
                setShowJoin(false);
                setError("");
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
            >
              ➕ Create Room
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {showCreate && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Create New Room</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <input
                type="text"
                placeholder="Room name"
                value={createForm.name}
                onChange={(e) =>
                  setCreateForm({ ...createForm, name: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                required
              />
              <textarea
                placeholder="Description (optional)"
                value={createForm.description}
                onChange={(e) =>
                  setCreateForm({ ...createForm, description: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                rows={3}
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {showJoin && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Join a Room</h2>
            <form onSubmit={handleJoin} className="flex gap-3">
              <input
                type="text"
                placeholder="Enter invite code"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                required
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
              >
                Join
              </button>
              <button
                type="button"
                onClick={() => setShowJoin(false)}
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-gray-400">Loading rooms...</div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-400 text-lg">
              No rooms yet. Create or join one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
