'use client'
import { PERSONAL_INFO } from '../../data'
import { VisitorDrawer } from '../home/VisitorDrawer'

export function Footer({ variant = 'home' }: { variant?: 'home' | 'post' | 'error' }) {
  return (
    <><footer className={`site-footer site-footer--${variant}`}>
      <button type="button" className="visitor-trigger" onClick={() => window.dispatchEvent(new Event('open-visitor'))}>
        <span className="visitor-mark" aria-hidden="true">░▒▓█</span>
        <span className="visitor-copy">you are read at every weight<span className="visitor-copy-desktop">, never stored</span></span>
      </button>
      <nav className="footer-socials" aria-label="Social links">
        {variant === 'post' && <><a href="/writing/rss.xml">rss</a><span aria-hidden="true">{' // '}</span></>}
        <a href="https://x.com/pawnsloth" target="_blank" rel="noopener noreferrer">x</a>
        <span aria-hidden="true">{' // '}</span>
        <a href={PERSONAL_INFO.github.url} target="_blank" rel="noopener noreferrer">github</a>
        <span aria-hidden="true">{' // '}</span>
        <a href={PERSONAL_INFO.linkedin.url} target="_blank" rel="noopener noreferrer">linkedin</a>
        <span aria-hidden="true">{' // '}</span>
        <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
      </nav>
    </footer><VisitorDrawer /></>
  )
}
