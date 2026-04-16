import { useState } from 'react'

const INITIAL_VENTURES = [
  {
    id: 'propedge',
    name: 'PropEdge',
    icon: '🏀',
    status: 'Building',
    description: 'NBA prop betting intelligence. XGBoost models, 7 edge layers, two-tier subscription.',
    nextMilestone: 'Deploy + train ML models',
    revenue: null,
    color: 'border-propedge-500',
  },
  {
    id: 'propintel',
    name: 'Property Intel Reports',
    icon: '🏢',
    status: 'Building',
    description: 'Automated property analysis reports for PM companies. Leverages LIHTC data + Badger intel.',
    nextMilestone: 'Stripe setup + first sale',
    revenue: null,
    color: 'border-green-500',
  },
  {
    id: 'templates',
    name: 'Cowork Templates',
    icon: '📦',
    status: 'Building',
    description: 'Sellable workflow templates for Cowork users. 5 packages built.',
    nextMilestone: 'Deploy landing page + waitlist',
    revenue: null,
    color: 'border-life-500',
  },
  {
    id: 'ai-agents',
    name: 'AI Agents as a Service',
    icon: '🤖',
    status: 'Idea',
    description: 'White-label Mercury Hub concept for other SMB service companies.',
    nextMilestone: 'Build demo for pest control vertical',
    revenue: null,
    color: 'border-howl-500',
  },
  {
    id: 'routeopt',
    name: 'Field Sales Route Optimizer',
    icon: '🗺',
    status: 'Idea',
    description: 'Lighter Badger Maps alternative with native HubSpot + AI meeting debrief.',
    nextMilestone: 'MVP build',
    revenue: null,
    color: 'border-codex-500',
  },
]

const STATUS_COLORS = {
  'Building': 'bg-yellow-500/20 text-yellow-400',
  'Live': 'bg-green-500/20 text-green-400',
  'Paused': 'bg-gray-700 text-gray-400',
  'Dropped': 'bg-red-500/20 text-red-400',
  'Idea': 'bg-blue-500/20 text-blue-400',
}

const STATUSES = ['Idea', 'Building', 'Live', 'Paused', 'Dropped']

export default function Ventures() {
  const [ventures, setVentures] = useState(INITIAL_VENTURES)

  function updateStatus(id, status) {
    setVentures(prev => prev.map(v => v.id === id ? { ...v, status } : v))
  }

  const active = ventures.filter(v => !['Paused', 'Dropped'].includes(v.status))
  const inactive = ventures.filter(v => ['Paused', 'Dropped'].includes(v.status))

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Side Ventures</h1>
        <p className="text-xs text-gray-500 mt-0.5">Throw things at the wall. See what sticks. Drop what doesn't.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card text-center">
          <p className="text-2xl font-bold text-white">{active.length}</p>
          <p className="text-xs text-gray-400">Active</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-green-400">$0</p>
          <p className="text-xs text-gray-400">Total Revenue</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-gray-400">{inactive.length}</p>
          <p className="text-xs text-gray-400">Paused/Dropped</p>
        </div>
      </div>

      {/* Venture cards */}
      <div className="space-y-3">
        {ventures.map(v => (
          <div key={v.id} className={`card border-l-4 ${v.color} ${['Paused', 'Dropped'].includes(v.status) ? 'opacity-50' : ''}`}>
            <div className="flex items-start gap-4">
              <span className="text-3xl shrink-0">{v.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-white">{v.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[v.status]}`}>
                    {v.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-2">{v.description}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-500">Next:</span>
                  <span className="text-gray-300">{v.nextMilestone}</span>
                </div>
                {v.revenue !== null && (
                  <p className="text-xs text-green-400 mt-1">Revenue: ${v.revenue}</p>
                )}
              </div>
              <div className="shrink-0">
                <select
                  value={v.status}
                  onChange={e => updateStatus(v.id, e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg text-xs text-gray-300 px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-life-500"
                >
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
