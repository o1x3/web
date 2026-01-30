'use client'

import { memo } from 'react'
import { SKILLS } from '../../data'

export const SkillsSection = memo(function SkillsSection() {
  const skillCategories = [
    SKILLS.languages,
    SKILLS.backend,
    SKILLS.databases,
    SKILLS.cloud,
    SKILLS.certifications,
  ]

  return (
    <section className="section-row">
      <div className="section-label">Skills</div>
      <div className="section-content">
        {skillCategories.map((category) => (
          <div key={category.label} className="skill-line">
            <span className="skill-label">{category.label}:</span>{' '}
            {category.items.join(', ')}
          </div>
        ))}
      </div>
    </section>
  )
})
