'use client'

import { useState } from 'react'

export function MotionTicker({
  items,
  className,
  ariaLabel,
}: {
  items: readonly string[]
  className: string
  ariaLabel: string
}) {
  const [paused, setPaused] = useState(false)
  const repeated = [...items, ...items]

  return (
    <div className={`motion-ticker ${className}${paused ? ' is-paused' : ''}`}>
      <div className="motion-ticker-viewport" role="region" aria-label={ariaLabel}>
        <div className="motion-ticker-track" aria-hidden="true">
          {repeated.map((item, index) => (
            <span key={`${item}-${index}`} className="marquee-item">
              {item}
            </span>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="motion-ticker-control"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        aria-label={paused ? 'resume scrolling' : 'pause scrolling'}
      >
        {paused ? 'play' : 'pause'}
      </button>
    </div>
  )
}
