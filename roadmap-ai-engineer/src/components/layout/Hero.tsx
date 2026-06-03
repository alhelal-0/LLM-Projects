import roadmapData from '../../data/ai-engineer.json'
import type { RoadmapData } from '../../types/roadmap'

const data = roadmapData as RoadmapData

export function Hero() {
  const title = data.title.page
  const description = data.description.replace('@currentYear@', '2026')

  return (
    <section className="border-b border-border bg-bg-primary px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-base text-text-muted sm:text-lg">{description}</p>
      </div>
    </section>
  )
}
