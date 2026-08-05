'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '../ui/ThemeToggle'

const LINKS = [
  { href: '/', label: 'index' },
  { href: '/notes', label: 'notes' },
  { href: '/stuff', label: 'stuff' },
  { href: '/story', label: 'story' },
] as const

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="nav" aria-label="Main">
      <Link href="/" className="nav-brand">
        <span className="nav-mark" aria-hidden="true">
          ⠶
        </span>
        o1x3
      </Link>
      <div className="nav-links">
        {LINKS.map(({ href, label }) => {
          const current =
            href === '/'
              ? pathname === '/'
              : pathname === href || pathname.startsWith(`${href}/`)
          return (
            <Link
              key={href}
              href={href}
              className="nav-link"
              aria-current={current ? 'page' : undefined}
            >
              {label}
            </Link>
          )
        })}
        <ThemeToggle />
      </div>
    </nav>
  )
}
