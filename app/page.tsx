'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { ThemeToggle } from './components/ui/ThemeToggle'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { ExperienceSection } from './components/sections/Experience'
import { ProjectsSection } from './components/sections/Projects'
import { PublicationSection } from './components/sections/Publication'
import { SkillsSection } from './components/sections/Skills'
import { EducationSection } from './components/sections/Education'
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
  sameAs: [PERSONAL_INFO.linkedin.url, PERSONAL_INFO.github.url],
  knowsAbout: [
    ...SKILLS.languages.items,
    ...SKILLS.aiml.items,
    ...SKILLS.backend.items,
    ...SKILLS.cloud.items,
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
      <div className="container">
        <div style={{ minHeight: '100vh' }} />
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

      <ThemeToggle />

      <main className="container">
        <Header />
        <ExperienceSection />
        <ProjectsSection />
        <PublicationSection />
        <SkillsSection />
        <EducationSection />
        <Footer />
      </main>
    </>
  )
}
