import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { supabase, JAY_USER_ID } from '../lib/supabase'

const PROJECT_STYLE = {
  Mercury: { color: 'border-mercury-500 bg-mercury-500/10', actionColor: 'text-mercury-400', icon: '💧', path: '/mercury', label: 'Open Mercury' },
  PropEdge: { color: 'border-propedge-500 bg-propedge-500/10', actionColor: 'text-propedge-400', icon: '🏀', path: '/propedge', label: 'Open PropEdge' },
  HOWL: { color: 'border-howl-500 bg-howl-500/10', actionColor: 'text-howl-400', icon: '🐺', path: '/howl', label: 'Open HOWL' },
  Codex: { color: 'border-codex-500 bg-codex-500/10', actionColor: 'text-codex-400', icon: '🎵', path: '/codex', label: 'Open Codex' },
  Life: { color: 'border-life-500 bg-life-500/10', actionColor: 'text-life-400', icon: '🗓', path: '/life', label: 'Open Life Admin' },
  System: { color: 'border-red-500 bg-red-500/10', actionColor: 'text-red-400', icon: '🛠', path: '/settings', label: 'Open Settings' },
  HC: { color: 'border-blue-500 bg-blue-500/10', actionColor: 'text-blue-400', icon: '🏥', path: '/life', label: 'Open Life Admin' },
  Hub: { color: 'border-gray-500 bg-gray-500/10', actionColor: 'text-gray-400', icon: '🧠', path: '/settings', label: 'Open Settings' },
}

const PRIORITY_LABEL = { 1: 'URGENT', 2: 'TODAY', 3: 'THIS WEEK', 4: 'SOMEDAY', 5: 'SOMEDAY' }
const PRIORITY_COLOR = {
  URGENT: 'text-red-400',
  TODAY: 'text-yellow-400',
  'THIS WEEK': 'text-propedge-400',
  SOMEDAY: 'text-gray-400',
}

function MomentumScore({ score }) {
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (score / 100) * circumference
  const color = score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444'

  return (
    <div className="card flex items-center gap-4">
      <div className="relative w-24 h-24 shrink-0">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="8" />
          <circle
            cx="50" cy="50" r="45"
            fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
            className="transition-all duration-1000"
          />
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
  const [focus3, setFocus3] = useState([])
  const [openTaskCount, setOpenTaskCount] = useState(0)
  const [activity, setActivity] = useState([])
  const [momentum, setMomentum] = useState(72)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      supabase
        .from('jay_hub_tasks')
        .select('id, title, project, priority')
        .eq('user_id', JAY_USER_ID)
        .is('completed_at', null)
        .order('priority', { ascending: true })
        .order('created_at', { ascending: true }),
      supabase
        .from('jay_hub_tasks')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', JAY_USER_ID)
        .is('completed_at', null),
      supabase
        .from('jay_hub_activity_feed')
        .select('id, project, summary, created_at')
        .eq('user_id', JAY_USER_ID)
        .order('created_at', { ascending: false })
        .limit(5),
      supabase
        .from('jay_hub_momentum')
        .select('score')
        .eq('user_id', JAY_USER_ID)
        .order('date', { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]).then(([tasksRes, countRes, activityRes, momentumRes]) => {
      const top = (tasksRes.data || []).slice(0, 3).map((t) => {
        const style = PROJECT_STYLE[t.project] || PROJECT_STYLE.System
        const priorityLabel = PRIORITY_LABEL[t.priority] || 'SOMEDAY'
        return {
          id: t.id,
          title: t.title,
          project: t.project,
          priority: priorityLabel,
          priorityColor: PRIORITY_COLOR[priorityLabel],
          color: style.color,
          actionColor: style.actionColor,
          icon: style.icon,
          path: style.path,
          actionLabel: style.label,
        }
      })
      setFocus3(top)
      setOpenTaskCount(countRes.count ?? 0)
      setActivity(activityRes.data || [])
      if (momentumRes.data?.score != null) setMomentum(momentumRes.data.score)
      setLoading(false)
    })
  }, [])

  const now = new Date()
  const greeting = now.getHours() < 12 ? 'morning' : now.getHours() < 17 ? 'afternoon' : 'evening'

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Good {greeting}, Jay</h1>
        <p className="text-xs text-gray-500 mt-0.5">Here's what needs you right now.</p>
      </div>

      {/* Focus 3 */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold text-white">Your Focus 3</h2>
          <span className="text-xs text-gray-500">Do these first</span>
        </div>
        <div className="grid gap-3">
          {loading && <p className="text-xs text-gray-500">Loading…</p>}
          {!loading && focus3.length === 0 && (
            <p className="text-xs text-gray-500">No open tasks. Inbox zero — nice.</p>
          )}
          {focus3.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`card border-l-4 ${item.color} flex items-center gap-4 hover:scale-[1.01] transition-transform active:scale-[0.99] p-4`}
            >
              <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-2xl shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-xs font-bold uppercase tracking-wider ${item.priorityColor}`}>
                    {item.priority}
                  </span>
                  <span className="text-xs text-gray-600">{item.project}</span>
                </div>
                <p className="text-sm font-medium text-white truncate">{item.title}</p>
              </div>
              <span className={`shrink-0 text-xs ${item.actionColor} font-medium bg-life-400/10 px-2.5 py-1.5 rounded-lg`}>
                {item.actionLabel} →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Open Tasks', value: loading ? '…' : String(openTaskCount), color: 'text-life-400', icon: '📋' },
          { label: 'Pipeline', value: '$95.4K', color: 'text-mercury-400', icon: '💧' },
          { label: 'PropEdge Users', value: '0 / 200', color: 'text-propedge-400', icon: '🏀' },
          { label: 'HOWL Streaks', value: '5 days', color: 'text-howl-400', icon: '🐺' },
        ].map((s) => (
          <div key={s.label} className="card text-center">
            <span className="text-2xl block mb-1">{s.icon}</span>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Momentum */}
        <MomentumScore score={momentum} />

        {/* Activity Feed */}
        <div className="card">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Recent Activity</h3>
          <div className="space-y-2.5">
            {loading && <p className="text-xs text-gray-500">Loading…</p>}
            {!loading && activity.length === 0 && (
              <p className="text-xs text-gray-500">No activity yet.</p>
            )}
            {activity.map((a) => {
              const style = PROJECT_STYLE[a.project] || PROJECT_STYLE.System
              let relative
              try {
                relative = formatDistanceToNow(new Date(a.created_at), { addSuffix: true })
              } catch {
                relative = ''
              }
              return (
                <div key={a.id} className="flex gap-2.5 text-sm">
                  <span className="text-base leading-5 shrink-0">{style.icon}</span>
                  <div className="min-w-0">
                    <p className="text-gray-300 text-xs leading-relaxed">{a.summary}</p>
                    <p className="text-gray-600 text-xs">
                      {a.project} · {relative}
                    </p>
                  </div>
                </div>
              )
            })}
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
        ].map((p) => (
          <Link key={p.label} to={p.path} className={`card flex items-center gap-3 ${p.color} transition-colors`}>
            <span className="text-2xl">{p.icon}</span>
            <span className="text-sm font-medium text-gray-200">{p.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
