import { MessageCircle, Star, Users } from 'lucide-react'

const stats = [
  {
    icon: Star,
    value: '356K',
    label: 'GitHub Stars',
    cta: 'Star us on GitHub',
    href: 'https://github.com/kamranahmedse/developer-roadmap',
    sub: 'Help us reach #1',
  },
  {
    icon: Users,
    value: '2.8M',
    label: 'Registered Users',
    cta: 'Register yourself',
    href: 'https://roadmap.sh/signup',
    sub: 'Commit to your growth',
  },
  {
    icon: MessageCircle,
    value: '48K',
    label: 'Discord Members',
    cta: 'Join on Discord',
    href: 'https://roadmap.sh/discord',
    sub: 'Join the community',
  },
]

export function CommunitySection() {
  return (
    <section className="border-t border-border bg-bg-secondary px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-2xl font-bold text-white">Join the Community</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-text-muted">
          roadmap.sh is the 6th most starred project on GitHub and is visited by hundreds of
          thousands of developers every month.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-bg-card p-6 text-center"
            >
              <stat.icon className="mx-auto text-accent" size={28} />
              <div className="mt-3 text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-text-muted">{stat.label}</div>
              <a
                href={stat.href}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:brightness-110"
              >
                {stat.cta}
              </a>
              <p className="mt-2 text-xs text-text-muted">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
