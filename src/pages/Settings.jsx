export default function Settings() {
  const SERVICES = [
    { name: 'Supabase', status: 'Connected', project: 'howl-pack (us-east-1)', icon: '⚡' },
    { name: 'Vercel', status: 'Connected', team: 'team_HhBdjKhCSIppwkOEOXYjQtix', icon: '▲' },
    { name: 'HubSpot', status: 'Connected', note: 'Via Zippy-Rocket private app', icon: '🔶' },
    { name: 'GitHub', status: 'Connected', user: '21jdkline', icon: '🐙' },
    { name: 'Gmail', status: 'Connected', email: 'jkrepublic21@gmail.com', icon: '📧' },
    { name: 'Google Calendar', status: 'Connected', icon: '📅' },
    { name: 'The Odds API', status: 'Not Connected', note: 'Needed for PropEdge', icon: '🏀' },
    { name: 'Stripe', status: 'Not Connected', note: 'Needed for PropEdge + PropIntel', icon: '💳' },
  ]

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-white">Settings</h1>

      {/* Profile */}
      <div className="card">
        <h2 className="text-sm font-semibold text-gray-300 mb-3">Profile</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Name</label>
            <input className="input" defaultValue="Jay Kline" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Email</label>
            <input className="input" defaultValue="jkrepublic21@gmail.com" />
          </div>
        </div>
      </div>

      {/* Connected Services */}
      <div className="card">
        <h2 className="text-sm font-semibold text-gray-300 mb-3">Connected Services</h2>
        <div className="space-y-2">
          {SERVICES.map(s => (
            <div key={s.name} className="flex items-center gap-3 bg-gray-800 rounded-lg p-3">
              <span className="text-lg">{s.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{s.name}</p>
                <p className="text-xs text-gray-500">{s.project || s.team || s.user || s.email || s.note || ''}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                s.status === 'Connected'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              }`}>
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
