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
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} (opens in new window)`}
                >
                  {project.title}
                </a>
              ) : (
                project.title
              )}
              {'badges' in project && project.badges.map((badge) => (
                'url' in badge ? (
                  <a
                    key={badge.label}
                    href={badge.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="badge"
                    aria-label={`${badge.label} (opens in new window)`}
                  >
                    {badge.label}
                  </a>
                ) : (
                  <span key={badge.label} className="badge">{badge.label}</span>
                )
              ))}
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
