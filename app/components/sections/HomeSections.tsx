import Link from 'next/link'
import {
  PERSONAL_INFO,
  SUMMARY,
  EXPERIENCE,
  BUILDS,
  SKILLS,
} from '../../data'
import { getAllNotes } from '../../lib/notes'

export function Intro() {
  return (
    <header className="intro">
      <h1 className="intro-name">{PERSONAL_INFO.name}</h1>
      <p className="intro-role">
        {PERSONAL_INFO.title} at{' '}
        <a href="https://clueso.io" target="_blank" rel="noopener noreferrer">
          {PERSONAL_INFO.currentCompany}
        </a>{' '}
        · {PERSONAL_INFO.location}
      </p>
      <p className="intro-bio">{SUMMARY}</p>
      <div className="intro-meta">
        <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
        <a href={PERSONAL_INFO.github.url} target="_blank" rel="noopener noreferrer">
          github
        </a>
        <a href={PERSONAL_INFO.x.url} target="_blank" rel="noopener noreferrer">
          {PERSONAL_INFO.x.display}
        </a>
        <a
          href={PERSONAL_INFO.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          linkedin
        </a>
      </div>
    </header>
  )
}

export function NotesSection({ limit }: { limit?: number }) {
  const notes = getAllNotes()
  const visible = typeof limit === 'number' ? notes.slice(0, limit) : notes

  return (
    <section className="section" aria-label="Notes">
      <h2 className="section-heading">
        <span>Notes</span>
        <Link href="/notes">archive →</Link>
      </h2>
      {visible.length === 0 ? (
        <p className="index-empty">
          Nothing published yet — this space is reserved for notes.
        </p>
      ) : (
        <ul className="index-list">
          {visible.map((note) => (
            <li key={note.slug} className="index-row">
              <time className="index-date" dateTime={note.date}>
                {note.date}
              </time>
              <div className="index-main">
                <Link href={`/notes/${note.slug}`} className="index-title">
                  {note.title}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export function BuildsSection() {
  const featured = BUILDS.filter((b) => b.featured)

  return (
    <section className="section" aria-label="Builds">
      <h2 className="section-heading">
        <span>Builds</span>
        <Link href="/stuff">everything →</Link>
      </h2>
      <ul className="index-list">
        {featured.map((build) => (
          <li key={build.id} className="index-row">
            <span className="index-date">{build.year}</span>
            <div className="index-main">
              {build.url ? (
                <a
                  href={build.url}
                  className="index-title"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {build.title}
                </a>
              ) : (
                <span className="index-title">{build.title}</span>
              )}
              <p className="index-blurb">{build.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function ExperienceSectionHome() {
  return (
    <section className="section" aria-label="Experience">
      <h2 className="section-heading">
        <span>Experience</span>
      </h2>
      <div className="exp-list">
        {EXPERIENCE.map((exp) => (
          <article key={exp.id} className="exp-item">
            <div className="exp-when">{exp.period}</div>
            <div>
              <div className="exp-role">{exp.position}</div>
              {'focus' in exp && exp.focus ? (
                <div className="exp-focus">{exp.focus}</div>
              ) : null}
              <div className="exp-org">
                {exp.companies.map((c, i) => {
                  const url =
                    'url' in c ? (c.url as string | undefined) : undefined
                  return (
                    <span key={c.name}>
                      {i > 0 ? ' · ' : null}
                      {url ? (
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {c.name}
                        </a>
                      ) : (
                        c.name
                      )}
                      , {c.location}
                    </span>
                  )
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function SkillsSectionHome() {
  const categories = [
    SKILLS.languages,
    SKILLS.backend,
    SKILLS.aiml,
    SKILLS.databases,
    SKILLS.cloud,
  ]

  return (
    <section className="section" aria-label="Skills">
      <h2 className="section-heading">
        <span>Skills</span>
      </h2>
      <div className="skill-rows">
        {categories.map((cat) => (
          <div key={cat.label} className="skill-row">
            <span className="skill-label">{cat.label}</span>
            <span className="skill-items">{cat.items.join(', ')}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
