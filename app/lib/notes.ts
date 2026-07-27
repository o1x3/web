// Notes / blog posts.
// Add entries here (or later wire this to MDX / a CMS). The homepage Notes
// table and /notes archive both read from this list.

export type Note = {
  slug: string
  title: string
  /** ISO date string, YYYY-MM-DD */
  date: string
  /** Plain paragraphs for now; swap for MDX when writing starts. */
  body: readonly string[]
}

/**
 * Reverse-chronological notes. Empty until the first post is written —
 * the UI already reserves the Notes section and /notes routes.
 */
export const NOTES: readonly Note[] = [
  // Example shape (uncomment when ready):
  // {
  //   slug: 'hello',
  //   title: 'Hello',
  //   date: '2026-07-27',
  //   body: ['First note.'],
  // },
]

export function getNote(slug: string): Note | undefined {
  return NOTES.find((n) => n.slug === slug)
}

export function getAllNotes(): readonly Note[] {
  return [...NOTES].sort((a, b) => (a.date < b.date ? 1 : -1))
}
