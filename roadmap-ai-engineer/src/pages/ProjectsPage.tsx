import { useState } from 'react'

const filters = ['beginner', 'intermediate', 'advanced'] as const

const projects = [
  {
    level: 'beginner' as const,
    title: 'Build a Chatbot with OpenAI',
    description:
      'Create a simple terminal chatbot using the OpenAI API and Python. Learn prompt basics and API integration.',
  },
  {
    level: 'intermediate' as const,
    title: 'LLMs — OpenAI API in Python',
    description:
      'Call OpenAI models directly from Python, beyond the ChatGPT interface. Handle streaming, tokens, and errors.',
  },
  {
    level: 'advanced' as const,
    title: 'RAG Pipeline with Vector DB',
    description:
      'Build a retrieval-augmented generation system using embeddings, a vector database, and an LLM for Q&A over documents.',
  },
]

export function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>('intermediate')

  const filtered = projects.filter((p) => p.level === activeFilter)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-white sm:text-3xl">AI Engineer Projects</h1>
      <p className="mt-2 text-text-muted">
        Project ideas to take you from beginner to advanced in AI Engineering
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => setActiveFilter(level)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition ${
              activeFilter === level
                ? 'bg-accent text-white'
                : 'border border-border text-text-muted hover:text-white'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <article
            key={project.title}
            className="rounded-xl border border-border bg-bg-secondary p-5 transition hover:border-accent/50"
          >
            <span className="inline-block rounded-full bg-bg-card px-2.5 py-0.5 text-xs capitalize text-accent">
              {project.level}
            </span>
            <h2 className="mt-3 text-lg font-semibold text-white">{project.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-300">{project.description}</p>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-text-muted">No projects for this level in the local clone.</p>
      )}
    </div>
  )
}
