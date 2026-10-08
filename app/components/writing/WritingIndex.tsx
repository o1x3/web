'use client'

import Link from 'next/link'
import { useState } from 'react'
import { formatPostDate, type Post } from '../../lib/posts'

const categories = ['all', 'agents', 'infra', 'dev tools'] as const

export function WritingIndex({ posts }: { posts: Post[] }) {
  const [category, setCategory] = useState<(typeof categories)[number]>('all')
  const visible = posts.filter(post => category === 'all' || post.category === category)
  return <>
    <div className="writing-heading">
      <div className="writing-title"><span className="writing-mark" aria-hidden="true" /><h1>writing</h1></div>
      <nav className="writing-filters" aria-label="Filter writing">
        {categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
      </nav>
    </div>
    <div className="writing-list" aria-live="polite">
      {visible.length ? visible.map(post => <Link key={post.slug} href={`/writing/${post.slug}`} className="writing-row" style={{ '--post-weight': post.weight } as React.CSSProperties}>
        <span className="writing-row-date">{formatPostDate(post.date)}</span>
        <span className="writing-row-content"><span className="writing-row-title">{post.title}<span className="writing-row-arrow" aria-hidden="true"> →</span></span><span className="writing-row-preview">{post.description}</span></span>
        <span className="writing-row-category">{post.category}</span><span className="writing-row-time">{post.minutes} min</span>
        <span className="writing-row-mobile-meta">{formatPostDate(post.date)} · {post.category} · {post.minutes} min</span>
      </Link>) : <WritingEmpty hasPosts={posts.length > 0} />}
    </div>
  </>
}

export function WritingEmpty({ hasPosts = false }: { hasPosts?: boolean }) {
  return <div className="writing-empty"><div className="writing-empty-row"><span className="writing-row-date">2026 · ··</span><span className="writing-empty-title">{hasPosts ? 'nothing here yet' : 'the first one is being written'}<span className="writing-cursor" aria-hidden="true" /></span><span className="writing-row-time">— min</span></div><p>rss works already · it&apos;ll show up there first</p></div>
}
