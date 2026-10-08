'use client'
import Link from 'next/link'
import { PERSONAL_INFO } from '../../data'

export function Footer({ variant = 'home' }: { variant?: 'home' | 'writing' | 'post' | 'error' }) {
  const writing = variant === 'writing' || variant === 'post'
  return (
    <footer className={`site-footer site-footer--${variant}`}>
      {variant === 'writing' ? <a className="visitor-trigger writing-rss" href="/writing/rss.xml"><span className="visitor-mark" aria-hidden="true">░▒▓█</span><span className="visitor-copy">rss</span></a> : <button type="button" className="visitor-trigger" onClick={() => window.dispatchEvent(new Event('open-visitor'))}>
        <span className="visitor-mark" aria-hidden="true">░▒▓█</span>
        <span className="visitor-copy">you are read at every weight<span className="visitor-copy-desktop">, never stored</span></span>
      </button>}
      <nav className="footer-socials" aria-label="Social links">
        {variant === 'post' && <><a href="/writing/rss.xml">rss</a><span aria-hidden="true"> · </span></>}
        {variant === 'writing' && <span className="footer-home"><Link href="/">← home</Link><span aria-hidden="true"> · </span></span>}
        <a href={PERSONAL_INFO.github.url} target="_blank" rel="noopener noreferrer">github</a>
        <span aria-hidden="true"> · </span>
        <a href={PERSONAL_INFO.linkedin.url} target="_blank" rel="noopener noreferrer">linkedin</a>
        {!writing && <><span aria-hidden="true"> · </span><a href="/cv.pdf">cv</a></>}
        <span aria-hidden="true"> · </span>
        <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
      </nav>
    </footer>
  )
}
