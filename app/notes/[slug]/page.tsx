import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllNotes, getNote } from '../../lib/notes'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const note = getNote(slug)
  if (!note) return { title: 'Note not found' }
  return {
    title: `${note.title} | Karthik Vinayan`,
    description: note.body[0] ?? note.title,
    alternates: { canonical: `/notes/${note.slug}` },
  }
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params
  const note = getNote(slug)
  if (!note) notFound()

  return (
    <article>
      <h1 className="page-title">{note.title}</h1>
      <p className="note-meta">
        <time dateTime={note.date}>{note.date}</time>
      </p>
      <div className="note-body">
        {note.body.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
      <p className="back-row">
        <Link href="/notes" className="back-link">
          ← notes
        </Link>
      </p>
    </article>
  )
}
