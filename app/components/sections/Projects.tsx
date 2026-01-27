'use client'

import { memo } from 'react'
import { PROJECTS } from '../../data'

export const ProjectsSection = memo(function ProjectsSection() {
  return (
    <section className="section-row">
      <div className="section-label">Projects</div>
      <div className="section-content">
        {PROJECTS.map((project) => (
          <div key={project.id} className="entry">
            <div className="entry-title">
              {'url' in project ? (
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </div>
            <ul className="bullet-list">
              <li>{project.description}</li>
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
})
