import type { RichTextDoc } from '../types/roadmap'

export function extractRichText(description: RichTextDoc | string | undefined): string {
  if (!description) return ''
  if (typeof description === 'string') return description

  const parts: string[] = []
  for (const block of description.content ?? []) {
    if (block.type === 'paragraph') {
      for (const child of block.content ?? []) {
        if (child.type === 'text' && child.text) {
          parts.push(child.text)
        }
      }
    }
  }
  return parts.join(' ')
}
