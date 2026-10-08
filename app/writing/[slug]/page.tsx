import type { Metadata } from 'next'
import type { ComponentType } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header, Footer } from '../../components/layout'
import { ReadingProgress } from '../../components/writing/ReadingProgress'
import { posts, findPost, formatPostDate } from '../../lib/posts'
import '../../article.css'

// Import real MDX files here, then register each under its post's content key.
const articleContent: Record<string, ComponentType> = {}
type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export function generateStaticParams() { return posts.map(post => ({ slug: post.slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = findPost((await params).slug)
  return post ? {
    title: `${post.title} — Karthik Vinayan`, description: post.description,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: { title: post.title, description: post.description, url: `/writing/${post.slug}`, type: 'article', authors: ['Karthik Vinayan'] },
    twitter: { title: post.title, description: post.description },
  } : {}
}

export default async function ArticlePage({ params }: Props) {
  const post = findPost((await params).slug)
  if (!post || !articleContent[post.content]) notFound()
  const Content = articleContent[post.content]
  const index = posts.findIndex(item => item.slug === post.slug)
  const older = posts[index + 1], newer = posts[index - 1]
  return <div className="site-page post-page">
    <ReadingProgress /><Header variant="post" />
    <main id="main-content" className="article-main">
      <header className="article-heading"><p className="article-meta">{formatPostDate(post.date)} · {post.category} · {post.minutes} min</p><h1>{post.title}</h1><p className="article-description">{post.description}</p></header>
      <div className="article-layout"><article className="article-prose" aria-label={post.title}><Content /></article></div>
    </main>
    <nav className="article-navigation" aria-label="More writing">{older && <Link href={`/writing/${older.slug}`} className="article-older"><span>← older</span><strong>{older.title}</strong></Link>}{newer && <Link href={`/writing/${newer.slug}`} className="article-newer"><span>newer →</span><strong>{newer.title}</strong></Link>}</nav>
    <Footer variant="post" />
  </div>
}
