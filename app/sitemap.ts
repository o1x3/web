import type { MetadataRoute } from 'next'
import { getAllNotes } from './lib/notes'

export default function sitemap(): MetadataRoute.Sitemap {
  const notes = getAllNotes().map((note) => ({
    url: `https://o1x3.com/notes/${note.slug}`,
    lastModified: new Date(note.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: 'https://o1x3.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://o1x3.com/notes',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://o1x3.com/stuff',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://o1x3.com/story',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...notes,
  ]
}
