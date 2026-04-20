import { useEffect, useState } from 'react'
import { supabase, JAY_USER_ID } from '../lib/supabase'

const STATUS_COLORS = {
  Building: 'bg-yellow-500/20 text-yellow-400',
  Live: 'bg-green-500/20 text-green-400',
  Paused: 'bg-gray-700 text-gray-400',
  Dropped: 'bg-red-500/20 text-red-400',
  Idea: 'bg-blue-500/20 text-blue-400',
}

const STATUSES = ['Idea', 'Building', 'Live', 'Paused', 'Dropped']

const VISUAL_MAP = {
  'PropEdge': { icon: '🏀', color: 'border-propedge-500' },
  'Property Intel Reports': { icon: '🏢', color: 'border-green-500' },
  'Cowork Templates': { icon: '📦', color: 'border-life-500' },
  'AI Agents as a Service': { icon: '🤖', color: 'border-howl-500' },
  'Field Sales Route Optimizer': { icon: '🗺', color: 'border-codex-500' },
}

function decorate(v) {
  return { ...v, ...(VISUAL_MAP[v.name] || { icon: '🚀', color: 'border-gray-500' }) }
}

export default function Ventures() {
  const [ventures, setVentures] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { data, error } = await supabase
      .from('jay_hub_ventures')
      .select('*')
      .eq('user_id', JAY_USER_ID)
      .order('created_at', { ascending: true })
    if (error) {
      setError(error.message)
    } else {
      setVentures((data || []).map(decorate))
    }
    setLoading(false)
  }

  async function updateStatus(id, status) {
    const prev = ventures
    setVentures(prev.map((v) => (v.id === id ? { ...v, status } : v)))
    const { error } = await supabase
      .from('jay_hub_ventures')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) {
      setError(error.message)
      setVentures(prev)
    }
  }

  const active = ventures.filter((v) => !['Paused', 'Dropped'].includes(v.status))
  const inactive = ventures.filter((v) => ['Paused', 'Dropped'].includes(v.status))
  const totalRevenue = ventures.reduce((sum, v) => sum + (Number(v.revenue) || 0), 0)

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Side Ventures</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Throw things at the wall. See what sticks. Drop what doesn't.
        </p>
        {error && <p className="text-xs text-red-400 mt-1">⚠ {error}</p>}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card text-center">
          <p className="text-2xl font-bold text-white">{loading ? '…' : active.length}</p>
          <p className="text-xs text-gray-400">Active</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-green-400">${totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-gray-400">Total Revenue</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-gray-400">{loading ? '…' : inactive.length}</p>
          <p className="text-xs text-gray-400">Paused/Dropped</p>
        </div>
      </div>

      {/* Venture cards */}
      <div className="space-y-3">
        {loading && <p className="text-xs text-gray-500">Loading ventures…</p>}
        {!loading && ventures.length === 0 && (
          <p className="text-xs text-gray-500">No ventures yet. Add rows to jay_hub_ventures in Supabase.</p>
        )}
        {ventures.map((v) => (
          <div
            key={v.id}
            className={`card border-l-4 ${v.color} ${
              ['Paused', 'Dropped'].includes(v.status) ? 'opacity-50' : ''
            }`}
          >
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
                  <span className="text-gray-300">{v.next_milestone}</span>
                </div>
                {v.revenue !== null && v.revenue !== undefined && (
                  <p className="text-xs text-green-400 mt-1">Revenue: ${Number(v.revenue).toLocaleString()}</p>
                )}
              </div>
              <div className="shrink-0">
                <select
                  value={v.status}
                  onChange={(e) => updateStatus(v.id, e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg text-xs text-gray-300 px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-life-500"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
