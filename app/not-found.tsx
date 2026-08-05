import Link from 'next/link'
import { AppChrome } from './components/layout/AppChrome'

export default function NotFound() {
  return (
    <AppChrome>
      <header className="page-header">
        <h1 className="page-title">404</h1>
        <p className="page-intro">page not found</p>
      </header>
      <p className="back-row">
        <Link href="/" className="back-link">
          ← back home
        </Link>
      </p>
    </AppChrome>
  )
}
