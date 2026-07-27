import {
  AboutSection,
  NotesSection,
  BuildsTableSection,
  ExperienceTableSection,
  SkillsTableSection,
} from './components/sections/DocumentHome'
import { PERSONAL_INFO, EDUCATION, SKILLS } from './data'

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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <AboutSection />
      <NotesSection limit={10} />
      <BuildsTableSection />
      <ExperienceTableSection />
      <SkillsTableSection />
    </>
  )
}
