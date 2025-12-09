'use client'

import { memo } from 'react'
import { SectionWrapper } from '../ui/SectionWrapper'
import { PROJECTS } from '../../data'

const ProjectCard = memo(function ProjectCard({
  project,
}: {
  project: typeof PROJECTS[number]
}) {
  return (
    <div className="bento-card">
      <div className="bento-card-accent" />
      <div className="bento-card-header">
        <h3 className="bento-card-title">{project.title}</h3>
      </div>
      <div className="bento-card-content">
        <ul>
          {project.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
})

export const ProjectsSection = memo(function ProjectsSection() {
  return (
    <SectionWrapper title="Projects" id="projects">
      <div className="bento-grid">
        {PROJECTS.map((project) => (
          <div key={project.id} className="bento-half">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
})
