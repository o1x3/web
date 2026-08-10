'use client'

import { memo, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'
const THEME_KEY = 'theme'

export const ThemeToggle = memo(function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const savedTheme = localStorage.getItem(THEME_KEY)
    const hasExplicitTheme = savedTheme === 'dark' || savedTheme === 'light'

    const applyTheme = (nextTheme: Theme) => {
      setTheme(nextTheme)
      root.classList.toggle('dark', nextTheme === 'dark')
    }

    applyTheme(
      hasExplicitTheme
        ? (savedTheme as Theme)
        : media.matches
          ? 'dark'
          : 'light'
    )
    setMounted(true)

    if (hasExplicitTheme) return

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(event.matches ? 'dark' : 'light')
      }
    }

    media.addEventListener('change', handleSystemThemeChange)
    return () => media.removeEventListener('change', handleSystemThemeChange)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem(THEME_KEY, newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button className="theme-toggle" aria-label="Toggle theme">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>
    )
  }

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'light' ? (
        // Moon icon for switching to dark
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        // Sun icon for switching to light
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      )}
    </button>
  )
})
