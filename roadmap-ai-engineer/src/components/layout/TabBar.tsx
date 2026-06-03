import { Sparkles } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const tabs = [
  { to: '/', label: 'Roadmap', end: true },
  { to: '/projects', label: 'Projects', end: false },
  { to: '/ai-tutor', label: 'AI Tutor', end: false },
]

export function TabBar() {
  const [showTip, setShowTip] = useState(false)

  return (
    <div className="border-b border-border bg-bg-primary px-4 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 py-3">
        <nav className="flex flex-wrap gap-1 rounded-lg bg-bg-secondary p-1">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `rounded-md px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-bg-card text-white shadow-sm'
                    : 'text-text-muted hover:text-white'
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowTip((v) => !v)}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-gray-200 hover:bg-bg-secondary"
          >
            <Sparkles size={16} className="text-accent" />
            Personalize
          </button>
          {showTip && (
            <div className="absolute right-0 top-full z-20 mt-2 w-64 rounded-lg border border-border bg-bg-card p-3 text-sm text-gray-300 shadow-xl">
              Sign-in is not available in this local clone. Progress is saved in your browser only.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
