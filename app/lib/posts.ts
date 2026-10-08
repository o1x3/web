export type PostCategory = 'agents' | 'infra' | 'dev tools' | 'meta'
export type Post = {
  slug: string
  title: string
  date: string
  category: PostCategory
  minutes: number
  weight: number
  description: string
  /** These are the sample articles supplied by the Paper design, for review. */
  sample: boolean
  content: 'extraction' | 'reference' | 'draft'
}

export const posts: Post[] = [
  { slug: 'five-weeks-into-mcp', title: 'five weeks into mcp: gating tools before they gate you', date: '2026-10', category: 'agents', minutes: 9, weight: 800, description: 'a sample title from the design. the article is being written.', sample: true, content: 'draft' },
  { slug: 'route-by-task-not-by-model', title: 'route by task, not by model', date: '2026-08', category: 'agents', minutes: 6, weight: 700, description: 'a sample title from the design. the article is being written.', sample: true, content: 'draft' },
  { slug: 'a-dag-is-not-an-agent', title: 'a dag is not an agent', date: '2026-06', category: 'agents', minutes: 7, weight: 600, description: 'a sample title from the design. the article is being written.', sample: true, content: 'draft' },
  { slug: 'entity-extraction-without-an-llm-call', title: 'entity extraction without an llm call', date: '2026-04', category: 'infra', minutes: 11, weight: 500, description: "most entities in a document don't need a frontier model to find them. a small onnx model on the ingest path, and when to still escalate.", sample: true, content: 'extraction' },
  { slug: 'what-landing-a-ruff-rule-taught-me', title: 'what landing a ruff rule taught me', date: '2026-02', category: 'dev tools', minutes: 5, weight: 400, description: 'a sample title from the design. the article is being written.', sample: true, content: 'draft' },
  { slug: 'dev-environments-should-be-one-command', title: 'dev environments should be one command', date: '2025-12', category: 'infra', minutes: 8, weight: 200, description: 'a sample title from the design. the article is being written.', sample: true, content: 'draft' },
]

export const referencePost: Post = {
  slug: 'everything-this-page-can-render', title: 'everything this page can render', date: '2026-10', category: 'meta', minutes: 6, weight: 800,
  description: 'a reference post. every markdown block the blog supports, and three mermaid diagrams drawn in the same ink as the text.', sample: true, content: 'reference',
}

export const allPosts = [...posts, referencePost]
export const findPost = (slug: string) => allPosts.find(post => post.slug === slug)
export const formatPostDate = (date: string) => date.replace('-', ' · ')
