const MOCK = {
  pipelineValue: 95400,
  weightedValue: 41200,
  activeDeals: 30,
  closedThisMonth: 2,
  hotProspects: [
    { name: 'River Chase Apartments', units: 418, stage: 'Proposal Sent', nextAction: 'Send proposal by Friday' },
    { name: 'Vanguard Crossing', units: 312, stage: 'Negotiating', nextAction: 'Follow up on terms' },
    { name: 'Sunset Ridge', units: 204, stage: 'Contacted', nextAction: 'Schedule site walk' },
  ],
  overdueFollowUps: 3,
  companiesInHubSpot: 540,
}

function fmt$(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

export default function MercuryCard() {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💧</span>
          <div>
            <h1 className="text-xl font-bold text-white">Mercury Valet Trash</h1>
            <p className="text-xs text-gray-500">Sales operations overview</p>
          </div>
        </div>
        <a
          href="https://mercury-sales-hub.vercel.app"
          target="_blank"
          rel="noopener"
          className="btn-primary text-sm flex items-center gap-1.5"
        >
          Open Sales Hub →
        </a>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="card">
          <p className="text-xs text-gray-400 uppercase">Pipeline</p>
          <p className="text-2xl font-bold text-mercury-400 mt-1">{fmt$(MOCK.pipelineValue)}</p>
        </div>
        <div className="card">
          <p className="text-xs text-gray-400 uppercase">Weighted</p>
          <p className="text-2xl font-bold text-white mt-1">{fmt$(MOCK.weightedValue)}</p>
        </div>
        <div className="card">
          <p className="text-xs text-gray-400 uppercase">Active Deals</p>
          <p className="text-2xl font-bold text-white mt-1">{MOCK.activeDeals}</p>
        </div>
        <div className="card">
          <p className="text-xs text-gray-400 uppercase">Closed Won</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{MOCK.closedThisMonth}</p>
        </div>
      </div>

      {/* Overdue alert */}
      {MOCK.overdueFollowUps > 0 && (
        <div className="card border-l-4 border-red-500 bg-red-500/10 flex items-center gap-3">
          <span className="text-2xl">⚠</span>
          <div>
            <p className="text-sm font-medium text-white">{MOCK.overdueFollowUps} overdue follow-ups</p>
            <p className="text-xs text-gray-400">Deals going stale — open Sales Hub to catch up</p>
          </div>
        </div>
      )}

      {/* Hot prospects */}
      <div className="card">
        <h2 className="text-sm font-semibold text-gray-300 mb-3">Hot Prospects</h2>
        <div className="space-y-3">
          {MOCK.hotProspects.map(p => (
            <div key={p.name} className="flex items-center gap-3 pb-3 border-b border-gray-800 last:border-0 last:pb-0">
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{p.name}</p>
                <p className="text-xs text-gray-400">{p.units} units · {p.stage}</p>
              </div>
              <span className="text-xs text-gray-300 bg-gray-800 px-2 py-1 rounded">{p.nextAction}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-3">
        <a href="https://mercury-sales-hub.vercel.app/chat" target="_blank" rel="noopener" className="card text-center hover:border-mercury-500 transition-colors cursor-pointer">
          <span className="text-2xl block mb-1">📝</span>
          <span className="text-xs text-gray-300">Log Meeting</span>
        </a>
        <a href="https://mercury-sales-hub.vercel.app/quotes" target="_blank" rel="noopener" className="card text-center hover:border-mercury-500 transition-colors cursor-pointer">
          <span className="text-2xl block mb-1">💰</span>
          <span className="text-xs text-gray-300">New Quote</span>
        </a>
        <a href="https://mercury-sales-hub.vercel.app/pipeline" target="_blank" rel="noopener" className="card text-center hover:border-mercury-500 transition-colors cursor-pointer">
          <span className="text-2xl block mb-1">◉</span>
          <span className="text-xs text-gray-300">Pipeline Board</span>
        </a>
      </div>

      <p className="text-xs text-gray-600 text-center">{MOCK.companiesInHubSpot} companies in HubSpot</p>
    </div>
  )
}
