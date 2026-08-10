import type { Metadata } from 'next'
import Link from 'next/link'
import { AppChrome } from '../components/layout/AppChrome'
import { NotesIndex, NotesRail } from '../components/sections/HomeSections'

export const metadata: Metadata = {
  title: 'notes | karthik vinayan',
  description: 'notes and writing by karthik vinayan.',
  alternates: { canonical: '/notes' },
}

export default function NotesIndexPage() {
  return (
    <AppChrome rail={<NotesRail />}>
      <header className="page-header">
        <h1 className="page-title">notes</h1>
        <p className="page-intro">
          short writing on agents, tools, and shipping. newest first.
        </p>
      </header>
      <NotesIndex />
      <p className="back-row">
        <Link href="/" className="back-link">
          ← home
        </Link>
      </p>
    </AppChrome>
  )
}
