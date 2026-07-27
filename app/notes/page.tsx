import type { Metadata } from 'next'
import Link from 'next/link'
import { NotesSection } from '../components/sections/DocumentHome'

export const metadata: Metadata = {
  title: 'Notes | Karthik Vinayan',
  description: 'Notes and writing by Karthik Vinayan.',
  alternates: { canonical: '/notes' },
}

export default function NotesIndexPage() {
  return (
    <>
      <h1 className="page-title">Notes Index</h1>
      <p className="page-intro">
        Writing goes here. The archive is wired up — add a post in{' '}
        <code>app/lib/notes.ts</code> and it will show on the homepage and
        below.
      </p>
      <NotesSection />
      <p className="back-row">
        <Link href="/" className="btn btn-read">
          ← Back to Home
        </Link>
      </p>
    </>
  )
}
