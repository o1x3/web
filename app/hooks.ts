// Custom React hooks

import { useState, useEffect, useRef, useCallback } from 'react'
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

/**
 * Hook for intersection observer-based visibility detection
 * Used for scroll-triggered animations
 */
export function useIntersection(
  options: IntersectionObserverInit = {}
): [React.RefObject<HTMLElement | null>, boolean] {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Once visible, stop observing
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [options])

  return [elementRef, isVisible]
}

/**
 * Hook for theme state management with localStorage persistence
 * Respects system preference on first visit
 */
export function useTheme(): {
  theme: 'dark' | 'light'
  toggleTheme: () => void
  mounted: boolean
} {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null

    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('theme-light', savedTheme === 'light')
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light')
      document.documentElement.classList.add('theme-light')
    }

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')
    const handleChange = (e: MediaQueryListEvent) => {
      // Only apply if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'light' : 'dark'
        setTheme(newTheme)
        document.documentElement.classList.toggle('theme-light', newTheme === 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('theme-light', newTheme === 'light')
  }, [theme])

  return { theme, toggleTheme, mounted }
}

/**
 * Hook to track scroll progress through the page
 * Returns a value from 0 to 1
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0
      setProgress(Math.min(1, Math.max(0, scrollProgress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return progress
}
