const STORAGE_KEY = 'roadmap-progress-ai-engineer'

export function loadProgress(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    return new Set(JSON.parse(raw) as string[])
  } catch {
    return new Set()
  }
}

export function saveProgress(ids: Set<string>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
}

export function toggleProgress(id: string): Set<string> {
  const current = loadProgress()
  if (current.has(id)) {
    current.delete(id)
  } else {
    current.add(id)
  }
  saveProgress(current)
  return current
}
