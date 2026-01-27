import type { Metadata } from 'next'
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ErrorBoundary } from './error-boundary'
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

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: 'Karthik Vinayan | Founding Software Engineer - AI/ML',
  description: 'Founding Software Engineer at Omni RPA Inc specializing in LLM agents, Knowledge Graphs, and enterprise AI automation. Building agentic AI systems with Python, TensorFlow, and NebulaGraph.',
  keywords: ['AI Engineer', 'Machine Learning', 'LLM', 'Knowledge Graphs', 'Python', 'Software Engineer', 'NebulaGraph', 'TensorFlow', 'PyTorch'],
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
    description: 'Founding Software Engineer specializing in LLM agents, Knowledge Graphs, and enterprise AI automation.',
    siteName: 'Karthik Vinayan Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karthik Vinayan | Founding Software Engineer - AI/ML',
    description: 'Founding Software Engineer specializing in LLM agents, Knowledge Graphs, and enterprise AI automation.',
    creator: '@karthikvinayan',
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
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.live" />
      </head>
      <body className="font-mono">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
