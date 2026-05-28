import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <div className="text-6xl mb-6">📚</div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Study Together, Achieve More
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Create virtual study rooms, invite friends, track your sessions, and stay accountable with real-time collaboration.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="border border-gray-700 hover:border-purple-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: '🏠', title: 'Virtual Study Rooms', desc: 'Create or join study rooms with a simple invite code. Study with friends or colleagues.' },
            { icon: '⏱️', title: 'Session Tracking', desc: 'Track your study sessions with built-in timers. See exactly how much time you spend studying.' },
            { icon: '💬', title: 'Real-time Chat', desc: 'Communicate with your study group instantly. Share ideas, ask questions, stay connected.' },
          ].map((feature) => (
            <div key={feature.title} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { value: '🔥', label: 'Daily Streaks' },
            { value: '📊', label: 'Progress Dashboard' },
            { value: '🔒', label: 'Secure & Private' },
          ].map((item) => (
            <div key={item.label} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="text-5xl mb-3">{item.value}</div>
              <p className="text-gray-300 font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Landing;