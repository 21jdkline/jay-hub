import { useState } from 'react'

const MOCK_EVENTS = [
  { id: 1, title: 'Blood Donation — ImpactLife St. Peters', time: 'Tomorrow 2:00 PM', color: 'bg-red-500' },
  { id: 2, title: 'Mercury site walk — River Chase', time: 'Fri 10:00 AM', color: 'bg-mercury-500' },
  { id: 3, title: 'Xander baseball practice', time: 'Sat 9:00 AM', color: 'bg-howl-500' },
  { id: 4, title: 'Weekly pipeline review', time: 'Mon 9:00 AM', color: 'bg-mercury-500' },
  { id: 5, title: 'HarmonyCares standup', time: 'Mon 10:30 AM', color: 'bg-life-500' },
]

const MOCK_TASKS = [
  { id: 1, title: 'Run Supabase migrations for PropEdge + Mercury Hub', project: 'Ventures', done: false },
  { id: 2, title: 'Set env vars on Vercel for all projects', project: 'Ventures', done: false },
  { id: 3, title: 'Sign up for The Odds API ($20/mo)', project: 'PropEdge', done: false },
  { id: 4, title: 'Create Stripe products for PropEdge + PropIntel', project: 'Ventures', done: false },
  { id: 5, title: 'Review 20 Gmail draft outreach emails', project: 'Mercury', done: false },
  { id: 6, title: 'Contact 4 new construction leads', project: 'Mercury', done: false },
  { id: 7, title: 'Paste HC Prompt 8 into Claude.ai', project: 'Work', done: false },
  { id: 8, title: 'Import Chrome bookmarks', project: 'Life', done: false },
]

const QUICK_LINKS = [
  { label: 'Gmail', url: 'https://mail.google.com', icon: '📧' },
  { label: 'HubSpot', url: 'https://app.hubspot.com', icon: '🔶' },
  { label: 'Vercel', url: 'https://vercel.com/dashboard', icon: '▲' },
  { label: 'Supabase', url: 'https://supabase.com/dashboard', icon: '⚡' },
  { label: 'GitHub', url: 'https://github.com/21jdkline', icon: '🐙' },
  { label: 'Google Calendar', url: 'https://calendar.google.com', icon: '📅' },
]

export default function LifeAdmin() {
  const [tasks, setTasks] = useState(MOCK_TASKS)

  function toggleTask(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const pending = tasks.filter(t => !t.done)
  const completed = tasks.filter(t => t.done)

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-3xl">📋</span>
        <div>
          <h1 className="text-xl font-bold text-white">Life Admin</h1>
          <p className="text-xs text-gray-500">Calendar, tasks, and quick links</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="card">
          <h2 className="text-sm font-semibold text-gray-300 mb-3">Upcoming Events</h2>
          <div className="space-y-2.5">
            {MOCK_EVENTS.map(e => (
              <div key={e.id} className="flex items-center gap-3">
                <div className={`w-1 h-10 rounded-full ${e.color}`} />
                <div>
                  <p className="text-sm text-white">{e.title}</p>
                  <p className="text-xs text-gray-500">{e.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-300">Tasks</h2>
            <span className="text-xs text-gray-500">{pending.length} remaining</span>
          </div>
          <div className="space-y-1.5 max-h-[350px] overflow-y-auto">
            {pending.map(t => (
              <button
                key={t.id}
                onClick={() => toggleTask(t.id)}
                className="w-full flex items-center gap-2 text-sm py-1.5 px-2 rounded text-left hover:bg-gray-800 transition-colors"
              >
                <span className="text-gray-600">☐</span>
                <span className="text-gray-200 flex-1">{t.title}</span>
                <span className="text-xs text-gray-600">{t.project}</span>
              </button>
            ))}
            {completed.length > 0 && (
              <>
                <div className="border-t border-gray-800 my-2" />
                <p className="text-xs text-gray-600 px-2">Completed ({completed.length})</p>
                {completed.map(t => (
                  <button
                    key={t.id}
                    onClick={() => toggleTask(t.id)}
                    className="w-full flex items-center gap-2 text-sm py-1.5 px-2 rounded text-left hover:bg-gray-800 transition-colors opacity-50"
                  >
                    <span className="text-green-500">☑</span>
                    <span className="text-gray-400 flex-1 line-through">{t.title}</span>
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-sm font-semibold text-gray-300 mb-3">Quick Links</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {QUICK_LINKS.map(l => (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noopener"
              className="card text-center py-3 hover:border-life-500 transition-colors"
            >
              <span className="text-2xl block mb-1">{l.icon}</span>
              <span className="text-xs text-gray-300">{l.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
