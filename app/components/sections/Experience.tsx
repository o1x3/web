'use client'

import { memo, useState, useCallback } from 'react'
import { SectionWrapper } from '../ui/SectionWrapper'
import { EXPERIENCE } from '../../data'

interface ExperienceCardProps {
  experience: typeof EXPERIENCE[number]
  isExpanded: boolean
  onToggle: () => void
}

const ExperienceCard = memo(function ExperienceCard({
  experience,
  isExpanded,
  onToggle,
}: ExperienceCardProps) {
  return (
    <div
      className={`bento-card bento-card-interactive bento-card-expandable ${isExpanded ? 'expanded' : ''}`}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
      aria-expanded={isExpanded}
    >
      <div className="bento-card-accent" />
      <div className="bento-card-header">
        <h3 className="bento-card-title">{experience.position}</h3>
        <p className="bento-card-subtitle">{experience.company}</p>
        <p className="bento-card-meta">
          <span>{experience.location}</span>
          <span style={{ color: 'var(--text-tertiary)' }}>·</span>
          <span>{experience.period}</span>
        </p>
      </div>

      <div className="bento-card-toggle">
        <span>{isExpanded ? '−' : '+'}</span>
        <span>{isExpanded ? 'Show less' : 'Show details'}</span>
      </div>

      <div className="bento-card-content">
        <ul>
          {experience.description.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
})

export const ExperienceSection = memo(function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<string | null>(EXPERIENCE[0]?.id || null)

  const handleToggle = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }, [])

  return (
    <SectionWrapper title="Experience" id="experience">
      <div className="bento-grid">
        {EXPERIENCE.map((exp) => (
          <div key={exp.id} className="bento-half">
            <ExperienceCard
              experience={exp}
              isExpanded={expandedId === exp.id}
              onToggle={() => handleToggle(exp.id)}
            />
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
})
