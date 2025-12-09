'use client'

import { memo } from 'react'
import { SectionWrapper } from '../ui/SectionWrapper'
import { EDUCATION } from '../../data'

const EducationCard = memo(function EducationCard({
  education,
}: {
  education: typeof EDUCATION[number]
}) {
  return (
    <div className="bento-card">
      <div className="bento-card-accent" />
      <div className="bento-card-header">
        <h3 className="bento-card-title">{education.institution}</h3>
        <p className="bento-card-subtitle">{education.degree}</p>
        {'specialization' in education && education.specialization && (
          <p className="bento-card-meta" style={{ color: 'var(--accent)' }}>
            {education.specialization}
          </p>
        )}
        <p className="bento-card-meta">
          <span>{education.location}</span>
          <span style={{ color: 'var(--text-tertiary)' }}>·</span>
          <span>{education.period}</span>
        </p>
      </div>
    </div>
  )
})

export const EducationSection = memo(function EducationSection() {
  return (
    <SectionWrapper title="Education" id="education">
      <div className="bento-grid">
        {EDUCATION.map((edu) => (
          <div key={edu.id} className="bento-half">
            <EducationCard education={edu} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
})
