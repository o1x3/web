import type { Metadata } from 'next'
import Link from 'next/link'
import { AppChrome } from '../components/layout/AppChrome'
import { NotesIndex } from '../components/sections/HomeSections'

export const metadata: Metadata = {
  title: 'notes | Karthik Vinayan',
  description: 'Notes and writing by Karthik Vinayan.',
  alternates: { canonical: '/notes' },
}

export default function NotesIndexPage() {
  return (
    <AppChrome>
      <header className="page-header">
        <h1 className="page-title">notes</h1>
        <p className="page-intro">
          short writing on agents, tools, and shipping. newest first.
        </p>
      </header>
      <NotesIndex />
      <p className="back-row">
        <Link href="/" className="back-link">
          ← back
        </Link>
      </p>
    </AppChrome>
  )
}
