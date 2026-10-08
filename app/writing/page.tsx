import type { Metadata } from 'next'
import { Header, Footer } from '../components/layout'
import { WritingIndex } from '../components/writing/WritingIndex'
import { posts } from '../lib/posts'
import '../writing.css'

const hasPublishedPosts = posts.some(post => !post.sample)

export const metadata: Metadata = {
  title: 'Writing — Karthik Vinayan', description: 'Notes on agents, infrastructure, and developer tools.',
  robots: { index: hasPublishedPosts, follow: true, googleBot: { index: hasPublishedPosts, follow: true } },
  alternates: { canonical: '/writing', types: { 'application/rss+xml': '/writing/rss.xml' } },
  openGraph: { title: 'Writing — Karthik Vinayan', description: 'Notes on agents, infrastructure, and developer tools.', url: '/writing', type: 'website' },
  twitter: { title: 'Writing — Karthik Vinayan', description: 'Notes on agents, infrastructure, and developer tools.' },
}

export default function WritingPage() {
  return <div className="site-page writing-page"><Header variant="writing" /><main id="main-content"><WritingIndex posts={posts} /></main><Footer variant="writing" /></div>
}
