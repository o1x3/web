'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/', label: 'index' },
  { href: '/stuff', label: 'stuff' },
  { href: '/story', label: 'story' },
] as const

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="nav" aria-label="Main">
      <Link href="/" className="nav-brand">
        <span className="nav-spinner" aria-hidden="true">
          ⠶
        </span>
        o1x3
      </Link>
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
      </div>
    </nav>
  )
}
