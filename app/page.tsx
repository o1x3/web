import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { HomeContent } from './components/home/HomeContent'
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
  sameAs: [PERSONAL_INFO.linkedin.url, PERSONAL_INFO.github.url],
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

      <main className="site-page home-page" id="main-content">
        <Header />
        <HomeContent />
        <Footer />
      </main>
    </>
  )
}
