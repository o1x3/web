'use client'

import { useState, useEffect, useCallback, memo } from 'react'
import Script from 'next/script'
import { startUniqueFaviconRotation } from './favicon-manager'
import { useIsMobile } from './hooks'
import {
  ThemeToggle,
  Header,
  MobileHeader,
  MobileContact,
  Experience,
  MobileExperience,
  Education,
  MobileEducation,
  Skills,
  MobileSkills,
  Sidequests,
  MobileSidequests,
  DesktopSidebar,
} from './components'

// Structured data for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Karthik Vinayan',
  jobTitle: 'Founding Software Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Omni RPA Inc',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Jose',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Vellore Institute of Technology',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chennai',
      addressCountry: 'IN',
    },
  },
  email: 'karthikvinayan57@gmail.com',
  url: 'https://o1x3.com',
  sameAs: [
    'https://linkedin.com/in/karthik-vinayan',
    'https://github.com/karthikvinayan',
  ],
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'Large Language Models',
    'Knowledge Graphs',
    'Python',
    'TensorFlow',
    'PyTorch',
    'Computer Vision',
    'Cloud Computing',
  ],
}

// Mobile Layout Component
const MobileLayout = memo(function MobileLayout({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  return (
    <div className="h-screen overflow-y-auto font-mono p-4 text-sm">
      <div className="flex flex-col space-y-6">
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} isMobile />
        <MobileHeader />
        <MobileExperience />
        <MobileEducation />
        <MobileSkills />
        <MobileSidequests />
        <MobileContact />
        <div className="h-6" />
      </div>
    </div>
  )
})

// Desktop Layout Component
const DesktopLayout = memo(function DesktopLayout({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  return (
    <div className="max-w-7xl mx-auto h-screen font-mono overflow-hidden" style={{
      padding: 'clamp(0.75rem, 1.5vh, 1.5rem)',
      fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)'
    }}>
      <div className="grid grid-cols-1 lg:grid-cols-5 h-full" style={{
        gap: 'clamp(0.75rem, 1.5vh, 1.25rem)'
      }}>
        {/* Left Column - Main content */}
        <div className="lg:col-span-3 xl:col-span-3 overflow-hidden flex flex-col" style={{
          gap: 'clamp(0.5rem, 1vh, 0.875rem)'
        }}>
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          <Header />
          <Experience />
          <Education />
          <Skills />
          <Sidequests />
        </div>

        {/* Right Column - Sidebar */}
        <DesktopSidebar />
      </div>
    </div>
  )
})

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const isMobile = useIsMobile()

  // Theme toggle callback
  const toggleTheme = useCallback(() => setIsDark(prev => !prev), [])

  // Initialize favicon rotation
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Start favicon rotation after initial render
    const timer = setTimeout(() => {
      const cleanup = startUniqueFaviconRotation()
      // Store cleanup function for unmount
      return () => {
        cleanup()
        clearTimeout(timer)
      }
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        strategy="afterInteractive"
      />
      <div className={`h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        {isMobile ? <MobileLayout isDark={isDark} toggleTheme={toggleTheme} /> : <DesktopLayout isDark={isDark} toggleTheme={toggleTheme} />}
      </div>
    </>
  )
}
