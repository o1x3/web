import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ErrorBoundary } from './error-boundary'
import { ThemeToggle } from './components/ui/ThemeToggle'
import { FaviconInit } from './components/FaviconInit'
import './globals.css'

// Force dynamic rendering for CSP nonces
export const dynamic = 'force-dynamic'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: true,
  fallback: ['Monaco', 'Consolas', 'monospace'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: 'Karthik Vinayan | Founding Software Engineer - AI/ML',
  description: 'Founding Software Engineer at Omni RPA Inc. Built the AI backend for a cloud automation platform — multi-agent orchestrator, knowledge graph infra, MCP tooling, semantic memory. Python, Go, Rust.',
  keywords: ['AI Platform Engineer', 'LLM Agents', 'Knowledge Graphs', 'MCP Protocol', 'Multi-Agent Systems', 'Python', 'Go', 'Rust', 'FalkorDB', 'FastAPI'],
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
    title: 'Karthik Vinayan | Founding Software Engineer - AI/ML',
    description: 'Founding Software Engineer at Omni RPA Inc. Built the AI backend for a cloud automation platform — multi-agent orchestrator, knowledge graph infra, MCP tooling, semantic memory.',
    siteName: 'Karthik Vinayan Portfolio',
  },
  twitter: {
    card: 'summary',
    title: 'Karthik Vinayan | Founding Software Engineer - AI/ML',
    description: 'Founding Software Engineer at Omni RPA Inc. Built the AI backend for a cloud automation platform — multi-agent orchestrator, knowledge graph infra, MCP tooling, semantic memory.',
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
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#2d2d2d' },
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const nonce = (await headers()).get('x-nonce') ?? ''

  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <head>
        <script
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}})()`,
          }}
        />
      </head>
      <body className="font-mono">
        <ThemeToggle />
        <FaviconInit />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
