import roadmapData from '../data/ai-engineer.json'
import { extractRichText } from '../lib/extractText'
import { RoadmapCanvas } from '../components/roadmap/RoadmapCanvas'
import { FAQ } from '../components/ui/FAQ'
import type { RoadmapData } from '../types/roadmap'

const data = roadmapData as RoadmapData

export function RoadmapPage() {
  const intro = data.questions.find((q) => q.type === 'main')

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <RoadmapCanvas />

      {intro && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white">{intro.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-300 sm:text-base">
            {extractRichText(intro.description)}
          </p>
        </section>
      )}

      <FAQ questions={data.questions} />
    </div>
  )
}
