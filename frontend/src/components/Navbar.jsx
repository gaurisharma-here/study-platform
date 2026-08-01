import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-950/80 backdrop-blur border-b border-gray-800 px-6 py-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-lg font-bold text-white flex items-center gap-2"
        >
          📚 StudyRoom
        </Link>
        <div className="flex items-center gap-6 text-sm">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-400 hover:text-white transition"
              >
                Dashboard
              </Link>
              <Link
                to="/rooms"
                className="text-gray-400 hover:text-white transition"
              >
                Rooms
              </Link>
              <span className="text-gray-500">👋 {user?.username}</span>
              <button
                onClick={handleLogout}
                className="border border-gray-700 hover:border-gray-500 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-400 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-gray-950 hover:bg-gray-200 px-4 py-2 rounded-lg font-medium transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
