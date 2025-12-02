'use client'

import { useState, useEffect, useCallback, memo } from 'react'
import Script from 'next/script'
import { startUniqueFaviconRotation } from './favicon-manager'
import { useIsMobile } from './hooks'
import {
  ThemeToggle,
  TerminalHeader,
  ExperienceSection,
  EducationSection,
  ProjectsSection,
  SkillsSection,
  ContactSection,
  MobileHeader,
  MobileExperience,
  MobileEducation,
  MobileProjects,
  MobileSkills,
  MobileContact,
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
    'DevOps',
    'Docker',
    'Kubernetes',
  ],
}

// Desktop Layout Component
const DesktopLayout = memo(function DesktopLayout({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  return (
    <div className="terminal-container">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

      {/* Scanline overlay effect */}
      <div className="scanline-overlay" aria-hidden="true" />

      {/* Main content wrapper */}
      <div className="terminal-wrapper">
        {/* Left column - Main content */}
        <main className="terminal-main">
          <TerminalHeader />
          <ExperienceSection />
          <EducationSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </main>

        {/* Right column - Decorative sidebar */}
        <aside className="terminal-sidebar" aria-hidden="true">
          <div className="sidebar-content">
            <div className="sidebar-block">
              <div className="sidebar-title">SYS.INFO</div>
              <div className="sidebar-text">kernel: career-v2.0</div>
              <div className="sidebar-text">uptime: 3+ years</div>
              <div className="sidebar-text">load: optimal</div>
            </div>

            <div className="sidebar-block">
              <div className="sidebar-title">FOCUS</div>
              <div className="sidebar-text">agentic-ai</div>
              <div className="sidebar-text">knowledge-graphs</div>
              <div className="sidebar-text">llm-engineering</div>
            </div>

            <div className="sidebar-block">
              <div className="sidebar-title">STACK</div>
              <div className="sidebar-text">python/ts</div>
              <div className="sidebar-text">tensorflow/pytorch</div>
              <div className="sidebar-text">docker/k8s</div>
            </div>

            <div className="sidebar-ascii">
              {`
 ╔═══════════╗
 ║  ▓▓▓▓▓▓▓  ║
 ║  ▓ AI ▓  ║
 ║  ▓▓▓▓▓▓▓  ║
 ╚═══════════╝
              `.trim()}
            </div>

            <div className="sidebar-block">
              <div className="sidebar-title">CERTS</div>
              <div className="sidebar-text">az-104</div>
              <div className="sidebar-text">aws-cp</div>
            </div>

            <div className="sidebar-block">
              <div className="sidebar-text opacity-30">
                {new Date().getFullYear()} /
              </div>
              <div className="sidebar-text opacity-30">
                o1x3.com
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
})

// Mobile Layout Component
const MobileLayout = memo(function MobileLayout({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  return (
    <div className="mobile-container">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

      <main className="mobile-main">
        <MobileHeader />
        <MobileExperience />
        <MobileEducation />
        <MobileProjects />
        <MobileSkills />
        <MobileContact />
      </main>
    </div>
  )
})

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)
  const isMobile = useIsMobile()

  // Theme toggle callback
  const toggleTheme = useCallback(() => setIsDark(prev => !prev), [])

  // Initialize favicon rotation and mark as mounted
  useEffect(() => {
    setMounted(true)

    if (typeof window === 'undefined') return

    const timer = setTimeout(() => {
      const cleanup = startUniqueFaviconRotation()
      return () => {
        cleanup()
        clearTimeout(timer)
      }
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  // Prevent flash of unstyled content
  if (!mounted) {
    return (
      <div className="h-screen w-screen bg-black" />
    )
  }

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        strategy="afterInteractive"
      />

      <div
        className={`app-container ${isDark ? 'theme-dark' : 'theme-light'}`}
        data-theme={isDark ? 'dark' : 'light'}
      >
        {/* Noise texture overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        {isMobile ? (
          <MobileLayout isDark={isDark} toggleTheme={toggleTheme} />
        ) : (
          <DesktopLayout isDark={isDark} toggleTheme={toggleTheme} />
        )}
      </div>
    </>
  )
}
