import Script from 'next/script'
import { ClientWrapper } from './components/ClientWrapper'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { ExperienceSection } from './components/sections/Experience'
import { ProjectsSection } from './components/sections/Projects'
import { PublicationSection } from './components/sections/Publication'
import { SkillsSection } from './components/sections/Skills'
import { EducationSection } from './components/sections/Education'
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
    ...SKILLS.backend.items,
    ...SKILLS.databases.items,
    ...SKILLS.cloud.items,
  ],
}

export default function Home() {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        strategy="afterInteractive"
      />

      <ClientWrapper>
        <main className="container">
          <Header />
          <ExperienceSection />
          <ProjectsSection />
          <PublicationSection />
          <SkillsSection />
          <EducationSection />
          <Footer />
        </main>
      </ClientWrapper>
    </>
  )
}
