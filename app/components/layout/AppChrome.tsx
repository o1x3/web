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
      <div className="main-col">
        <Nav />
        <main>{children}</main>
        <Footer />
      </div>
      {rail}
    </div>
  )
}
