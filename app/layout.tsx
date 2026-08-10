import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ErrorBoundary } from './error-boundary'
import { FaviconInit } from './components/FaviconInit'
import './globals.css'

export const dynamic = 'force-dynamic'

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans-loaded',
  display: 'swap',
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-loaded',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'karthik vinayan | applied ai engineer at clueso',
  description:
    'applied ai engineer at clueso (yc w23). previously founding ai engineer at omni rpa, where i built the backend for a production ai cloud automation platform: multi-agent orchestrator, knowledge graph infra, mcp tooling, semantic memory. python, go, rust.',
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
    title: 'karthik vinayan | applied ai engineer at clueso',
    description:
      'applied ai engineer at clueso (yc w23). previously founding ai engineer at omni rpa, where i built the backend for a production ai cloud automation platform: multi-agent orchestrator, knowledge graph infra, mcp tooling, semantic memory.',
    siteName: 'karthik vinayan',
  },
  twitter: {
    card: 'summary',
    site: '@pawnsloth',
    creator: '@pawnsloth',
    title: 'karthik vinayan | applied ai engineer at clueso',
    description:
      'applied ai engineer at clueso (yc w23). previously founding ai engineer at omni rpa, where i built the backend for a production ai cloud automation platform: multi-agent orchestrator, knowledge graph infra, mcp tooling, semantic memory.',
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
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const nonce = (await headers()).get('x-nonce') ?? ''

  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');var dark=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.classList.toggle('dark',dark)})()`,
          }}
        />
      </head>
      <body>
        <FaviconInit />
        <ErrorBoundary>
          <div className="site">{children}</div>
        </ErrorBoundary>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
