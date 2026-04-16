import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const ITEMS = [
  { label: 'Command Center', path: '/', icon: '🎯', type: 'page', keywords: 'home dashboard focus' },
  { label: 'Mercury Sales Hub', path: '/mercury', icon: '💧', type: 'page', keywords: 'sales pipeline deals' },
  { label: 'PropEdge', path: '/propedge', icon: '🏀', type: 'page', keywords: 'nba betting props' },
  { label: 'Ventures', path: '/ventures', icon: '🚀', type: 'page', keywords: 'side projects revenue' },
  { label: 'HOWL Pack', path: '/howl', icon: '🐺', type: 'page', keywords: 'family wellness streak' },
  { label: 'The Codex', path: '/codex', icon: '🎵', type: 'page', keywords: 'music playlists creative' },
  { label: 'Life Admin', path: '/life', icon: '📋', type: 'page', keywords: 'tasks calendar todo' },
  { label: 'Settings', path: '/settings', icon: '⚙', type: 'page', keywords: 'profile config' },
  { label: 'Open Mercury Sales Hub', icon: '🔗', type: 'action', action: 'open-mercury', keywords: 'launch mercury app' },
  { label: 'Open PropEdge App', icon: '🔗', type: 'action', action: 'open-propedge', keywords: 'launch propedge' },
  { label: 'Log a Meeting', icon: '📝', type: 'action', action: 'log-meeting', keywords: 'note update' },
  { label: 'What should I focus on?', icon: '🤖', type: 'action', action: 'ai-focus', keywords: 'help priority' },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [idx, setIdx] = useState(0)
  const ref = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handler(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(p => !p); setQuery(''); setIdx(0) }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => { if (open) ref.current?.focus() }, [open])

  const filtered = query.trim()
    ? ITEMS.filter(i => { const q = query.toLowerCase(); return i.label.toLowerCase().includes(q) || (i.keywords || '').includes(q) })
    : ITEMS

  function select(item) {
    setOpen(false)
    if (item.path) navigate(item.path)
    // actions would open external apps or trigger AI
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={() => setOpen(false)}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
          <span className="text-gray-500">🔍</span>
          <input ref={ref} className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm" placeholder="Search everything..." value={query} onChange={e => { setQuery(e.target.value); setIdx(0) }} onKeyDown={e => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setIdx(i => Math.min(i + 1, filtered.length - 1)) }
            if (e.key === 'ArrowUp') { e.preventDefault(); setIdx(i => Math.max(i - 1, 0)) }
            if (e.key === 'Enter' && filtered[idx]) select(filtered[idx])
          }} />
          <kbd className="text-xs text-gray-600 bg-gray-800 px-1.5 py-0.5 rounded">ESC</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto py-2">
          {filtered.map((item, i) => (
            <button key={item.label} onClick={() => select(item)} className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm ${i === idx ? 'bg-life-700/20 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
              <span className="text-lg w-6 text-center">{item.icon}</span>
              <span className="flex-1 text-left">{item.label}</span>
              <span className="text-xs text-gray-600 uppercase">{item.type === 'page' ? 'Go to' : 'Action'}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
