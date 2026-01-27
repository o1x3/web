'use client'

import { memo } from 'react'
import { PERSONAL_INFO } from '../../data'

export const Footer = memo(function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
        <span>·</span>
        <a href={PERSONAL_INFO.linkedin.url} target="_blank" rel="noopener noreferrer">
          {PERSONAL_INFO.linkedin.display}
        </a>
        <span>·</span>
        <a href={PERSONAL_INFO.github.url} target="_blank" rel="noopener noreferrer">
          {PERSONAL_INFO.github.display}
        </a>
        <span>·</span>
        <a href={PERSONAL_INFO.website.url} target="_blank" rel="noopener noreferrer">
          {PERSONAL_INFO.website.display}
        </a>
      </div>
      <div className="footer-location">{PERSONAL_INFO.location}</div>
    </footer>
  )
})
