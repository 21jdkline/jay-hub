import { useEffect, useState } from 'react'
import { supabase, JAY_USER_ID } from '../lib/supabase'

const SERVICES = [
  { name: 'Supabase', status: 'Connected', project: 'qlksnddlijlwgysovrky (us-east-1)', icon: '⚡' },
  { name: 'Vercel', status: 'Connected', team: 'team_HhBdjKhCSIppwkOEOXYjQtix', icon: '▲' },
  { name: 'HubSpot', status: 'Connected', note: 'Via Zippy-Rocket private app', icon: '🔶' },
  { name: 'GitHub', status: 'Connected', user: '21jdkline', icon: '🐙' },
  { name: 'Gmail', status: 'Connected', email: 'jkrepublic21@gmail.com', icon: '📧' },
  { name: 'Google Calendar', status: 'Connected', icon: '📅' },
  { name: 'The Odds API', status: 'Not Connected', note: 'Needed for PropEdge', icon: '🏀' },
  { name: 'Stripe', status: 'Not Connected', note: 'Needed for PropEdge + PropIntel', icon: '💳' },
]

export default function Settings() {
  const [profile, setProfile] = useState({ display_name: '', email: '' })
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState(null)

  useEffect(() => {
    supabase
      .from('jay_hub_profiles')
      .select('display_name, settings')
      .eq('id', JAY_USER_ID)
      .maybeSingle()
      .then(({ data }) => {
        setProfile({
          display_name: data?.display_name || '',
          email: data?.settings?.email || '',
        })
        setLoading(false)
      })
  }, [])

  async function saveField(field, value) {
    setSaveError(null)
    const next = { ...profile, [field]: value }
    setProfile(next)
    const patch =
      field === 'email'
        ? { settings: { ...(next.email ? { email: next.email } : {}), timezone: 'America/Chicago' } }
        : { display_name: next.display_name }
    const { error } = await supabase
      .from('jay_hub_profiles')
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq('id', JAY_USER_ID)
    if (error) {
      setSaveError(error.message)
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 1500)
    }
  }

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-white">Settings</h1>
        {saved && <span className="text-xs text-green-400">✓ saved</span>}
        {saveError && <span className="text-xs text-red-400">⚠ {saveError}</span>}
      </div>

      {/* Profile */}
      <div className="card">
        <h2 className="text-sm font-semibold text-gray-300 mb-3">Profile</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Name</label>
            <input
              className="input"
              value={profile.display_name}
              disabled={loading}
              onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
              onBlur={(e) => saveField('display_name', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Email</label>
            <input
              className="input"
              value={profile.email}
              disabled={loading}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              onBlur={(e) => saveField('email', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Connected Services */}
      <div className="card">
        <h2 className="text-sm font-semibold text-gray-300 mb-3">Connected Services</h2>
        <div className="space-y-2">
          {SERVICES.map((s) => (
            <div key={s.name} className="flex items-center gap-3 bg-gray-800 rounded-lg p-3">
              <span className="text-lg">{s.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{s.name}</p>
                <p className="text-xs text-gray-500">{s.project || s.team || s.user || s.email || s.note || ''}</p>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  s.status === 'Connected'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {s.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="card">
        <h2 className="text-sm font-semibold text-gray-300 mb-3">Project Table Prefixes (Supabase)</h2>
        <div className="text-xs text-gray-400 space-y-1 font-mono">
          <p>propedge_* — PropEdge tables</p>
          <p>mercury_hub_* — Mercury Sales Hub tables</p>
          <p>jay_hub_* — The Hub tables</p>
          <p>templates_* — Cowork Templates tables</p>
          <p>routeopt_* — Route Optimizer tables</p>
          <p>(HOWL tables use no prefix)</p>
        </div>
      </div>
    </div>
  )
}
