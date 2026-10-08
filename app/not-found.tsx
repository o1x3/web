import Link from 'next/link'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import './not-found.css'

export default function NotFound() {
  return (
    <div className="site-page not-found-page">
      <Header variant="error" />
      <main id="main-content" className="not-found-content">
        <h1 className="sr-only">404 — page not found</h1>
        <div className="not-found-digits" aria-hidden="true">
          <div className="not-found-digit not-found-thin">
            <span className="not-found-number">4</span>
            <span className="not-found-weight">100</span>
          </div>
          <div className="not-found-digit not-found-zero">
            <span className="not-found-number">0</span>
            <span className="not-found-weight">0 · nothing<span className="not-found-desktop-copy"> here</span></span>
          </div>
          <div className="not-found-digit not-found-heavy">
            <span className="not-found-number">4</span>
            <span className="not-found-weight">800</span>
          </div>
        </div>
        <nav className="not-found-links" aria-label="Find your way back">
          <Link href="/">← back to the sentence</Link>
          <Link href="/writing">writing →</Link>
        </nav>
      </main>
      <Footer variant="error" />
    </div>
  )
}
