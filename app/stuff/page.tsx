import type { Metadata } from 'next'
import { AppChrome } from '../components/layout/AppChrome'
import { AllBuildsSections } from '../components/sections/Builds'
import { UpstreamSection } from '../components/sections/Upstream'
import { fetchOSSContributions } from '../lib/github'

export const metadata: Metadata = {
  title: 'stuff | Karthik Vinayan',
  description:
    'Side projects and random stuff I build: CLIs, agents, clients, apps. Mostly terminal-shaped.',
  alternates: { canonical: '/stuff' },
}

export default async function StuffPage() {
  const contributions = await fetchOSSContributions()

  return (
    <AppChrome>
      <header className="page-header">
        <h1 className="page-title">stuff</h1>
        <p className="page-intro">
          by day i build ai at clueso. this page is the rest: things i build
          when nobody asked, mostly terminal-shaped. half of these started as
          a joke.
        </p>
      </header>
      <AllBuildsSections />
      <UpstreamSection contributions={contributions} />
    </AppChrome>
  )
}
