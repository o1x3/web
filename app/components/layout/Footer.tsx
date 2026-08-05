import Link from 'next/link'
import { PERSONAL_INFO } from '../../data'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <span>
        © {year} {PERSONAL_INFO.name.toLowerCase()}
      </span>
      <span aria-hidden="true">·</span>
      <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
      <span aria-hidden="true">·</span>
      <a href={PERSONAL_INFO.github.url} target="_blank" rel="noopener noreferrer">
        github
      </a>
      <span aria-hidden="true">·</span>
      <a href={PERSONAL_INFO.x.url} target="_blank" rel="noopener noreferrer">
        {PERSONAL_INFO.x.display}
      </a>
      <span aria-hidden="true">·</span>
      <Link href="/notes">notes</Link>
    </footer>
  )
}
