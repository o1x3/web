'use client'

import { useEffect, useState } from 'react'
import { PERSONAL_INFO, SUMMARY, TAGLINES } from '../../data'

// The same braille dots that live in the favicon, walking in place next to
// whatever I'm calling myself this week.
const SPINNER_FRAMES = Array.from('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏')
const SPINNER_INTERVAL = 120
const TAGLINE_INTERVAL = 3200

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export function TaglineRotator() {
  const reduced = useReducedMotion()
  const [frame, setFrame] = useState(0)
  const [word, setWord] = useState(0)

  useEffect(() => {
    if (reduced) return
    const spinner = setInterval(
      () => setFrame((f) => (f + 1) % SPINNER_FRAMES.length),
      SPINNER_INTERVAL
    )
    const words = setInterval(
      () => setWord((w) => (w + 1) % TAGLINES.length),
      TAGLINE_INTERVAL
    )
    return () => {
      clearInterval(spinner)
      clearInterval(words)
    }
  }, [reduced])

  return (
    <p className="hero-tagline">
      <span className="tagline-spinner" aria-hidden="true">
        {SPINNER_FRAMES[frame]}
      </span>
      <span className="tagline-words">
        {/* All phrases occupy the same grid cell; screen readers get the list once */}
        {TAGLINES.map((t, i) => (
          <span
            key={t}
            className={`tagline-word${i === word ? ' active' : ''}`}
            aria-hidden={i !== word}
          >
            {t}
          </span>
        ))}
      </span>
    </p>
  )
}

export function Hero() {
  return (
    <header className="hero">
      <h1 className="hero-name">{PERSONAL_INFO.name}</h1>
      <TaglineRotator />
      <p className="hero-bio">{SUMMARY}</p>
      <div className="hero-meta">
        <span>{PERSONAL_INFO.location}</span>
        <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
        <a href={PERSONAL_INFO.github.url} target="_blank" rel="noopener noreferrer">
          github
        </a>
        <a href={PERSONAL_INFO.x.url} target="_blank" rel="noopener noreferrer">
          {PERSONAL_INFO.x.display}
        </a>
        <a href={PERSONAL_INFO.linkedin.url} target="_blank" rel="noopener noreferrer">
          linkedin
        </a>
      </div>
    </header>
  )
}
