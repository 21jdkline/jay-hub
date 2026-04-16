import { Link } from 'react-router-dom'

// Mock data — will pull from Supabase + APIs when wired up
const FOCUS_3 = [
  {
    id: 1,
    priority: 'URGENT',
    project: 'Mercury',
    title: 'Follow up with Vanguard Crossing',
    subtitle: '312 units — contract terms pending 2 days',
    action: { label: 'Open in Mercury', path: '/mercury' },
    color: 'border-red-500 bg-red-500/10',
    icon: '🔥',
  },
  {
    id: 2,
    priority: 'TODAY',
    project: 'HOWL',
    title: 'Complete ODS morning protocol',
    subtitle: 'Day 5 streak — don\'t break the chain',
    action: { label: 'Open HOWL', path: '/howl' },
    color: 'border-yellow-500 bg-yellow-500/10',
    icon: '🐺',
  },
  {
    id: 3,
    priority: 'THIS WEEK',
    project: 'PropEdge',
    title: 'Set up The Odds API key',
    subtitle: 'Needed to go live — $20/mo',
    action: { label: 'View PropEdge', path: '/propedge' },
    color: 'border-propedge-500 bg-propedge-500/10',
    icon: '🏀',
  },
]

const QUICK_STATS = [
  { label: 'Pipeline', value: '$95.4K', color: 'text-mercury-400', icon: '💧' },
  { label: 'PropEdge Users', value: '0 / 200', color: 'text-propedge-400', icon: '🏀' },
  { label: 'HOWL Streaks', value: '5 days', color: 'text-howl-400', icon: '🐺' },
  { label: 'Tasks Due', value: '7', color: 'text-life-400', icon: '📋' },
]

const ACTIVITY = [
  { id: 1, project: 'Mercury', text: 'Created 178 companies in HubSpot', time: '2h ago', icon: '💧' },
  { id: 2, project: 'PropEdge', text: 'Build complete — needs deploy', time: '3h ago', icon: '🏀' },
  { id: 3, project: 'Mercury', text: 'Deal Studio integrated into Sales Hub', time: '3h ago', icon: '💧' },
  { id: 4, project: 'Ventures', text: 'Property Intel sample report generated', time: '4h ago', icon: '🚀' },
  { id: 5, project: 'HOWL', text: 'ODS Day 4 protocol completed', time: 'yesterday', icon: '🐺' },
]

function MomentumScore({ score = 72 }) {
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (score / 100) * circumference
  const color = score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444'

  return (
    <div className="card flex items-center gap-4">
      <div className="relative w-24 h-24 shrink-0">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="8" />
          <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
            className="transition-all duration-1000" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{score}</span>
          <span className="text-[10px] text-gray-500 uppercase">Score</span>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-white mb-1">Momentum Score</h3>
        <p className="text-xs text-gray-400 leading-relaxed">
          Based on tasks completed, deals progressed, workouts logged, and streaks maintained.
          Keep it above 70 and you're crushing it.
        </p>
      </div>
    </div>
  )
}

export default function CommandCenter() {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, Jay</h1>
        <p className="text-xs text-gray-500 mt-0.5">Here's what needs you right now.</p>
      </div>

      {/* Focus 3 */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold text-white">Your Focus 3</h2>
          <span className="text-xs text-gray-500">Do these first</span>
        </div>
        <div className="grid gap-3">
          {FOCUS_3.map(item => (
            <Link
              key={item.id}
              to={item.action.path}
              className={`card border-l-4 ${item.color} flex items-center gap-4 hover:scale-[1.01] transition-transform active:scale-[0.99] p-4`}
            >
              <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-2xl shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    item.priority === 'URGENT' ? 'text-red-400' :
                    item.priority === 'TODAY' ? 'text-yellow-400' : 'text-propedge-400'
                  }`}>{item.priority}</span>
                  <span className="text-xs text-gray-600">{item.project}</span>
                </div>
                <p className="text-sm font-medium text-white truncate">{item.title}</p>
                <p className="text-xs text-gray-400 truncate">{item.subtitle}</p>
              </div>
              <span className="shrink-0 text-xs text-life-400 font-medium bg-life-400/10 px-2.5 py-1.5 rounded-lg">
                {item.action.label} →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {QUICK_STATS.map(s => (
          <div key={s.label} className="card text-center">
            <span className="text-2xl block mb-1">{s.icon}</span>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Momentum */}
        <MomentumScore />

        {/* Activity Feed */}
        <div className="card">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Recent Activity</h3>
          <div className="space-y-2.5">
            {ACTIVITY.map(a => (
              <div key={a.id} className="flex gap-2.5 text-sm">
                <span className="text-base leading-5 shrink-0">{a.icon}</span>
                <div className="min-w-0">
                  <p className="text-gray-300 text-xs leading-relaxed">{a.text}</p>
                  <p className="text-gray-600 text-xs">{a.project} · {a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Mercury Sales Hub', icon: '💧', path: '/mercury', color: 'hover:border-mercury-500' },
          { label: 'PropEdge', icon: '🏀', path: '/propedge', color: 'hover:border-propedge-500' },
          { label: 'HOWL Pack', icon: '🐺', path: '/howl', color: 'hover:border-howl-500' },
          { label: 'Side Ventures', icon: '🚀', path: '/ventures', color: 'hover:border-green-500' },
        ].map(p => (
          <Link key={p.label} to={p.path} className={`card flex items-center gap-3 ${p.color} transition-colors`}>
            <span className="text-2xl">{p.icon}</span>
            <span className="text-sm font-medium text-gray-200">{p.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
