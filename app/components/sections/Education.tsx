import { EDUCATION } from '../../data'

export function EducationSection() {
  return (
    <section className="section-row" aria-label="Education">
      <h2 className="section-label">Education</h2>
      <div className="section-content">
        {EDUCATION.map((edu) => (
          <div key={edu.id} className="entry">
            <div className="entry-header">
              <span className="entry-title">{edu.degree}</span>
              <span className="entry-date">{edu.periodShort}</span>
            </div>
            <div className="entry-subtitle">{edu.institutionShort}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
