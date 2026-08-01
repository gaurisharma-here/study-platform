import { Link } from "react-router-dom";

const stats = [
  { value: "1K+", label: "Study Hours" },
  { value: "200+", label: "Active Rooms" },
  { value: "99%", label: "Uptime" },
  { value: "24/7", label: "Availability" },
];

const features = [
  {
    icon: "⏱️",
    title: "Live Session Timers",
    desc: "Start group study sessions with a live countdown everyone in the room can see in real time.",
  },
  {
    icon: "💬",
    title: "Built-in Room Chat",
    desc: "Communicate with your study partners seamlessly. System events keep everyone informed.",
  },
  {
    icon: "🟢",
    title: "Presence Indicators",
    desc: "See exactly who is in the room right now with live online indicators and participant lists.",
  },
  {
    icon: "📊",
    title: "Progress Analytics",
    desc: "Track your weekly study hours, session streaks, and personal bests with clean analytics.",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
        <span className="inline-flex items-center gap-2 bg-gray-900 border border-gray-800 text-gray-300 text-sm px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          Collaborative study platform
        </span>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-2">
          Study Together.
        </h1>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-500 mb-6">
          Achieve More.
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
          Create virtual study rooms, track sessions with live timers, chat with
          study partners, and build consistent habits — all in one focused
          space.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/signup"
            className="bg-white text-gray-950 hover:bg-gray-200 px-6 py-3 rounded-lg font-semibold transition"
          >
            Start Studying Free →
          </Link>
          <Link
            to="/rooms"
            className="border border-gray-700 hover:border-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Browse Public Rooms
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="border-y border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold text-purple-400">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">
            Everything you need to stay focused
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Built for serious students who want accountability and community. No
            distractions, just features that help you study.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition"
            >
              <div className="text-xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center">
          <div className="text-3xl mb-4">📚</div>
          <h2 className="text-2xl font-bold mb-2">
            Ready to transform your study habits?
          </h2>
          <p className="text-gray-400 mb-6">
            Join students already using StudyRoom to build better habits and
            achieve their goals.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-gray-950 hover:bg-gray-200 px-6 py-3 rounded-lg font-semibold transition"
          >
            Create Your First Room
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
