import Link from 'next/link'
import { ThemeToggle } from '../ui/ThemeToggle'

export function Header({ variant = 'home' }: { variant?: 'home' | 'writing' | 'post' | 'error' }) {
  const isIndex = variant === 'home' || variant === 'writing'
  return (
    <header className={`site-header site-header--${variant}`}>
      <Link className="site-name" href="/">karthik vinayan</Link>
      {variant !== 'error' && <div className="site-header-center">
        {isIndex ? 'applied ai engineer · bengaluru' : <Link href={variant === 'post' ? '/writing' : '/'}>{variant === 'post' ? '← writing' : '← home'}</Link>}
      </div>}
      <div className="site-header-actions">
        {(isIndex || variant === 'error') && <Link className={`writing-link${variant === 'writing' ? ' writing-link--active' : ''}`} href="/writing" aria-current={variant === 'writing' ? 'page' : undefined}>{variant === 'writing' ? 'writing' : 'writing →'}</Link>}
        <ThemeToggle />
      </div>
    </header>
  )
}
