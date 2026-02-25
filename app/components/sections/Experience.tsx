import { EXPERIENCE } from '../../data'
import { ExpandableText } from '../ui/ExpandableText'

export function ExperienceSection() {
  return (
    <section className="section-row" aria-label="Experience">
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
                {exp.companies[0].name} — {exp.companies[0].location}
                {exp.companies[1] && (
                  <span className="company-aka">
                    ↳ {exp.companies[1].name}, {exp.companies[1].location}
                  </span>
                )}
              </div>
            )}
            <ul className="bullet-list">
              {exp.description.map((item) => (
                <li key={item.short}>
                  <ExpandableText short={item.short} full={item.full} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
