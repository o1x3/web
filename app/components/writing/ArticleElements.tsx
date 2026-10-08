import type { ReactNode } from 'react'

export function PullQuote({ children }: { children: ReactNode }) { return <blockquote className="pull-quote">{children}</blockquote> }
export function Callout({ kind = 'note', children }: { kind?: 'note' | 'warning'; children: ReactNode }) { return <aside className={`article-callout article-callout-${kind}`}><span className="article-chip">{kind}</span><div>{children}</div></aside> }
export function Disclosure({ title, open, lines = 3, children }: { title: string; open?: boolean; lines?: number; children: ReactNode }) {
  return <details className="article-disclosure" open={open}><summary><span className="disclosure-box" aria-hidden="true" /><span>{title}</span><span className="disclosure-closed">░░░ {lines} lines</span><span className="disclosure-open">███ open</span></summary><div className="disclosure-content">{children}</div></details>
}
export function ArticleDivider() { return <div className="article-divider" role="separator"><span>░▒▓█</span></div> }
