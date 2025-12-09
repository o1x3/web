'use client'

import { memo } from 'react'
import { SectionWrapper } from '../ui/SectionWrapper'
import { TagList } from '../ui/Tag'
import { SKILLS } from '../../data'

const SkillCategory = memo(function SkillCategory({
  label,
  items,
}: {
  label: string
  items: readonly string[]
}) {
  return (
    <div className="bento-card" style={{ padding: 'var(--space-4)' }}>
      <h4
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-meta)',
          color: 'var(--accent)',
          marginBottom: 'var(--space-3)',
          textTransform: 'uppercase',
          letterSpacing: 'var(--tracking-wider)',
        }}
      >
        {label}
      </h4>
      <TagList tags={[...items]} />
    </div>
  )
})

export const SkillsSection = memo(function SkillsSection() {
  // Filter to show only technical skills, not languages/extracurricular
  const technicalSkills = {
    programming: SKILLS.programming,
    aiml: SKILLS.aiml,
    cloud: SKILLS.cloud,
    tools: SKILLS.tools,
  }

  return (
    <SectionWrapper title="Skills" id="skills">
      <div className="bento-grid">
        {Object.entries(technicalSkills).map(([key, { label, items }]) => (
          <div key={key} className="bento-third">
            <SkillCategory label={label} items={items} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
})
