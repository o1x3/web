import type { Metadata } from 'next'
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
    <>
      <header className="page-header">
        <h1 className="page-title">stuff</h1>
        <p className="page-intro">
          Things I build when nobody asked. Mostly terminal-shaped, usually
          shipped before they&apos;re finished. Half of these started as a
          joke.
        </p>
      </header>
      <AllBuildsSections />
      <UpstreamSection contributions={contributions} />
    </>
  )
}
