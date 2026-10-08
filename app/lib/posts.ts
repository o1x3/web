export type Post = {
  slug: string
  title: string
  date: string
  category: 'agents' | 'infra' | 'dev tools' | 'meta'
  minutes: number
  description: string
  content: string
}

// Add publication metadata here and register the matching local MDX component.
export const posts: Post[] = []
export const findPost = (slug: string) => posts.find(post => post.slug === slug)
export const formatPostDate = (date: string) => date.replace('-', ' · ')
