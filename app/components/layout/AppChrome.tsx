import type { ReactNode } from 'react'
import { Nav } from './Nav'
import { Footer } from './Footer'

export function AppChrome({
  children,
  rail,
}: {
  children: ReactNode
  rail?: ReactNode
}) {
  return (
    <div className={`shell${rail ? ' shell-with-rail' : ''}`}>
      <a href="#main-content" className="skip-link">
        skip to content
      </a>
      <div className="main-col">
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
      </div>
      {rail}
    </div>
  )
}
