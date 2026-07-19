import { Suspense } from 'react'
import { Hero } from './components/sections/Hero'
import { FeaturedBuildsSection } from './components/sections/Builds'
import { ExperienceSection } from './components/sections/Experience'
import { SkillsSection } from './components/sections/Skills'
import { LiveDotField } from './components/sections/LiveDotField'
import { ContactSection } from './components/sections/Contact'
import { PERSONAL_INFO, EDUCATION, SKILLS } from './data'
import { fetchMergedContributions } from './lib/contributions'

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
      addressLocality: 'Bengaluru',
      addressRegion: 'KA',
      addressCountry: 'IN',
    },
  },
  alumniOf: EDUCATION.map((edu) => ({
    '@type': 'EducationalOrganization',
    name: edu.institution,
  })),
  email: `mailto:${PERSONAL_INFO.email}`,
  url: PERSONAL_INFO.website.url,
  sameAs: [
    PERSONAL_INFO.linkedin.url,
    PERSONAL_INFO.github.url,
    PERSONAL_INFO.x.url,
  ],
  knowsAbout: [
    ...SKILLS.languages.items,
    ...SKILLS.aiml.items,
    ...SKILLS.backend.items,
    ...SKILLS.databases.items,
    ...SKILLS.cloud.items,
  ],
}

// Streams in behind Suspense with a live GitHub fetch on every view
async function DotsPane() {
  const contributions = await fetchMergedContributions(
    PERSONAL_INFO.githubAccounts
  )
  if (!contributions) return null

  return (
    <section className="section-row" aria-label="GitHub activity" data-pane="dots">
      <h2 className="section-label">a year in dots</h2>
      <div className="section-content">
        <LiveDotField initial={contributions} />
      </div>
    </section>
  )
}

function DotsPaneFallback() {
  return (
    <section className="section-row" aria-label="GitHub activity" data-pane="dots">
      <h2 className="section-label">a year in dots</h2>
      <div className="section-content">
        <div className="dotfield-skeleton" aria-hidden="true" />
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="bento">
        <div className="bento-col">
          <Hero />
          <ExperienceSection />
        </div>
        <div className="bento-col">
          <Suspense fallback={<DotsPaneFallback />}>
            <DotsPane />
          </Suspense>
          <FeaturedBuildsSection />
          <div className="bento-duo">
            <SkillsSection />
            <ContactSection />
          </div>
        </div>
      </div>
    </>
  )
}
