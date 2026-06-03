import { X } from 'lucide-react'
import type { SelectedNode } from '../../types/roadmap'

interface NodeDetailPanelProps {
  node: SelectedNode | null
  isDone: boolean
  onClose: () => void
  onToggleDone: () => void
}

export function NodeDetailPanel({ node, isDone, onClose, onToggleDone }: NodeDetailPanelProps) {
  if (!node) return null

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={onClose} aria-hidden />
      <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-bg-secondary shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-text-muted">{node.type}</p>
            <h2 className="text-lg font-semibold text-white">{node.label}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-bg-card hover:text-white"
            aria-label="Close panel"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <p className="text-sm leading-relaxed text-gray-300">
            This is a local clone of the roadmap.sh AI Engineer path. Topic details are bundled
            offline — explore the full guide at{' '}
            <a
              href="https://roadmap.sh/ai-engineer"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              roadmap.sh/ai-engineer
            </a>
            .
          </p>
        </div>

        <div className="border-t border-border px-5 py-4">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-200">
            <input
              type="checkbox"
              checked={isDone}
              onChange={onToggleDone}
              className="h-4 w-4 rounded border-border accent-accent"
            />
            Mark as done (saved locally)
          </label>
        </div>
      </aside>
    </>
  )
}
