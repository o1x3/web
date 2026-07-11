import { PERSONAL_INFO } from '../../data'

export function ContactSection() {
  return (
    <section className="cta" aria-label="Contact">
      <p className="cta-line">
        Building something with agents, infra, or anything that lives in a
        terminal? I read everything sent my way — usually same day.
      </p>
      <div className="cta-links">
        <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
        <a href={PERSONAL_INFO.x.url} target="_blank" rel="noopener noreferrer">
          dm {PERSONAL_INFO.x.display}
        </a>
        <a
          href={PERSONAL_INFO.github.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          github/o1x3
        </a>
      </div>
    </section>
  )
}
