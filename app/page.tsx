'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { ThemeToggle } from './components/ui/ThemeToggle'
import { SkillGraph } from './components/ui/SkillGraph'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { ExperienceSection } from './components/sections/Experience'
import { EducationSection } from './components/sections/Education'
import { ProjectsSection } from './components/sections/Projects'
import { startUniqueFaviconRotation } from './favicon-manager'
import { PERSONAL_INFO, EDUCATION, SKILLS } from './data'

// Structured data for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PERSONAL_INFO.name,
  jobTitle: PERSONAL_INFO.title,
  worksFor: {
    '@type': 'Organization',
    name: PERSONAL_INFO.currentCompany,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Jose',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
  },
  alumniOf: EDUCATION.map((edu) => ({
    '@type': 'EducationalOrganization',
    name: edu.institution,
  })),
  email: `mailto:${PERSONAL_INFO.email}`,
  url: PERSONAL_INFO.website.url,
  sameAs: [PERSONAL_INFO.linkedin.url],
  knowsAbout: [
    ...SKILLS.programming.items,
    ...SKILLS.aiml.items,
    ...SKILLS.cloud.items,
    ...SKILLS.tools.items,
  ],
}

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Initialize dynamic favicon rotation
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        const cleanup = startUniqueFaviconRotation()
        return cleanup
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [])

  // Prevent hydration mismatch - show minimal loading state
  if (!mounted) {
    return (
      <div className="app-container">
        <main className="main-container">
          <div style={{ minHeight: '100vh' }} />
        </main>
      </div>
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

      <div className="app-container">
        <ThemeToggle />

        <div className="layout-with-sidebar">
          {/* Left sidebar with vertical skill graph */}
          <aside className="skill-sidebar">
            <SkillGraph />
          </aside>

          {/* Main content */}
          <main className="main-container">
            <Header />

            <ExperienceSection />

            <EducationSection />

            <ProjectsSection />

            <Footer />
          </main>
        </div>
      </div>
    </>
  )
}
