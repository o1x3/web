'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PERSONAL_INFO, SUMMARY } from '../../data'
import { TaglineRotator } from '../sections/Hero'
import { ThemeToggle } from '../ui/ThemeToggle'

const LINKS = [
  { href: '/', label: 'index' },
  { href: '/stuff', label: 'stuff' },
  { href: '/story', label: 'story' },
] as const

// Desktop-only sticky identity column. Hidden below 1100px, where the top
// nav and in-page hero take over.
export function Rail() {
  const pathname = usePathname()

  return (
    <aside className="rail">
      <div className="rail-top">
        <Link href="/" className="nav-brand">
          <span className="nav-spinner" aria-hidden="true">
            ⠶
          </span>
          o1x3
        </Link>
        <ThemeToggle />
      </div>

      <p className="rail-name">{PERSONAL_INFO.name}</p>
      <TaglineRotator />
      <p className="rail-bio">{SUMMARY}</p>

      <nav className="rail-nav" aria-label="Main">
        {LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? 'page' : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="rail-meta">
        <span>{PERSONAL_INFO.location}</span>
        <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
        <a href={PERSONAL_INFO.github.url} target="_blank" rel="noopener noreferrer">
          github/o1x3
        </a>
        <a href={PERSONAL_INFO.x.url} target="_blank" rel="noopener noreferrer">
          {PERSONAL_INFO.x.display}
        </a>
        <a href={PERSONAL_INFO.linkedin.url} target="_blank" rel="noopener noreferrer">
          linkedin
        </a>
      </div>
    </aside>
  )
}
