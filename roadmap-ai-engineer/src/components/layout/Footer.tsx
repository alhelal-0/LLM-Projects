export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-primary px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm text-text-muted">
          Community created roadmaps, best practices, projects, articles, resources and journeys to
          help you choose your path and grow in your career.
        </p>
        <p className="mt-4 text-sm text-gray-400">
          Local clone inspired by{' '}
          <a
            href="https://roadmap.sh/ai-engineer"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            roadmap.sh
          </a>
          . Content from the open-source{' '}
          <a
            href="https://github.com/kamranahmedse/developer-roadmap"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            developer-roadmap
          </a>{' '}
          project.
        </p>
        <p className="mt-2 text-xs text-text-muted">
          © roadmap.sh ·{' '}
          <a href="https://roadmap.sh/terms" className="hover:text-white">
            Terms
          </a>{' '}
          ·{' '}
          <a href="https://roadmap.sh/privacy" className="hover:text-white">
            Privacy
          </a>
        </p>
      </div>
    </footer>
  )
}
