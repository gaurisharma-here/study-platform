const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xl">{icon}</span>
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          {title}
        </span>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
};

export default StatCard;
