'use client'

import { memo } from 'react'
import { EDUCATION } from '../../data'

export const EducationSection = memo(function EducationSection() {
  return (
    <section className="section-row">
      <div className="section-label">Education</div>
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
})
