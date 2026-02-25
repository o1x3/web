import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>404</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Page not found</p>
        <Link href="/">← Back home</Link>
      </div>
    </main>
  )
}
