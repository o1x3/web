'use client'

import { useRef, useState, useEffect, useCallback } from 'react'

interface ExpandableTextProps {
  short: string
  full: string
}

export function ExpandableText({ short, full }: ExpandableTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const shortRef = useRef<HTMLSpanElement>(null)
  const fullRef = useRef<HTMLSpanElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [heights, setHeights] = useState({ short: 0, full: 0 })

  useEffect(() => {
    // Measure real rendered heights so wrapped short text isn't clipped.
    // ResizeObserver catches wrapping changes that window resize events miss.
    const measure = () => {
      if (shortRef.current && fullRef.current) {
        setHeights({
          short: shortRef.current.scrollHeight,
          full: fullRef.current.scrollHeight,
        })
      }
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (shortRef.current) observer.observe(shortRef.current)
    if (fullRef.current) observer.observe(fullRef.current)
    return () => observer.disconnect()
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setExpanded((prev) => !prev)
    }
  }, [])

  return (
    <span
      ref={containerRef}
      className="expandable-text"
      style={{
        maxHeight: expanded ? heights.full || '10em' : heights.short || '1.6em',
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
    >
      <span ref={shortRef} className={`expandable-short ${expanded ? 'fade-out' : ''}`} aria-hidden={expanded}>
        {short}
      </span>
      <span ref={fullRef} className={`expandable-full ${expanded ? '' : 'fade-out'}`} aria-hidden={!expanded}>
        {full}
      </span>
    </span>
  )
}
