import type { Metadata } from 'next'
import Link from 'next/link'
import { AllBuildsSections } from '../components/sections/Builds'
import { UpstreamSection } from '../components/sections/Upstream'
import { fetchOSSContributions } from '../lib/github'

export const metadata: Metadata = {
  title: 'Stuff | Karthik Vinayan',
  description:
    'Side projects and random stuff I build: CLIs, agents, clients, apps. Mostly terminal-shaped.',
  alternates: { canonical: '/stuff' },
}

export default async function StuffPage() {
  const contributions = await fetchOSSContributions()

  return (
    <>
      <h1 className="page-title">Stuff</h1>
      <p className="page-intro">
        By day I build AI at Clueso. This page is the rest: things I build when
        nobody asked, mostly terminal-shaped. Half of these started as a joke.
      </p>
      <AllBuildsSections />
      <UpstreamSection contributions={contributions} />
      <p className="back-row">
        <Link href="/" className="back-link">
          ← back
        </Link>
      </p>
    </>
  )
}
