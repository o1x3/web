import Link from 'next/link'
import { ThemeToggle } from '../ui/ThemeToggle'

export function Header({ variant = 'home' }: { variant?: 'home' | 'post' | 'error' }) {
  return (
    <header className={`site-header site-header--${variant}`}>
      <Link className="site-name" href="/">karthik vinayan</Link>
      {variant !== 'error' && <div className="site-header-center">
        {variant === 'home' ? 'applied ai engineer · bengaluru' : <Link href="/writing">← writing</Link>}
      </div>}
      <div className="site-header-actions">
        {variant !== 'post' && <Link className="writing-link" href="/writing">writing →</Link>}
        <ThemeToggle />
      </div>
    </header>
  )
}
