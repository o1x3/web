'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getNote } from '../../lib/notes'

const CRUMBS: Record<string, string> = {
  '/': 'Home',
  '/stuff': 'Stuff',
  '/story': 'Story',
  '/notes': 'Notes',
}

function crumbFor(pathname: string): { href: string; label: string }[] {
  if (pathname === '/') return [{ href: '/', label: 'Home' }]

  const parts: { href: string; label: string }[] = [
    { href: '/', label: 'Home' },
  ]

  if (pathname.startsWith('/notes/')) {
    parts.push({ href: '/notes', label: 'Notes' })
    const slug = decodeURIComponent(pathname.slice('/notes/'.length))
    const note = getNote(slug)
    parts.push({
      href: pathname,
      label: note?.title ?? slug.replace(/-/g, ' '),
    })
    return parts
  }

  const label = CRUMBS[pathname]
  if (label) {
    parts.push({ href: pathname, label })
  }

  return parts
}

export function Nav() {
  const pathname = usePathname()
  const crumbs = crumbFor(pathname)

  return (
    <header className="nav" aria-label="Navigation">
      <h2 className="nav-label">Navigation</h2>
      <h2 className="nav-crumb">
        <span aria-hidden="true">~</span>
        {crumbs.map((crumb, i) => (
          <span key={crumb.href}>
            <span className="nav-sep" aria-hidden="true">
              {' '}
              /{' '}
            </span>
            {i === crumbs.length - 1 ? (
              <span aria-current="page">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} title={crumb.label}>
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </h2>
    </header>
  )
}
