import type { Metadata } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ErrorBoundary } from './error-boundary'
import { FaviconInit } from './components/FaviconInit'
import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import './globals.css'

export const dynamic = 'force-dynamic'

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display-loaded',
  display: 'swap',
  preload: true,
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans-loaded',
  display: 'swap',
  preload: true,
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-loaded',
  display: 'swap',
  preload: true,
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
  themeColor: '#f3f2ee',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <FaviconInit />
        <ErrorBoundary>
          <div className="site">
            <Nav />
            <main>{children}</main>
            <Footer />
          </div>
        </ErrorBoundary>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
