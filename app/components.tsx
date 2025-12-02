'use client'

import { memo, useState, useEffect, useRef } from 'react'
import {
  PERSONAL_INFO,
  EXPERIENCE,
  EDUCATION,
  SKILLS,
  PROJECTS,
  CERTIFICATIONS,
} from './data'

// ═══════════════════════════════════════════════════════════════════════════
// THEME TOGGLE
// ═══════════════════════════════════════════════════════════════════════════

interface ThemeToggleProps {
  isDark: boolean
  onToggle: () => void
}

export const ThemeToggle = memo(function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 md:top-6 md:right-6 z-50 group"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="terminal-bracket">[</span>
      <span className="opacity-60 group-hover:opacity-100 transition-opacity">
        {isDark ? 'light' : 'dark'}
      </span>
      <span className="terminal-bracket">]</span>
    </button>
  )
})

// ═══════════════════════════════════════════════════════════════════════════
// TERMINAL HEADER - The hero section with typewriter effect
// ═══════════════════════════════════════════════════════════════════════════

export const TerminalHeader = memo(function TerminalHeader() {
  const [typedName, setTypedName] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const fullName = PERSONAL_INFO.name

  useEffect(() => {
    let i = 0
    const typeInterval = setInterval(() => {
      if (i < fullName.length) {
        setTypedName(fullName.slice(0, i + 1))
        i++
      } else {
        clearInterval(typeInterval)
      }
    }, 80)

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => {
      clearInterval(typeInterval)
      clearInterval(cursorInterval)
    }
  }, [fullName])

  return (
    <header className="terminal-section mb-4 md:mb-6">
      <div className="terminal-line mb-2">
        <span className="terminal-prompt">$</span>
        <span className="terminal-command">whoami</span>
      </div>

      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 glitch-text">
        {typedName}
        <span className={`cursor-blink ${showCursor ? 'opacity-100' : 'opacity-0'}`}>_</span>
      </h1>

      <div className="terminal-output space-y-1">
        <div className="flex items-center gap-2">
          <span className="terminal-label">role:</span>
          <span className="text-accent">{PERSONAL_INFO.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="terminal-label">org:</span>
          <span>{PERSONAL_INFO.currentCompany}</span>
          <span className="opacity-40">{'// '}{PERSONAL_INFO.companyLocation}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="terminal-label">loc:</span>
          <span className="opacity-70">{PERSONAL_INFO.location}</span>
        </div>
      </div>
    </header>
  )
})

// ═══════════════════════════════════════════════════════════════════════════
// EXPERIENCE SECTION
// ═══════════════════════════════════════════════════════════════════════════

export const ExperienceSection = memo(function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<string | null>('omni-rpa')

  return (
    <section className="terminal-section mb-4 md:mb-6">
      <div className="section-header mb-6">
        <span className="terminal-prompt">$</span>
        <span className="terminal-command">cat</span>
        <span className="terminal-arg">experience.log</span>
      </div>

      <div className="space-y-6">
        {EXPERIENCE.map((exp, index) => {
          const isExpanded = expandedId === exp.id
          return (
            <article
              key={exp.id}
              className="exp-card group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className="exp-header cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
              >
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
                  <h3 className="text-lg md:text-xl font-bold">
                    <span className="text-accent">{exp.position}</span>
                  </h3>
                  <span className="text-sm opacity-50 font-mono">{exp.period}</span>
                </div>
                <div className="flex items-center gap-2 text-sm opacity-70">
                  <span className="font-semibold">{exp.company}</span>
                  <span className="opacity-40">|</span>
                  <span>{exp.location}</span>
                  <span className="ml-auto text-xs opacity-40">
                    [{isExpanded ? '-' : '+'}]
                  </span>
                </div>
              </div>

              <div className={`exp-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
                <ul className="space-y-3 mt-4 pl-4 border-l border-current opacity-20-border">
                  {exp.description.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm leading-relaxed opacity-80 hover:opacity-100 transition-opacity"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <span className="text-accent mr-2">&#x2192;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
})

// ═══════════════════════════════════════════════════════════════════════════
// EDUCATION SECTION
// ═══════════════════════════════════════════════════════════════════════════

export const EducationSection = memo(function EducationSection() {
  return (
    <section className="terminal-section mb-4 md:mb-6">
      <div className="section-header mb-6">
        <span className="terminal-prompt">$</span>
        <span className="terminal-command">cat</span>
        <span className="terminal-arg">education.md</span>
      </div>

      <div className="grid gap-4">
        {EDUCATION.map((edu, index) => (
          <article
            key={edu.id}
            className="edu-card"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
              <h3 className="font-bold text-base md:text-lg">{edu.institution}</h3>
              <span className="text-sm opacity-50 font-mono">{edu.period}</span>
            </div>
            <p className="text-sm opacity-80 mb-1">{edu.degree}</p>
            {'specialization' in edu && edu.specialization && (
              <p className="text-xs opacity-50">
                <span className="text-accent">spec:</span> {edu.specialization}
              </p>
            )}
            <p className="text-xs opacity-40 mt-1">{edu.location}</p>
          </article>
        ))}
      </div>
    </section>
  )
})

// ═══════════════════════════════════════════════════════════════════════════
// PROJECTS SECTION
// ═══════════════════════════════════════════════════════════════════════════

export const ProjectsSection = memo(function ProjectsSection() {
  return (
    <section className="terminal-section mb-4 md:mb-6">
      <div className="section-header mb-6">
        <span className="terminal-prompt">$</span>
        <span className="terminal-command">ls -la</span>
        <span className="terminal-arg">./projects/</span>
      </div>

      <div className="space-y-6">
        {PROJECTS.map((project, index) => (
          <article
            key={project.id}
            className="project-card"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <h3 className="font-bold text-base md:text-lg mb-3 flex items-center gap-2">
              <span className="text-accent opacity-60">./</span>
              {project.title}
            </h3>
            <ul className="space-y-2 pl-4">
              {project.items.map((item, idx) => (
                <li
                  key={idx}
                  className="text-sm leading-relaxed opacity-70 hover:opacity-100 transition-opacity"
                >
                  <span className="text-accent mr-2 opacity-60">&#x2022;</span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
})

// ═══════════════════════════════════════════════════════════════════════════
// SKILLS SECTION - Matrix/Grid style
// ═══════════════════════════════════════════════════════════════════════════

export const SkillsSection = memo(function SkillsSection() {
  return (
    <section className="terminal-section mb-4 md:mb-6">
      <div className="section-header mb-6">
        <span className="terminal-prompt">$</span>
        <span className="terminal-command">cat</span>
        <span className="terminal-arg">skills.json</span>
      </div>

      <div className="skills-grid">
        {Object.values(SKILLS).map((skillGroup, index) => (
          <div
            key={skillGroup.label}
            className="skill-block"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <h4 className="text-xs uppercase tracking-wider opacity-50 mb-2 font-bold">
              {skillGroup.label}
            </h4>
            <div className="flex flex-wrap gap-1">
              {skillGroup.items.map((skill, idx) => (
                <span
                  key={idx}
                  className="skill-tag"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="mt-6 pt-4 border-t border-current opacity-10-border">
        <h4 className="text-xs uppercase tracking-wider opacity-50 mb-3 font-bold flex items-center gap-2">
          <span className="text-accent">&#x2713;</span>
          Certifications
        </h4>
        <div className="flex flex-wrap gap-2">
          {CERTIFICATIONS.map((cert, idx) => (
            <span key={idx} className="cert-badge">
              {cert}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
})

// ═══════════════════════════════════════════════════════════════════════════
// CONTACT SECTION - Footer with links
// ═══════════════════════════════════════════════════════════════════════════

export const ContactSection = memo(function ContactSection() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="terminal-section mt-auto pt-8">
      <div className="section-header mb-4">
        <span className="terminal-prompt">$</span>
        <span className="terminal-command">echo</span>
        <span className="terminal-arg">$CONTACT</span>
      </div>

      <div className="contact-grid">
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          className="contact-link group"
        >
          <span className="contact-label">email</span>
          <span className="contact-value group-hover:text-accent transition-colors">
            {PERSONAL_INFO.email}
          </span>
        </a>

        <a
          href={PERSONAL_INFO.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link group"
        >
          <span className="contact-label">linkedin</span>
          <span className="contact-value group-hover:text-accent transition-colors">
            {PERSONAL_INFO.linkedin.display}
          </span>
        </a>

        <a
          href={PERSONAL_INFO.website.url}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link group"
        >
          <span className="contact-label">web</span>
          <span className="contact-value group-hover:text-accent transition-colors">
            {PERSONAL_INFO.website.display}
          </span>
        </a>
      </div>

      {/* Status bar */}
      <div className="status-bar mt-8">
        <div className="flex items-center gap-4 text-xs opacity-40">
          <span className="flex items-center gap-1">
            <span className="status-dot"></span>
            online
          </span>
          <span>{time}</span>
          <span className="ml-auto">{PERSONAL_INFO.location}</span>
        </div>
      </div>
    </footer>
  )
})

// ═══════════════════════════════════════════════════════════════════════════
// MOBILE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

export const MobileHeader = memo(function MobileHeader() {
  return (
    <header className="text-center mb-8">
      <div className="terminal-line-mobile mb-3">
        <span className="terminal-prompt">$</span>
        <span className="terminal-command">whoami</span>
      </div>

      <h1 className="text-2xl font-bold tracking-tight mb-3 glitch-text">
        {PERSONAL_INFO.name}
      </h1>

      <div className="space-y-1 text-sm">
        <p className="text-accent font-semibold">{PERSONAL_INFO.title}</p>
        <p className="opacity-70">{PERSONAL_INFO.currentCompany}</p>
        <p className="opacity-50 text-xs">{PERSONAL_INFO.location}</p>
      </div>
    </header>
  )
})

export const MobileExperience = memo(function MobileExperience() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section className="mb-8">
      <div className="section-header-mobile mb-4">
        <span className="terminal-prompt">$</span>
        <span className="terminal-command">cat</span>
        <span className="terminal-arg">exp</span>
      </div>

      <div className="space-y-4">
        {EXPERIENCE.map((exp) => {
          const isExpanded = expandedId === exp.id
          return (
            <article
              key={exp.id}
              className="mobile-card"
              onClick={() => setExpandedId(isExpanded ? null : exp.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-sm text-accent">{exp.position}</h3>
                <span className="text-xs opacity-40">{exp.periodShort}</span>
              </div>
              <p className="text-xs opacity-70 mb-2">{exp.company}</p>

              {isExpanded && (
                <ul className="text-xs space-y-2 mt-3 pt-3 border-t border-current opacity-10-border">
                  {exp.description.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="opacity-70 leading-relaxed">
                      <span className="text-accent mr-1">&#x2192;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
})

export const MobileEducation = memo(function MobileEducation() {
  return (
    <section className="mb-8">
      <div className="section-header-mobile mb-4">
        <span className="terminal-prompt">$</span>
        <span className="terminal-command">cat</span>
        <span className="terminal-arg">edu</span>
      </div>

      <div className="space-y-3">
        {EDUCATION.map((edu) => (
          <article key={edu.id} className="mobile-card">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-sm">{edu.institutionShort}</h3>
              <span className="text-xs opacity-40">{edu.period}</span>
            </div>
            <p className="text-xs opacity-70">{edu.degreeShort}</p>
          </article>
        ))}
      </div>
    </section>
  )
})

export const MobileProjects = memo(function MobileProjects() {
  return (
    <section className="mb-8">
      <div className="section-header-mobile mb-4">
        <span className="terminal-prompt">$</span>
        <span className="terminal-command">ls</span>
        <span className="terminal-arg">projects</span>
      </div>

      <div className="space-y-3">
        {PROJECTS.map((project) => (
          <article key={project.id} className="mobile-card">
            <h3 className="font-bold text-sm mb-2 flex items-center gap-1">
              <span className="text-accent opacity-60">./</span>
              {project.title}
            </h3>
            <p className="text-xs opacity-70 leading-relaxed">
              {project.items[0]}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
})

export const MobileSkills = memo(function MobileSkills() {
  const coreSkills = [
    ...SKILLS.programming.items.slice(0, 2),
    ...SKILLS.aiml.items.slice(0, 3),
    ...SKILLS.tools.items.slice(0, 3),
  ]

  return (
    <section className="mb-8">
      <div className="section-header-mobile mb-4">
        <span className="terminal-prompt">$</span>
        <span className="terminal-command">cat</span>
        <span className="terminal-arg">skills</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {coreSkills.map((skill, idx) => (
          <span key={idx} className="skill-tag-mobile">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {CERTIFICATIONS.map((cert, idx) => (
          <span key={idx} className="cert-badge-mobile">
            {cert}
          </span>
        ))}
      </div>
    </section>
  )
})

export const MobileContact = memo(function MobileContact() {
  return (
    <footer className="mt-auto pt-6 border-t border-current opacity-10-border">
      <div className="section-header-mobile mb-4">
        <span className="terminal-prompt">$</span>
        <span className="terminal-command">echo</span>
        <span className="terminal-arg">$CONTACT</span>
      </div>

      <div className="space-y-3 text-sm">
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          className="block opacity-70 hover:opacity-100 transition-opacity"
        >
          <span className="text-accent mr-2">mail:</span>
          {PERSONAL_INFO.email}
        </a>
        <a
          href={PERSONAL_INFO.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block opacity-70 hover:opacity-100 transition-opacity"
        >
          <span className="text-accent mr-2">in:</span>
          {PERSONAL_INFO.linkedin.display}
        </a>
        <a
          href={PERSONAL_INFO.website.url}
          className="block opacity-70 hover:opacity-100 transition-opacity"
        >
          <span className="text-accent mr-2">web:</span>
          {PERSONAL_INFO.website.display}
        </a>
      </div>

      <div className="mt-6 text-xs opacity-30 flex items-center gap-2">
        <span className="status-dot-small"></span>
        <span>online</span>
        <span className="ml-auto">{PERSONAL_INFO.location}</span>
      </div>
    </footer>
  )
})
