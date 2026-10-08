import type { Metadata } from 'next'
import Link from 'next/link'
import { posts } from '../lib/posts'
import '../writing.css'

export const metadata: Metadata = {
  title: 'Writing — Karthik Vinayan',
  description: 'Notes on agents, infrastructure, and developer tools.',
  robots: { index: posts.length > 0, follow: true, googleBot: { index: posts.length > 0, follow: true } },
  alternates: { canonical: '/writing', types: { 'application/rss+xml': '/writing/rss.xml' } },
}

export default function WritingPage() {
  return <main id="main-content" className="site-page writing-page">
    <div className="writing-title"><span className="writing-mark" aria-hidden="true" /><h1>writing</h1></div>
    {posts.length === 0 && <span className="writing-soon">soon</span>}
    {posts.length > 0 && <ul className="writing-posts">{posts.map(post => <li key={post.slug}><Link href={`/writing/${post.slug}`}><span>{post.date}</span><strong>{post.title}</strong></Link></li>)}</ul>}
  </main>
}
