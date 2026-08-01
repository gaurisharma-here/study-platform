import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard } from "../api/dashboard";
import useAuthStore from "../store/authStore";
import StatCard from "../components/StatCard";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatMinutes = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m}m`;
    return `${h}h ${m}m`;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {user?.username}</h1>
          <p className="text-gray-500 mt-1">Here's your study progress</p>
        </div>

        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <StatCard
                title="Study Time"
                value={formatMinutes(data?.total_study_minutes || 0)}
                icon="⏱️"
              />
              <StatCard
                title="Current Streak"
                value={`${data?.current_streak || 0} days`}
                icon="🔥"
              />
              <StatCard
                title="Best Streak"
                value={`${data?.longest_streak || 0} days`}
                icon="🏆"
              />
              <StatCard
                title="Sessions"
                value={data?.sessions_completed || 0}
                icon="📖"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Sessions</h2>
                {data?.recent_sessions?.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    No sessions yet. Start studying!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {data?.recent_sessions?.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between border border-gray-800 rounded-lg px-4 py-3"
                      >
                        <span className="text-sm text-gray-400">
                          {new Date(session.started_at).toLocaleDateString()}
                        </span>
                        <span className="text-sm font-medium text-white">
                          {session.duration_minutes} mins
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/rooms")}
                    className="w-full bg-white hover:bg-gray-200 text-gray-950 py-3 rounded-lg font-medium transition"
                  >
                    Go to Study Rooms
                  </button>
                  <button
                    onClick={() => navigate("/rooms")}
                    className="w-full border border-gray-700 hover:border-gray-500 text-white py-3 rounded-lg font-medium transition"
                  >
                    Create New Room
                  </button>
                </div>

                <div className="mt-6 border border-gray-800 rounded-xl p-4 text-center">
                  <p className="text-gray-500 text-sm mb-1">Active Rooms</p>
                  <p className="text-4xl font-bold text-white">
                    {data?.active_rooms || 0}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
