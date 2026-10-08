'use client'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  useEffect(() => {
    const read = () => setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    const preference = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      let saved = null
      try { saved = localStorage.getItem('theme') } catch {}
      if (!saved) document.documentElement.classList.toggle('dark', preference.matches)
    }
    preference.addEventListener('change', onChange)
    return () => { observer.disconnect(); preference.removeEventListener('change', onChange) }
  }, [])
  function choose(next: 'light' | 'dark') {
    document.documentElement.classList.toggle('dark', next === 'dark')
    setTheme(next)
    try { localStorage.setItem('theme', next) } catch {}
  }
  return (
    <div className="theme-switch" role="group" aria-label="Color theme">
      <button type="button" aria-pressed={theme === 'light'} onClick={() => choose('light')} className="theme-choice theme-choice--light">light</button>
      <span aria-hidden="true">/</span>
      <button type="button" aria-pressed={theme === 'dark'} onClick={() => choose('dark')} className="theme-choice theme-choice--dark">dark</button>
    </div>
  )
}
