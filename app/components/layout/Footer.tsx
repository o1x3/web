'use client'

import { memo } from 'react'
import { PERSONAL_INFO } from '../../data'

export const Footer = memo(function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
        <span aria-hidden="true">·</span>
        <a
          href={PERSONAL_INFO.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${PERSONAL_INFO.linkedin.display} (opens in new window)`}
        >
          {PERSONAL_INFO.linkedin.display}
        </a>
        <span aria-hidden="true">·</span>
        <a
          href={PERSONAL_INFO.github.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${PERSONAL_INFO.github.display} (opens in new window)`}
        >
          {PERSONAL_INFO.github.display}
        </a>
        <span aria-hidden="true">·</span>
        <a
          href={PERSONAL_INFO.website.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${PERSONAL_INFO.website.display} (opens in new window)`}
        >
          {PERSONAL_INFO.website.display}
        </a>
      </div>
      <div className="footer-location">{PERSONAL_INFO.location}</div>
    </footer>
  )
})
