import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header, Footer } from '../../components/layout'
import { ReadingProgress } from '../../components/writing/ReadingProgress'
import { allPosts, posts, findPost, formatPostDate } from '../../lib/posts'
import Extraction from '../content/extraction.mdx'
import Reference from '../content/reference.mdx'
import Draft from '../content/draft.mdx'
import '../../writing.css'

const articleContent = { extraction: Extraction, reference: Reference, draft: Draft }
type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export function generateStaticParams() { return allPosts.map(post => ({ slug: post.slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = findPost((await params).slug)
  return post ? {
    title: `${post.title} — Karthik Vinayan`, description: post.description,
    robots: { index: !post.sample, follow: true, googleBot: { index: !post.sample, follow: true } },
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: { title: post.title, description: post.description, url: `/writing/${post.slug}`, type: 'article', authors: ['Karthik Vinayan'] },
    twitter: { title: post.title, description: post.description },
  } : {}
}

export default async function ArticlePage({ params }: Props) {
  const post = findPost((await params).slug)
  if (!post) notFound()
  const Content = articleContent[post.content]
  const index = posts.findIndex(item => item.slug === post.slug)
  const older = post.content === 'reference' ? posts[4] : posts[index + 1]
  const newer = post.content === 'reference' ? posts[2] : posts[index - 1]
  return <div className={`site-page post-page${post.content === 'reference' ? ' reference-post' : ''}${post.content === 'extraction' ? ' extraction-post' : ''}`}>
    <ReadingProgress /><Header variant="post" />
    <main id="main-content" className="article-main">
      <header className="article-heading"><p className="article-meta">{formatPostDate(post.date)} · {post.category} · {post.minutes} min</p><h1>{post.title}</h1><p className="article-description">{post.description === 'a sample title from the design. the article is being written.' ? 'a sample title from the design. the article is being written.' : <>{post.content === 'extraction' ? <>most entities in a document don&apos;t need a frontier model to find them.<span className="article-desktop-detail"> a small onnx model on the ingest path, and when to still escalate.</span></> : post.description}</>}</p></header>
      <div className="article-layout"><article className="article-prose" aria-label={post.title}><Content /></article>{post.content === 'extraction' && <aside className="article-sidenotes" aria-label="Article notes"><p>¹ gliner, exported to onnx. runs on cpu next to the consumer.</p><p>² seven stages on nats jetstream. this post only covers one.</p></aside>}</div>
    </main>
    <nav className="article-navigation" aria-label="More writing">{older && <Link href={`/writing/${older.slug}`} className="article-older"><span>← older</span><strong style={{ fontWeight: older.weight }}>{older.title}</strong></Link>}{newer && <Link href={`/writing/${newer.slug}`} className="article-newer"><span>newer →</span><strong style={{ fontWeight: newer.weight }}>{newer.title}</strong></Link>}</nav>
    <Footer variant="post" />
  </div>
}
