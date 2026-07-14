import { EXPERIENCE } from '../../data'
import { ExperienceBullets } from './ExperienceBullets'

export function ExperienceSection() {
  return (
    <section className="section-row" aria-label="Experience" data-pane="experience">
      <h2 className="section-label">Experience</h2>
      <div className="section-content">
        {EXPERIENCE.map((exp) => (
          <div key={exp.id} className="entry">
            <div className="entry-header">
              <span className="entry-title">{exp.position}</span>
              <span className="entry-date">{exp.period}</span>
            </div>
            {'focus' in exp && (
              <div className="entry-focus">{exp.focus}</div>
            )}
            {'companies' in exp && (
              <div className="entry-subtitle">
                {'url' in exp.companies[0] ? (
                  <a
                    href={exp.companies[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {exp.companies[0].name}
                  </a>
                ) : (
                  exp.companies[0].name
                )}
                , {exp.companies[0].location}
                {exp.companies[1] && (
                  <span className="company-aka">
                    ↳ {exp.companies[1].name}, {exp.companies[1].location}
                  </span>
                )}
              </div>
            )}
            {exp.description.length > 0 && (
              <ExperienceBullets items={exp.description} />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
