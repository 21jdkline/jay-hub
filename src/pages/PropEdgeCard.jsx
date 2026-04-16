export default function PropEdgeCard() {
  const MOCK_SIGNALS = [
    { player: 'Jayson Tatum', stat: 'Points', line: 27.5, edge: '+3.2', signal: 'BET', confidence: 82 },
    { player: 'Nikola Jokic', stat: 'Assists', line: 8.5, edge: '+1.8', signal: 'LEAN', confidence: 71 },
    { player: 'Luka Doncic', stat: '3PM', line: 3.5, edge: '+0.9', signal: 'LEAN', confidence: 65 },
  ]

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏀</span>
          <div>
            <h1 className="text-xl font-bold text-white">PropEdge</h1>
            <p className="text-xs text-gray-500">NBA prop betting intelligence</p>
          </div>
        </div>
        <a href="https://propedge.vercel.app" target="_blank" rel="noopener" className="bg-propedge-600 hover:bg-propedge-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors">
          Open PropEdge →
        </a>
      </div>

      {/* Status */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card text-center">
          <p className="text-xs text-gray-400 uppercase">Status</p>
          <p className="text-lg font-bold text-yellow-400 mt-1">Building</p>
        </div>
        <div className="card text-center">
          <p className="text-xs text-gray-400 uppercase">Users</p>
          <p className="text-lg font-bold text-white mt-1">0 / 200</p>
        </div>
        <div className="card text-center">
          <p className="text-xs text-gray-400 uppercase">Model Accuracy</p>
          <p className="text-lg font-bold text-propedge-400 mt-1">—</p>
          <p className="text-[10px] text-gray-500">needs training data</p>
        </div>
      </div>

      {/* Sample signals */}
      <div className="card">
        <h2 className="text-sm font-semibold text-gray-300 mb-3">Sample Signals (demo data)</h2>
        <div className="space-y-2">
          {MOCK_SIGNALS.map(s => (
            <div key={s.player + s.stat} className="flex items-center gap-3 bg-gray-800 rounded-lg p-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${
                s.signal === 'BET' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {s.signal}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{s.player} — {s.stat}</p>
                <p className="text-xs text-gray-400">Line: {s.line} · Edge: {s.edge} · {s.confidence}% confidence</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next steps */}
      <div className="card border-l-4 border-propedge-500">
        <h3 className="text-sm font-semibold text-white mb-2">Next Steps to Go Live</h3>
        <div className="space-y-1.5 text-xs text-gray-300">
          <p>☐ Run Supabase migration (propedge schema)</p>
          <p>☐ Sign up for The Odds API ($20/mo)</p>
          <p>☐ Set VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY on Vercel</p>
          <p>☐ Run fetch_game_logs.py (3 seasons of NBA data)</p>
          <p>☐ Run train_model.py to build XGBoost models</p>
          <p>☐ Set up Stripe for Premium tier ($15/mo)</p>
          <p>☐ Deploy to Vercel</p>
        </div>
      </div>
    </div>
  )
}
