'use client'

import { memo } from 'react'
import { PUBLICATION } from '../../data'

export const PublicationSection = memo(function PublicationSection() {
  return (
    <section className="section-row">
      <div className="section-label">Publication</div>
      <div className="section-content">
        <div className="entry">
          <div className="entry-title">
            {PUBLICATION.title} — {PUBLICATION.venue}
          </div>
          <ul className="bullet-list">
            <li>
              {PUBLICATION.description}{' '}
              <a href={PUBLICATION.doiUrl} target="_blank" rel="noopener noreferrer">
                DOI: {PUBLICATION.doi}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
})
