'use client'

import { useEffect, useRef } from 'react'

export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let frame = 0
    const update = () => {
      const maximum = document.documentElement.scrollHeight - window.innerHeight
      if (ref.current) ref.current.style.transform = `scaleX(${maximum > 0 ? Math.min(1, Math.max(0, window.scrollY / maximum)) : 1})`
      frame = 0
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new ResizeObserver(schedule)
    observer.observe(document.documentElement)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule) }
  }, [])
  return <div ref={ref} className="reading-progress" aria-hidden="true" />
}
