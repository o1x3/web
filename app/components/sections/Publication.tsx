import { PUBLICATION } from '../../data'

export function PublicationSection() {
  return (
    <section className="section-row" aria-label="Publication">
      <h2 className="section-label">Publication</h2>
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
}
