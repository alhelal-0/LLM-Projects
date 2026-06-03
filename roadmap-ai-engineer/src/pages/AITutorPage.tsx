import { Bot, Send } from 'lucide-react'
import { useState } from 'react'

export function AITutorPage() {
  const [input, setInput] = useState('')

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="rounded-xl border border-border bg-bg-secondary">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Bot className="text-accent" size={24} />
          <div>
            <h1 className="text-lg font-semibold text-white">AI Tutor</h1>
            <p className="text-sm text-text-muted">Ask questions about the AI Engineer roadmap</p>
          </div>
        </div>

        <div className="flex min-h-[360px] flex-col justify-between p-5">
          <div className="rounded-lg border border-border bg-bg-card p-4 text-sm text-gray-300">
            <p>
              AI Tutor requires a roadmap.sh account and is not available in this local clone.
            </p>
            <p className="mt-2">
              Visit{' '}
              <a
                href="https://roadmap.sh/ai-engineer"
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                roadmap.sh/ai-engineer
              </a>{' '}
              to use the full AI Tutor experience.
            </p>
          </div>

          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about AI Engineering..."
              disabled
              className="flex-1 rounded-lg border border-border bg-bg-primary px-4 py-2.5 text-sm text-gray-400 outline-none"
            />
            <button
              type="submit"
              disabled
              className="flex items-center gap-2 rounded-lg bg-accent/50 px-4 py-2.5 text-sm font-medium text-white/70"
            >
              <Send size={16} />
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
