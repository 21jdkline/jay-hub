import { useState } from 'react'

const PACK = [
  {
    name: 'Jay',
    pack: 'ODS (Operation Demon Slayer)',
    rank: 'Alpha',
    streak: 5,
    todayProtocols: ['Morning Meditation', 'Cold Shower', 'Gratitude Journal', 'Workout'],
    completed: ['Morning Meditation', 'Cold Shower'],
    color: 'howl',
  },
  {
    name: 'Maddox',
    pack: 'Beast Mode',
    rank: 'Beta',
    streak: 3,
    todayProtocols: ['Morning Stretch', 'Reading 20min', 'Practice'],
    completed: ['Morning Stretch'],
    color: 'propedge',
  },
  {
    name: 'Xander',
    pack: 'X-Factor',
    rank: 'Beta',
    streak: 7,
    todayProtocols: ['Morning Routine', 'Skill Practice', 'Journal'],
    completed: ['Morning Routine', 'Skill Practice', 'Journal'],
    color: 'mercury',
  },
]

export default function Howl() {
  const [members, setMembers] = useState(PACK)

  function toggleProtocol(memberIdx, protocol) {
    setMembers(prev => prev.map((m, i) => {
      if (i !== memberIdx) return m
      const completed = m.completed.includes(protocol)
        ? m.completed.filter(p => p !== protocol)
        : [...m.completed, protocol]
      return { ...m, completed }
    }))
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-3xl">🐺</span>
        <div>
          <h1 className="text-xl font-bold text-white">HOWL Pack</h1>
          <p className="text-xs text-gray-500">Family wellness protocols</p>
        </div>
      </div>

      {/* Pack overview */}
      <div className="grid grid-cols-3 gap-3">
        {members.map(m => (
          <div key={m.name} className="card text-center">
            <p className="text-xs text-gray-400 uppercase">{m.name}</p>
            <div className={`text-2xl font-bold mt-1 text-${m.color}-400`}>
              🔥 {m.streak}
            </div>
            <p className="text-xs text-gray-500">day streak</p>
            <p className="text-xs text-gray-400 mt-1">
              {m.completed.length}/{m.todayProtocols.length} today
            </p>
          </div>
        ))}
      </div>

      {/* Individual cards */}
      {members.map((m, idx) => {
        const allDone = m.completed.length === m.todayProtocols.length
        return (
          <div key={m.name} className={`card border-l-4 border-${m.color}-500 ${allDone ? 'bg-green-900/10' : ''}`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-white">{m.name} — {m.pack}</h3>
                <p className="text-xs text-gray-500">Rank: {m.rank} · Streak: {m.streak} days</p>
              </div>
              {allDone && (
                <span className="text-xs bg-green-500/20 text-green-400 px-2.5 py-1 rounded-full font-medium">
                  All Done ✓
                </span>
              )}
            </div>

            <div className="space-y-2">
              {m.todayProtocols.map(p => {
                const done = m.completed.includes(p)
                return (
                  <button
                    key={p}
                    onClick={() => toggleProtocol(idx, p)}
                    className={`w-full flex items-center gap-3 text-sm py-2 px-3 rounded-lg transition-colors text-left ${
                      done
                        ? 'bg-green-900/20 text-green-300 line-through'
                        : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                    }`}
                  >
                    <span className={done ? 'text-green-400' : 'text-gray-600'}>{done ? '☑' : '☐'}</span>
                    {p}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
