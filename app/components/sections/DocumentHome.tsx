import {
  PERSONAL_INFO,
  SUMMARY,
  EXPERIENCE,
  EDUCATION,
  BUILDS,
  SKILLS,
} from '../../data'
import Link from 'next/link'
import { getAllNotes } from '../../lib/notes'

export function AboutSection() {
  const previous = EXPERIENCE.filter((e) => e.id !== 'clueso')

  return (
    <section className="section" aria-label="About">
      <h2 className="section-heading">About</h2>
      <div className="about-grid">
        <div className="about-col about-col-wide">
          <table className="table">
            <thead>
              <tr>
                <th colSpan={2}>Personal Information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="col-label">Name</td>
                <td>{PERSONAL_INFO.name}</td>
              </tr>
              <tr>
                <td className="col-label">Occupation</td>
                <td>
                  {PERSONAL_INFO.title} at{' '}
                  <a
                    href="https://clueso.io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {PERSONAL_INFO.currentCompany}
                  </a>{' '}
                  (YC W23)
                </td>
              </tr>
              <tr>
                <td className="col-label">
                  Previous
                  <br />
                  Occupations
                </td>
                <td>
                  <div className="stack-lines">
                    {previous.map((exp) => (
                      <span key={exp.id}>
                        {exp.position}
                        {'focus' in exp && exp.focus ? `, ${exp.focus}` : ''}
                        {' — '}
                        {exp.companies[0].name}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="col-label">Employer</td>
                <td>
                  <a
                    href="https://clueso.io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Clueso
                  </a>
                  <br />
                  {PERSONAL_INFO.location}
                </td>
              </tr>
              <tr>
                <td className="col-label">Previous Employers</td>
                <td>
                  <div className="stack-lines">
                    {previous.flatMap((exp) =>
                      exp.companies.map((c) => {
                        const url = 'url' in c ? (c.url as string | undefined) : undefined
                        return url ? (
                          <a
                            key={`${exp.id}-${c.name}`}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {c.name}
                          </a>
                        ) : (
                          <span key={`${exp.id}-${c.name}`}>{c.name}</span>
                        )
                      })
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="col-label">Education</td>
                <td>
                  {EDUCATION[0].degree}
                  <br />
                  {EDUCATION[0].institution}
                </td>
              </tr>
              <tr>
                <td className="col-label">Summary</td>
                <td>{SUMMARY}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="about-col">
          <table className="table">
            <thead>
              <tr>
                <th colSpan={2}>Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="col-label">Email</td>
                <td>
                  <a href={`mailto:${PERSONAL_INFO.email}`}>
                    {PERSONAL_INFO.email}
                  </a>
                </td>
              </tr>
              <tr>
                <td className="col-label">Location</td>
                <td>{PERSONAL_INFO.location}</td>
              </tr>
              <tr>
                <td className="col-label">GitHub</td>
                <td>
                  <a
                    href={PERSONAL_INFO.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {PERSONAL_INFO.githubAccounts.join(', ')}
                  </a>
                </td>
              </tr>
              <tr>
                <td className="col-label">X</td>
                <td>
                  <a
                    href={PERSONAL_INFO.x.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {PERSONAL_INFO.x.display}
                  </a>
                </td>
              </tr>
              <tr>
                <td className="col-label">LinkedIn</td>
                <td>
                  <a
                    href={PERSONAL_INFO.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    karthik-vinayan
                  </a>
                </td>
              </tr>
              <tr>
                <td className="col-label">Pages</td>
                <td>
                  <div className="stack-lines">
                    <Link href="/notes">Notes</Link>
                    <Link href="/stuff">Stuff</Link>
                    <Link href="/story">Story</Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export function NotesSection({ limit }: { limit?: number }) {
  const notes = getAllNotes()
  const visible = typeof limit === 'number' ? notes.slice(0, limit) : notes

  return (
    <section className="section" aria-label="Notes">
      <h2 className="section-heading">
        Notes
        <span aria-hidden="true">/</span>
        <Link href="/notes" className="section-heading-link" title="Notes Archive">
          Archive →
        </Link>
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th className="col-date">Date</th>
            <th>Title</th>
            <th className="col-link hide-phone">Link</th>
          </tr>
        </thead>
        <tbody>
          {visible.length === 0 ? (
            <tr>
              <td colSpan={3} className="empty-cell">
                No notes yet. This table is ready for posts — add entries in{' '}
                <code>app/lib/notes.ts</code>.
              </td>
            </tr>
          ) : (
            visible.map((note) => (
              <tr key={note.slug}>
                <td className="col-date">
                  <time dateTime={note.date}>{note.date}</time>
                </td>
                <td>
                  <Link href={`/notes/${note.slug}`} title={note.title}>
                    {note.title}
                  </Link>
                </td>
                <td className="col-link hide-phone">
                  <Link
                    href={`/notes/${note.slug}`}
                    className="btn btn-read"
                    title={`Read — ${note.title}`}
                  >
                    Read →
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  )
}

export function BuildsTableSection() {
  const featured = BUILDS.filter((b) => b.featured)

  return (
    <section className="section" aria-label="Builds">
      <h2 className="section-heading">
        Builds
        <span aria-hidden="true">/</span>
        <Link href="/stuff" className="section-heading-link" title="All builds">
          Everything →
        </Link>
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th className="col-year">Year</th>
            <th>Title</th>
            <th className="hide-phone">Description</th>
            <th className="col-link hide-phone">Link</th>
          </tr>
        </thead>
        <tbody>
          {featured.map((build) => (
            <tr key={build.id}>
              <td className="col-year">{build.year}</td>
              <td>
                {build.url ? (
                  <a
                    href={build.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={build.title}
                  >
                    {build.title}
                  </a>
                ) : (
                  build.title
                )}
              </td>
              <td className="hide-phone">{build.description}</td>
              <td className="col-link hide-phone">
                {build.url ? (
                  <a
                    href={build.url}
                    className="btn btn-read"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`View — ${build.title}`}
                  >
                    View →
                  </a>
                ) : (
                  <span className="empty-cell">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export function ExperienceTableSection() {
  return (
    <section className="section" aria-label="Experience">
      <h2 className="section-heading">Experience</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="col-date">Period</th>
            <th>Role</th>
            <th>Organization</th>
          </tr>
        </thead>
        <tbody>
          {EXPERIENCE.map((exp) => (
            <tr key={exp.id}>
              <td className="col-date">{exp.period}</td>
              <td>
                {exp.position}
                {'focus' in exp && exp.focus ? (
                  <div className="entry-focus">{exp.focus}</div>
                ) : null}
              </td>
              <td>
                <div className="stack-lines">
                  {exp.companies.map((c) => {
                    const url = 'url' in c ? (c.url as string | undefined) : undefined
                    return url ? (
                      <span key={c.name}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {c.name}
                        </a>
                        , {c.location}
                      </span>
                    ) : (
                      <span key={c.name}>
                        {c.name}, {c.location}
                      </span>
                    )
                  })}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export function SkillsTableSection() {
  const categories = [
    SKILLS.languages,
    SKILLS.backend,
    SKILLS.aiml,
    SKILLS.databases,
    SKILLS.cloud,
  ]

  return (
    <section className="section" aria-label="Skills">
      <h2 className="section-heading">Skills</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="col-label">Area</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.label}>
              <td className="col-label">{cat.label}</td>
              <td>{cat.items.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
