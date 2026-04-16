export default function Codex() {
  const MARKERS = [
    { name: 'Emotion', status: 'Active', desc: 'Tracks emotional resonance and intensity' },
    { name: 'Narrative', status: 'Active', desc: 'Story arc and lyrical progression' },
    { name: 'Sonic', status: 'Active', desc: 'Production quality, texture, layering' },
    { name: 'Cultural', status: 'Exploring', desc: 'Context, influence, genre-bending' },
    { name: 'Technical', status: 'Exploring', desc: 'Musicianship, arrangement complexity' },
    { name: 'Transcendence', status: 'Defining', desc: 'The ineffable — when music becomes more' },
  ]

  const RECENT_CANDIDATES = [
    { title: 'Runaway', artist: 'Kanye West', markers: 5, status: 'Candidate' },
    { title: 'Pyramids', artist: 'Frank Ocean', markers: 5, status: 'Candidate' },
    { title: 'DNA.', artist: 'Kendrick Lamar', markers: 4, status: 'Under Review' },
    { title: 'Nights', artist: 'Frank Ocean', markers: 5, status: 'Candidate' },
    { title: 'Devil In A New Dress', artist: 'Kanye West', markers: 4, status: 'Under Review' },
  ]

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-3xl">🎵</span>
        <div>
          <h1 className="text-xl font-bold text-white">The Codex</h1>
          <p className="text-xs text-gray-500">Music curation & creative research</p>
        </div>
      </div>

      {/* The 6 Markers */}
      <div className="card">
        <h2 className="text-sm font-semibold text-gray-300 mb-3">The 6 Markers Framework</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {MARKERS.map(m => (
            <div key={m.name} className="bg-gray-800 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-codex-400">{m.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  m.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                  m.status === 'Exploring' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-700 text-gray-400'
                }`}>{m.status}</span>
              </div>
              <p className="text-xs text-gray-500">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Candidates */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-300">Recent Candidates</h2>
          <span className="text-xs text-gray-500">50 total in pipeline</span>
        </div>
        <div className="space-y-2">
          {RECENT_CANDIDATES.map(c => (
            <div key={c.title} className="flex items-center gap-3 bg-gray-800 rounded-lg p-3">
              <div className="w-10 h-10 bg-codex-700/30 rounded-lg flex items-center justify-center text-lg">
                🎵
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{c.title}</p>
                <p className="text-xs text-gray-400">{c.artist}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-codex-400">{c.markers}/6 markers</p>
                <p className="text-[10px] text-gray-500">{c.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Creative Notes */}
      <div className="card">
        <h2 className="text-sm font-semibold text-gray-300 mb-3">Creative Notes</h2>
        <textarea
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-codex-500 min-h-[120px]"
          placeholder="Capture ideas, patterns, connections..."
          defaultValue="DMT Protocol: exploring how certain track sequences can alter perception and focus. Need to test the transition from Pyramids → Nights as a mood bridge."
        />
      </div>
    </div>
  )
}
