import Link from 'next/link'
import {
  PERSONAL_INFO,
  EXPERIENCE,
  BUILDS,
  SKILLS,
} from '../../data'
import { getAllNotes } from '../../lib/notes'
import { ExperienceBullets } from './ExperienceBullets'

export function Intro() {
  return (
    <header className="intro">
      <h1 className="intro-headline">
        {PERSONAL_INFO.name} builds agents and infra that ship.
      </h1>
      <p className="intro-bio">
        applied ai engineer at{' '}
        <a href="https://clueso.io" target="_blank" rel="noopener noreferrer">
          {PERSONAL_INFO.currentCompany}
        </a>{' '}
        (yc w23) in {PERSONAL_INFO.location.toLowerCase()}. previously founding
        ai engineer at omni rpa, where i built the backend for a production ai
        cloud automation platform: multi-agent orchestrator, knowledge graph
        infra, mcp, semantic memory — all from zero.
      </p>
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

export function BuildsSection() {
  const featured = BUILDS.filter((b) => b.featured)

  return (
    <section className="section" aria-label="Builds">
      <h2 className="section-title">builds</h2>
      <p className="section-lead">
        side projects that stuck around.{' '}
        <Link href="/stuff">see everything</Link>
      </p>
      <ul className="pair-list">
        {featured.map((build) => (
          <li key={build.id} className="pair-row">
            <div className="pair-main">
              {build.url ? (
                <a
                  href={build.url}
                  className="pair-name"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {build.title}
                </a>
              ) : (
                <span className="pair-name">{build.title}</span>
              )}
              <p className="pair-blurb">{build.description.toLowerCase()}</p>
            </div>
            <span className="pair-meta">{build.year}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function ExperienceSectionHome() {
  return (
    <section className="section" aria-label="Experience">
      <h2 className="section-title">experience</h2>
      <p className="section-lead">
        places where the work had to hold up under real users.
      </p>
      <div className="exp-list">
        {EXPERIENCE.map((exp) => (
          <article key={exp.id} className="exp-item">
            <div className="exp-head">
              <div>
                <div className="exp-role">{exp.position.toLowerCase()}</div>
                <div className="exp-org">
                  {exp.companies.map((c, i) => {
                    const url =
                      'url' in c ? (c.url as string | undefined) : undefined
                    return (
                      <span key={c.name}>
                        {i > 0 ? ' · ' : null}
                        {url ? (
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            {c.name.toLowerCase()}
                          </a>
                        ) : (
                          c.name.toLowerCase()
                        )}
                      </span>
                    )
                  })}
                </div>
              </div>
              <div className="exp-when">{exp.period.toLowerCase()}</div>
            </div>
            {exp.description.length > 0 && (
              <ExperienceBullets items={exp.description} />
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export function SkillsMarquee() {
  const items = [
    ...SKILLS.languages.items,
    ...SKILLS.aiml.items.slice(0, 4),
    ...SKILLS.backend.items,
    ...SKILLS.cloud.items.slice(0, 3),
  ]

  return (
    <section className="section" aria-label="Stack">
      <h2 className="section-title">stack</h2>
      <p className="section-lead">
        the tools that show up most often when something needs to ship.
      </p>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...items, ...items].map((item, i) => (
            <span key={`${item}-${i}`} className="marquee-item">
              {item}
            </span>
          ))}
        </div>
      </div>
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

export function ContactBlock() {
  return (
    <section className="section" aria-label="Contact">
      <h2 className="section-title">say hi</h2>
      <p className="section-lead">
        building something with agents or infra? i read everything sent my way,
        usually same day.{' '}
        <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
        {' · '}
        <a href={PERSONAL_INFO.x.url} target="_blank" rel="noopener noreferrer">
          dm {PERSONAL_INFO.x.display}
        </a>
      </p>
    </section>
  )
}

/** Compact notes list for /notes archive and mobile home */
export function NotesIndex({ limit }: { limit?: number }) {
  const notes = getAllNotes()
  const visible = typeof limit === 'number' ? notes.slice(0, limit) : notes

  if (visible.length === 0) {
    return (
      <p className="empty-hint">nothing published yet — space reserved.</p>
    )
  }

  return (
    <ul className="pair-list">
      {visible.map((note) => (
        <li key={note.slug} className="pair-row">
          <div className="pair-main">
            <Link href={`/notes/${note.slug}`} className="pair-name">
              {note.title}
            </Link>
            <p className="pair-blurb">{note.teaser}</p>
          </div>
          <time className="pair-meta" dateTime={note.date}>
            {note.date}
          </time>
        </li>
      ))}
    </ul>
  )
}

/** Desktop right rail: independently scrollable notes feed */
export function NotesRail() {
  const notes = getAllNotes()

  return (
    <aside className="rail" aria-label="Notes">
      <div className="rail-inner">
        <div className="rail-header">
          <h2 className="rail-title">notes</h2>
          <Link href="/notes" className="rail-archive">
            archive →
          </Link>
        </div>

        <div className="rail-scroll">
          {notes.length === 0 ? (
            <p className="empty-hint">writing will land here.</p>
          ) : (
            <ul className="rail-feed">
              {notes.map((note) => (
                <li key={note.slug}>
                  <Link href={`/notes/${note.slug}`} className="rail-card">
                    <time className="rail-date" dateTime={note.date}>
                      {note.date}
                    </time>
                    <span className="rail-card-title">{note.title}</span>
                    <span className="rail-card-teaser">{note.teaser}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {notes.length > 0 && (
          <div className="rail-ticker" aria-hidden="true">
            <div className="rail-ticker-track">
              {[...notes, ...notes].map((note, i) => (
                <span key={`${note.slug}-t-${i}`} className="rail-ticker-item">
                  {note.title}
                  <span className="rail-ticker-dot">·</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

/** Mobile-only notes block (desktop uses the rail) */
export function NotesSectionMobile() {
  return (
    <section className="section notes-mobile" aria-label="Notes">
      <h2 className="section-title">notes</h2>
      <p className="section-lead">
        short writing on agents, tools, and shipping.{' '}
        <Link href="/notes">archive →</Link>
      </p>
      <NotesIndex limit={5} />
    </section>
  )
}
