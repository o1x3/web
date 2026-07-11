import { Hero } from './components/sections/Hero'
import { FeaturedBuildsSection } from './components/sections/Builds'
import { ExperienceSection } from './components/sections/Experience'
import { SkillsSection } from './components/sections/Skills'
import { DotField } from './components/sections/DotField'
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

export default async function Home() {
  const contributions = await fetchMergedContributions(
    PERSONAL_INFO.githubAccounts
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Hero />
      <FeaturedBuildsSection />
      <ExperienceSection />
      {contributions && (
        <section className="section-row" aria-label="GitHub activity">
          <h2 className="section-label">a year in dots</h2>
          <div className="section-content">
            <DotField calendar={contributions} />
          </div>
        </section>
      )}
      <SkillsSection />
      <ContactSection />
    </>
  )
}
