import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const mainNav = [
  { to: '/',         label: 'Command',   icon: '🎯', color: 'text-life-400' },
  { to: '/mercury',  label: 'Mercury',   icon: '💧', color: 'text-mercury-400' },
  { to: '/propedge', label: 'PropEdge',  icon: '🏀', color: 'text-propedge-400' },
  { to: '/ventures', label: 'Ventures',  icon: '🚀', color: 'text-green-400' },
  { to: '/howl',     label: 'HOWL',      icon: '🐺', color: 'text-howl-400' },
  { to: '/codex',    label: 'Codex',     icon: '🎵', color: 'text-codex-400' },
  { to: '/life',     label: 'Life',      icon: '📋', color: 'text-life-400' },
  { to: '/settings', label: 'Settings',  icon: '⚙',  color: 'text-gray-400' },
]

const mobileNav = mainNav.slice(0, 4)
const overflowNav = mainNav.slice(4)

export default function Layout({ children }) {
  const [moreOpen, setMoreOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-life-500 to-howl-500 rounded-lg flex items-center justify-center text-sm font-bold">
            J
          </div>
          <span className="font-semibold text-white hidden sm:block">The Hub</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {mainNav.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`
              }
            >
              <span className="text-sm">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Search trigger */}
        <button
          onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
          className="hidden md:flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 bg-gray-800 px-2.5 py-1.5 rounded-lg"
        >
          Search <kbd className="text-gray-600 bg-gray-700 px-1 py-0.5 rounded text-[10px]">Ctrl+K</kbd>
        </button>
      </header>

      <main className="flex-1 overflow-auto">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden bg-gray-900 border-t border-gray-800 flex relative">
        {mobileNav.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-2 text-xs font-medium transition-colors ${
                isActive ? item.color : 'text-gray-500'
              }`
            }
          >
            <span className="text-lg leading-none mb-0.5">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
        <button
          onClick={() => setMoreOpen(p => !p)}
          className={`flex-1 flex flex-col items-center py-2 text-xs font-medium ${moreOpen ? 'text-life-400' : 'text-gray-500'}`}
        >
          <span className="text-lg leading-none mb-0.5">⋯</span>
          More
        </button>
        {moreOpen && (
          <div className="absolute bottom-full right-0 mb-1 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden min-w-[180px]">
            {overflowNav.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMoreOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-sm border-b border-gray-800 last:border-0 ${
                    isActive ? `${item.color} bg-gray-800` : 'text-gray-300 hover:bg-gray-800'
                  }`
                }
              >
                <span>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </div>
  )
}
