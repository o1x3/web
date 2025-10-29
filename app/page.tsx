'use client'

import { useState, useEffect, useCallback, memo } from 'react'
import { startUniqueFaviconRotation } from './favicon-manager'
import { useIsMobile } from './hooks'
import {
  ThemeToggle,
  Header,
  MobileHeader,
  Contact,
  MobileContact,
  Experience,
  MobileExperience,
  Education,
  MobileEducation,
  Skills,
  MobileSkills,
  Projects,
  MobileProjects,
  DesktopSidebar,
} from './components'

// Mobile Layout Component
const MobileLayout = memo(function MobileLayout({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  return (
    <div className="h-screen overflow-y-auto font-mono p-4 text-sm">
      <div className="flex flex-col space-y-6">
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} isMobile />
        <MobileHeader />
        <MobileExperience />
        <MobileEducation />
        <MobileSkills />
        <MobileProjects />
        <MobileContact />
        <div className="h-6" />
      </div>
    </div>
  )
})

// Desktop Layout Component
const DesktopLayout = memo(function DesktopLayout({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  return (
    <div className="max-w-7xl mx-auto h-screen font-mono overflow-hidden" style={{
      padding: 'clamp(1rem, 2vh, 2rem)',
      fontSize: 'clamp(0.875rem, 1.5vh, 1rem)'
    }}>
      <div className="grid grid-cols-1 lg:grid-cols-5 h-full" style={{
        gap: 'clamp(1rem, 2vh, 1.5rem)'
      }}>
        {/* Left Column - Main content */}
        <div className="lg:col-span-3 xl:col-span-3 overflow-hidden flex flex-col" style={{
          gap: 'clamp(0.75rem, 1.5vh, 1.25rem)'
        }}>
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          <Header />
          <Contact />
          <Experience />
          <Education />
          <Skills />
          <Projects />
        </div>

        {/* Right Column - Sidebar */}
        <DesktopSidebar />
      </div>
    </div>
  )
})

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const isMobile = useIsMobile()

  // Theme toggle callback
  const toggleTheme = useCallback(() => setIsDark(prev => !prev), [])

  // Initialize favicon rotation
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Start favicon rotation after initial render
    const timer = setTimeout(() => {
      const cleanup = startUniqueFaviconRotation()
      // Store cleanup function for unmount
      return () => {
        cleanup()
        clearTimeout(timer)
      }
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className={`h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {isMobile ? <MobileLayout isDark={isDark} toggleTheme={toggleTheme} /> : <DesktopLayout isDark={isDark} toggleTheme={toggleTheme} />}
    </div>
  )
}
