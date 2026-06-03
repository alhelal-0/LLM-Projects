import { Header } from './Header'
import { Hero } from './Hero'
import { TabBar } from './TabBar'
import { CommunitySection } from './CommunitySection'
import { Footer } from './Footer'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <Hero />
      <TabBar />
      <main className="flex-1">{children}</main>
      <CommunitySection />
      <Footer />
    </div>
  )
}
