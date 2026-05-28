import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/rooms/${room.id}`)}
      className="bg-gray-800 border border-gray-700 rounded-xl p-5 cursor-pointer hover:border-purple-500 hover:bg-gray-750 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-white font-semibold text-lg">{room.name}</h3>
        <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
          {room.member_count} members
        </span>
      </div>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {room.description || "No description"}
      </p>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span>🔑 {room.invite_code}</span>
      </div>
    </div>
  );
};

export default RoomCard;
