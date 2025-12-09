'use client'

import { memo } from 'react'
import { PERSONAL_INFO, CERTIFICATIONS } from '../../data'

export const Footer = memo(function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <span className="footer-label">Email</span>
          <a href={`mailto:${PERSONAL_INFO.email}`} className="footer-link">
            {PERSONAL_INFO.email}
          </a>
        </div>

        <div className="footer-section">
          <span className="footer-label">LinkedIn</span>
          <a
            href={PERSONAL_INFO.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            {PERSONAL_INFO.linkedin.display}
          </a>
        </div>

        <div className="footer-section">
          <span className="footer-label">Website</span>
          <a
            href={PERSONAL_INFO.website.url}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            {PERSONAL_INFO.website.display}
          </a>
        </div>

        <div className="footer-section">
          <span className="footer-label">Location</span>
          <span className="footer-link" style={{ cursor: 'default' }}>
            {PERSONAL_INFO.location}
          </span>
        </div>

        <div className="footer-section">
          <span className="footer-label">Certifications</span>
          <div className="flex flex-col gap-1">
            {CERTIFICATIONS.map((cert) => (
              <span key={cert} className="tag tag-accent" style={{ fontSize: 'var(--text-meta)' }}>
                {cert}
              </span>
            ))}
          </div>
        </div>

        <div className="footer-section">
          <div className="footer-status">
            <span className="status-dot" />
            <span>Available for opportunities</span>
          </div>
        </div>
      </div>
    </footer>
  )
})
