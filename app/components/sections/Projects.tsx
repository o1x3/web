'use client'

import { memo, useState } from 'react'
import { PROJECTS, SIDE_PROJECTS } from '../../data'
import type { OSSContribution } from '../../lib/github'

const VISIBLE_CONTRIBUTIONS = 4

function ProjectEntry({ project }: { project: (typeof PROJECTS)[number] | (typeof SIDE_PROJECTS)[number] }) {
  return (
    <div className="entry">
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
  )
}

function ContributionEntry({ c }: { c: OSSContribution }) {
  return (
    <div className="entry">
      <div className="entry-header">
        <div className="entry-title contrib-title">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.avatarUrl}
            alt=""
            width={18}
            height={18}
            className="contrib-avatar"
          />
          <a
            href={c.prUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${c.repo}#${c.prNumber} (opens in new window)`}
          >
            {c.repo}#{c.prNumber}
          </a>
        </div>
        <span className="entry-date">{c.date}</span>
      </div>
      <ul className="bullet-list">
        <li>{c.description}</li>
      </ul>
    </div>
  )
}

function SideProjectsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Side Projects</span>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="modal-body">
          {SIDE_PROJECTS.map((project) => (
            <ProjectEntry key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ContributionsModal({
  contributions,
  onClose,
}: {
  contributions: OSSContribution[]
  onClose: () => void
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Open Source Contributions</span>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="modal-body">
          {contributions.map((c) => (
            <ContributionEntry key={c.id} c={c} />
          ))}
        </div>
      </div>
    </div>
  )
}

export const ProjectsSection = memo(function ProjectsSection({
  contributions = [],
}: {
  contributions?: OSSContribution[]
}) {
  const [showSideProjects, setShowSideProjects] = useState(false)
  const [showContributions, setShowContributions] = useState(false)
  const hasMore = contributions.length > VISIBLE_CONTRIBUTIONS
  const visible = hasMore
    ? contributions.slice(0, VISIBLE_CONTRIBUTIONS)
    : contributions

  return (
    <>
      <section className="section-row">
        <div className="section-label">
          Projects
          <button
            className="section-label-btn"
            onClick={() => setShowSideProjects(true)}
          >
            (side projects)
          </button>
        </div>
        <div className="section-content">
          {PROJECTS.map((project) => (
            <ProjectEntry key={project.id} project={project} />
          ))}
        </div>
      </section>

      {visible.length > 0 && (
        <section className="section-row">
          <div className="section-label">Open Source</div>
          <div className="section-content">
            <div
              className="oss-list-wrapper"
              onClick={() => setShowContributions(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowContributions(true) }}
            >
              <div className="oss-list">
                {visible.map((c) => (
                  <ContributionEntry key={c.id} c={c} />
                ))}
              </div>
              {hasMore && (
                <>
                  <div className="oss-fade" aria-hidden="true" />
                  <span className="oss-hint">
                    {visible.length} of {contributions.length} · view all →
                  </span>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {showSideProjects && (
        <SideProjectsModal onClose={() => setShowSideProjects(false)} />
      )}
      {showContributions && (
        <ContributionsModal
          contributions={contributions}
          onClose={() => setShowContributions(false)}
        />
      )}
    </>
  )
})
