import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { IBM_Plex_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ErrorBoundary } from './error-boundary'
import { FaviconInit } from './components/FaviconInit'
import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import './globals.css'

export const dynamic = 'force-dynamic'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans-loaded',
  display: 'swap',
  preload: true,
  fallback: ['Univers', 'Helvetica Neue', 'Arial', 'sans-serif'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: 'Karthik Vinayan | Applied AI Engineer at Clueso',
  description:
    'Applied AI Engineer at Clueso (YC W23). Previously Founding AI Engineer at Omni RPA, where I built the backend for a production AI cloud automation platform: multi-agent orchestrator, knowledge graph infra, MCP tooling, semantic memory. Python, Go, Rust.',
  keywords: [
    'Applied AI Engineer',
    'Clueso',
    'LLM Agents',
    'Knowledge Graphs',
    'MCP Protocol',
    'Multi-Agent Systems',
    'Python',
    'Go',
    'Rust',
    'FalkorDB',
    'FastAPI',
  ],
  authors: [{ name: 'Karthik Vinayan' }],
  creator: 'Karthik Vinayan',
  publisher: 'Karthik Vinayan',
  metadataBase: new URL('https://o1x3.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://o1x3.com',
    title: 'Karthik Vinayan | Applied AI Engineer at Clueso',
    description:
      'Applied AI Engineer at Clueso (YC W23). Previously Founding AI Engineer at Omni RPA, where I built the backend for a production AI cloud automation platform: multi-agent orchestrator, knowledge graph infra, MCP tooling, semantic memory.',
    siteName: 'Karthik Vinayan',
  },
  twitter: {
    card: 'summary',
    site: '@pawnsloth',
    creator: '@pawnsloth',
    title: 'Karthik Vinayan | Applied AI Engineer at Clueso',
    description:
      'Applied AI Engineer at Clueso (YC W23). Previously Founding AI Engineer at Omni RPA, where I built the backend for a production AI cloud automation platform: multi-agent orchestrator, knowledge graph infra, MCP tooling, semantic memory.',
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
  themeColor: '#ffffff',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const nonce = (await headers()).get('x-nonce') ?? ''

  return (
    <html lang="en" className={ibmPlexSans.variable} suppressHydrationWarning>
      <body data-nonce={nonce || undefined}>
        <FaviconInit />
        <ErrorBoundary>
          <div className="site">
            <Nav />
            <main className="site-main">
              {children}
              <Footer />
            </main>
          </div>
        </ErrorBoundary>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
