import { Download, Map, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg-primary/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold text-white">
            <Map className="text-accent" size={22} />
            roadmap.sh
          </Link>
          <Link
            to="/"
            className="hidden text-sm text-text-muted hover:text-white sm:inline"
          >
            All Roadmaps
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://roadmap.sh/newsletter"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-lg border border-border px-3 py-1.5 text-sm text-gray-200 hover:bg-bg-secondary sm:inline-block"
          >
            Weekly Newsletter
          </a>
          <a
            href="https://roadmap.sh/ai-engineer"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white hover:brightness-110"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Download</span>
          </a>
          <button
            type="button"
            className="rounded-lg p-2 text-gray-400 hover:bg-bg-secondary sm:hidden"
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
