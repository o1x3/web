'use client'

import { memo } from 'react'
import { EXPERIENCE } from '../../data'

export const ExperienceSection = memo(function ExperienceSection() {
  return (
    <section className="section-row">
      <div className="section-label">Experience</div>
      <div className="section-content">
        {EXPERIENCE.map((exp) => (
          <div key={exp.id} className="entry">
            <div className="entry-header">
              <span className="entry-title">{exp.position}</span>
              <span className="entry-date">{exp.periodShort}</span>
            </div>
            <div className="entry-subtitle">
              {exp.company} — {exp.location}
            </div>
            <ul className="bullet-list">
              {exp.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
})
