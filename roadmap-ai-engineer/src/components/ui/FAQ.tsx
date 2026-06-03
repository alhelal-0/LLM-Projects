import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { extractRichText } from '../../lib/extractText'
import type { RoadmapQuestion } from '../../types/roadmap'

interface FAQProps {
  questions: RoadmapQuestion[]
}

export function FAQ({ questions }: FAQProps) {
  const faqItems = questions.filter((q) => q.type === 'faq')
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?._id ?? null)

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
      <div className="mt-4 divide-y divide-border rounded-xl border border-border bg-bg-secondary">
        {faqItems.map((item) => {
          const id = item._id ?? item.title
          const isOpen = openId === id
          return (
            <div key={id}>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-bg-card"
              >
                <span className="font-medium text-white">{item.title}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-text-muted transition ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-4 text-sm leading-relaxed text-gray-300">
                  {extractRichText(item.description)}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
