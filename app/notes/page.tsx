import type { Metadata } from 'next'
import Link from 'next/link'
import { NotesSection } from '../components/sections/HomeSections'

export const metadata: Metadata = {
  title: 'Notes | Karthik Vinayan',
  description: 'Notes and writing by Karthik Vinayan.',
  alternates: { canonical: '/notes' },
}

export default function NotesIndexPage() {
  return (
    <>
      <h1 className="page-title">Notes</h1>
      <p className="page-intro">
        Writing goes here. Posts will appear below and on the homepage Notes
        section.
      </p>
      <NotesSection />
      <p className="back-row">
        <Link href="/" className="back-link">
          ← back
        </Link>
      </p>
    </>
  )
}
