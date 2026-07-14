'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PERSONAL_INFO } from '../../data'
import { ThemeToggle } from '../ui/ThemeToggle'

const LINKS = [
  { href: '/', label: 'index' },
  { href: '/stuff', label: 'stuff' },
  { href: '/story', label: 'story' },
] as const

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="nav" aria-label="Main">
      <div className="nav-left">
        <Link href="/" className="nav-brand">
          <span className="nav-spinner" aria-hidden="true">
            ⠶
          </span>
          o1x3
        </Link>
        <div className="nav-say-hi">
          say hi:{' '}
          <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
          {' · '}
          <a href={PERSONAL_INFO.x.url} target="_blank" rel="noopener noreferrer">
            dm {PERSONAL_INFO.x.display}
          </a>
          {' · '}
          <a href={PERSONAL_INFO.github.url} target="_blank" rel="noopener noreferrer">
            github/o1x3
          </a>
        </div>
      </div>
      <div className="nav-links">
        {LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="nav-link"
            aria-current={pathname === href ? 'page' : undefined}
          >
            {label}
          </Link>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  )
}
