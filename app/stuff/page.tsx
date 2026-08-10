import type { Metadata } from 'next'
import { AppChrome } from '../components/layout/AppChrome'
import { AllBuildsSections } from '../components/sections/Builds'
import { NotesRail } from '../components/sections/HomeSections'
import { UpstreamSection } from '../components/sections/Upstream'
import { fetchOSSContributions } from '../lib/github'

export const metadata: Metadata = {
  title: 'stuff | karthik vinayan',
  description:
    'Side projects and random stuff I build: CLIs, agents, clients, apps. Mostly terminal-shaped.',
  alternates: { canonical: '/stuff' },
}

export default async function StuffPage() {
  const contributions = await fetchOSSContributions()

  return (
    <AppChrome rail={<NotesRail />}>
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
