const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <span className={`text-xs px-2 py-1 rounded-full ${color}`}>
          {title}
        </span>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
};

export default StatCard;
