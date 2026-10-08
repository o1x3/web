import type { Metadata } from 'next'
import { headers } from 'next/headers'
import localFont from 'next/font/local'
import { FaviconInit } from './components/FaviconInit'
import './globals.css'
import './home.css'

// Force dynamic rendering for CSP nonces
export const dynamic = 'force-dynamic'

const paperMono = localFont({
  src: './fonts/PaperMonoVF.woff2',
  weight: '100 800',
  variable: '--font-mono',
  display: 'swap',
  preload: true,
  fallback: ['Menlo', 'Consolas', 'monospace'],
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: 'Karthik Vinayan | Applied AI Engineer at Clueso',
  description: 'Applied AI Engineer at Clueso (YC W23). Previously Founding AI Engineer at Omni RPA — built the backend for a production AI cloud automation platform: multi-agent orchestrator, knowledge graph infra, MCP tooling, semantic memory. Python, Go, Rust.',
  keywords: ['Applied AI Engineer', 'Clueso', 'LLM Agents', 'Knowledge Graphs', 'MCP Protocol', 'Multi-Agent Systems', 'Python', 'Go', 'Rust', 'FalkorDB', 'FastAPI'],
  authors: [{ name: 'Karthik Vinayan' }],
  creator: 'Karthik Vinayan',
  publisher: 'Karthik Vinayan',
  metadataBase: new URL('https://o1x3.com'),
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/writing/rss.xml' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://o1x3.com',
    title: 'Karthik Vinayan | Applied AI Engineer at Clueso',
    description: 'Applied AI Engineer at Clueso (YC W23). Previously Founding AI Engineer at Omni RPA — built the backend for a production AI cloud automation platform: multi-agent orchestrator, knowledge graph infra, MCP tooling, semantic memory.',
    siteName: 'Karthik Vinayan Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karthik Vinayan | Applied AI Engineer at Clueso',
    description: 'Applied AI Engineer at Clueso (YC W23). Previously Founding AI Engineer at Omni RPA — built the backend for a production AI cloud automation platform: multi-agent orchestrator, knowledge graph infra, MCP tooling, semantic memory.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const nonce = (await headers()).get('x-nonce') ?? ''

  return (
    <html lang="en" className={paperMono.variable} suppressHydrationWarning>
      <head>
        <script
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){var t;try{t=localStorage.getItem('theme')}catch(e){}document.documentElement.classList.toggle('dark',t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches))})()`,
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">skip to content</a>
        <FaviconInit />
        {children}
      </body>
    </html>
  )
}
