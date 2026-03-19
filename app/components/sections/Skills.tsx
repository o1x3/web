import { SKILLS } from '../../data'

export function SkillsSection() {
  const skillCategories = [
    SKILLS.languages,
    SKILLS.backend,
    SKILLS.databases,
    SKILLS.cloud,
    SKILLS.aiml,
  ]

  return (
    <section className="section-row" aria-label="Skills">
      <h2 className="section-label">Skills</h2>
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
}
