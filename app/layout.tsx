import type { Metadata } from 'next'
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: true,
  fallback: ['Monaco', 'Consolas', 'monospace'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  title: 'Karthik Vinayan - AI Engineer',
  description: 'Portfolio of Karthik Vinayan, AI Engineer at Omni RPA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <body className="font-mono bg-primary text-white overflow-hidden">
        {children}
      </body>
    </html>
  )
}