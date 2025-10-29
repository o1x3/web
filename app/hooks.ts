// Custom React hooks

import { useState, useEffect } from 'react'
import { BREAKPOINTS } from './data'

/**
 * Hook to detect mobile viewport with optimized RAF-based resize listener
 * Uses requestAnimationFrame for better performance and frame alignment
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') return

    const checkMobile = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.MOBILE)
    }

    // Initial check
    checkMobile()

    // RAF-based resize handler for optimal performance
    let rafId: number | null = null
    let ticking = false

    const handleResize = () => {
      if (!ticking) {
        ticking = true
        rafId = requestAnimationFrame(() => {
          checkMobile()
          ticking = false
        })
      }
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return isMobile
}
