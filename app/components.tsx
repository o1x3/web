// Reusable components to eliminate duplication

import { memo, CSSProperties } from 'react'
import {
  PERSONAL_INFO,
  EXPERIENCE,
  EDUCATION,
  SKILLS,
  SIDEQUESTS,
  CERTIFICATIONS,
  RECENT_WORK
} from './data'
import { safeOpenLink, formatList } from './utils'

interface SectionProps {
  className?: string
  style?: CSSProperties
}

// Header Component
export const Header = memo(function Header({ className = '', style }: SectionProps) {
  return (
    <header className={className} style={style}>
      <h1
        className="font-bold cursor-pointer hover:opacity-80 transition-opacity duration-500"
        style={{
          fontSize: 'clamp(1.125rem, 2.5vh, 1.75rem)',
          marginBottom: 'clamp(0.25rem, 0.5vh, 0.5rem)'
        }}
        onClick={() => safeOpenLink(PERSONAL_INFO.linkedin.url)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && safeOpenLink(PERSONAL_INFO.linkedin.url)}
        aria-label={`Visit ${PERSONAL_INFO.name}'s LinkedIn profile`}
      >
        {PERSONAL_INFO.name}
      </h1>
      <p className="opacity-70" style={{ marginBottom: 'clamp(0.125rem, 0.25vh, 0.375rem)', fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}>
        {PERSONAL_INFO.title}
      </p>
      <p className="opacity-50" style={{ fontSize: 'clamp(0.6875rem, 1.125vh, 0.8125rem)' }}>Currently @ {PERSONAL_INFO.currentCompany}</p>
    </header>
  )
})

// Mobile Header (simplified centered version)
export const MobileHeader = memo(function MobileHeader() {
  return (
    <header className="text-center">
      <h1
        className="font-bold text-lg cursor-pointer hover:opacity-80 transition-opacity duration-500 mb-2"
        onClick={() => safeOpenLink(PERSONAL_INFO.linkedin.url)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && safeOpenLink(PERSONAL_INFO.linkedin.url)}
        aria-label={`Visit ${PERSONAL_INFO.name}'s LinkedIn profile`}
      >
        {PERSONAL_INFO.name}
      </h1>
      <p className="opacity-70 mb-1">{PERSONAL_INFO.title}</p>
      <p className="opacity-50">Currently @ {PERSONAL_INFO.currentCompany}</p>
    </header>
  )
})

// Contact Component
export const Contact = memo(function Contact({ className = '', style }: SectionProps) {
  return (
    <section className={className} style={style}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.25rem, 0.5vh, 0.5rem)' }}>
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          className="hover:opacity-80 transition-opacity cursor-pointer"
          style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}
          aria-label={`Email ${PERSONAL_INFO.name}`}
        >
          <span className="opacity-50">email:</span> {PERSONAL_INFO.email}
        </a>
        <div style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}>
          <span className="opacity-50">location:</span> {PERSONAL_INFO.location}
        </div>
        <a
          href={PERSONAL_INFO.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity cursor-pointer"
          style={{ fontSize: 'clamp(0.75rem, 1.25vh, 0.875rem)' }}
          aria-label={`Visit ${PERSONAL_INFO.name}'s LinkedIn profile`}
        >
          <span className="opacity-50">linkedin:</span> {PERSONAL_INFO.linkedin.display}
        </a>
      </div>
    </section>
  )
})

// Mobile Contact (simplified text-xs version)
export const MobileContact = memo(function MobileContact() {
  return (
    <section>
      <h2 className="font-bold text-base mb-3">Contact</h2>
      <div className="space-y-2 text-xs">
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          className="block hover:opacity-80 transition-opacity cursor-pointer"
          aria-label={`Email ${PERSONAL_INFO.name}`}
        >
          <span className="opacity-50">email:</span> {PERSONAL_INFO.email}
        </a>
        <a
          href={PERSONAL_INFO.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-80 transition-opacity cursor-pointer"
          aria-label={`Visit ${PERSONAL_INFO.name}'s LinkedIn profile`}
        >
          <span className="opacity-50">linkedin:</span> {PERSONAL_INFO.linkedin.display}
        </a>
      </div>
    </section>
  )
})

// Experience Component
export const Experience = memo(function Experience({ className = '', style }: SectionProps) {
  return (
    <section className={className} style={style}>
      <h2 className="font-bold" style={{
        fontSize: 'clamp(0.875rem, 2vh, 1.125rem)',
        marginBottom: 'clamp(0.375rem, 0.75vh, 0.625rem)'
      }}>Experience</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 1vh, 0.75rem)' }}>
        {EXPERIENCE.map((exp) => (
          <div key={exp.id} className="hover:opacity-90 transition-opacity">
            <div className="flex justify-between items-start" style={{ marginBottom: 'clamp(0.125rem, 0.375vh, 0.375rem)' }}>
              <h3 className="font-semibold" style={{ fontSize: 'clamp(0.8125rem, 1.375vh, 0.9375rem)' }}>{exp.company}</h3>
              <span className="opacity-50" style={{ fontSize: 'clamp(0.6875rem, 1.125vh, 0.8125rem)' }}>{exp.period}</span>
            </div>
            <p className="opacity-70" style={{
              marginBottom: 'clamp(0.125rem, 0.375vh, 0.375rem)',
              fontSize: 'clamp(0.6875rem, 1.125vh, 0.8125rem)'
            }}>{exp.position} • {exp.location}</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.0625rem, 0.125vh, 0.1875rem)' }}>
              {exp.description.map((item, idx) => (
                <li key={idx} style={{ fontSize: 'clamp(0.6875rem, 1.125vh, 0.8125rem)' }}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
})

// Mobile Experience (simplified)
export const MobileExperience = memo(function MobileExperience() {
  return (
    <section>
      <h2 className="font-bold text-base mb-3">Experience</h2>
      <div className="space-y-3">
        {EXPERIENCE.map((exp) => (
          <div key={exp.id} className="bg-gray-900/20 rounded-lg p-3 hover:opacity-90 transition-opacity">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-sm">{exp.company}</h3>
              <span className="opacity-50 text-xs">{exp.periodShort}</span>
            </div>
            <p className="opacity-70 text-xs mb-1">{exp.position}</p>
            <ul className="text-xs">
              <li>• {exp.descriptionShort}</li>
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
})

// Education Component
export const Education = memo(function Education({ className = '', style }: SectionProps) {
  return (
    <section className={className} style={style}>
      <h2 className="font-bold" style={{
        fontSize: 'clamp(0.875rem, 2vh, 1.125rem)',
        marginBottom: 'clamp(0.375rem, 0.75vh, 0.625rem)'
      }}>Education</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.375rem, 0.75vh, 0.625rem)' }}>
        {EDUCATION.map((edu) => (
          <div key={edu.id} className="hover:opacity-90 transition-opacity">
            <div className="flex justify-between items-start" style={{ marginBottom: 'clamp(0.125rem, 0.25vh, 0.25rem)' }}>
              <h3 className="font-semibold" style={{ fontSize: 'clamp(0.8125rem, 1.375vh, 0.9375rem)' }}>{edu.institution}</h3>
              <span className="opacity-50" style={{ fontSize: 'clamp(0.6875rem, 1.125vh, 0.8125rem)' }}>{edu.period}</span>
            </div>
            <p className="opacity-70" style={{ fontSize: 'clamp(0.6875rem, 1.125vh, 0.8125rem)' }}>{edu.degree} • {edu.location}</p>
          </div>
        ))}
      </div>
    </section>
  )
})

// Mobile Education (simplified)
export const MobileEducation = memo(function MobileEducation() {
  const primaryEducation = EDUCATION[0]
  return (
    <section>
      <h2 className="font-bold text-base mb-3">Education</h2>
      <div className="bg-gray-900/20 rounded-lg p-3 hover:opacity-90 transition-opacity">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-sm">{primaryEducation.institutionShort}</h3>
          <span className="opacity-50 text-xs">{primaryEducation.period}</span>
        </div>
        <p className="opacity-70 text-xs">{primaryEducation.degreeShort}</p>
      </div>
    </section>
  )
})

// Skills Component
export const Skills = memo(function Skills({ className = '', style }: SectionProps) {
  return (
    <section className={className} style={style}>
      <h2 className="font-bold" style={{
        fontSize: 'clamp(0.875rem, 2vh, 1.125rem)',
        marginBottom: 'clamp(0.375rem, 0.75vh, 0.625rem)'
      }}>Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{
        gap: 'clamp(0.25rem, 0.5vh, 0.5rem)'
      }}>
        {Object.values(SKILLS).map((skill) => (
          <div key={skill.label} className="hover:opacity-90 transition-opacity" style={{ fontSize: 'clamp(0.6875rem, 1.125vh, 0.8125rem)' }}>
            <span className="opacity-50">{skill.label}:</span> {formatList(skill.items, ', ')}
          </div>
        ))}
      </div>
    </section>
  )
})

// Mobile Skills (simplified)
export const MobileSkills = memo(function MobileSkills() {
  return (
    <section>
      <h2 className="font-bold text-base mb-3">Skills</h2>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {Object.values(SKILLS).map((skill) => (
          <div key={skill.label} className="bg-gray-900/20 rounded p-2">
            <span className="opacity-50">{skill.label}:</span><br />
            {formatList(skill.items, ', ')}
          </div>
        ))}
      </div>
    </section>
  )
})

// Sidequests Component
export const Sidequests = memo(function Sidequests({ className = '', style }: SectionProps) {
  return (
    <section className={`flex-1 overflow-hidden ${className}`} style={{ minHeight: 0, ...style }}>
      <h2 className="font-bold" style={{
        fontSize: 'clamp(0.875rem, 2vh, 1.125rem)',
        marginBottom: 'clamp(0.375rem, 0.75vh, 0.625rem)'
      }}>Sidequests</h2>
      <div
        className="grid grid-cols-1 h-full overflow-hidden"
        style={{
          gap: 'clamp(0.375rem, 0.75vh, 0.625rem)',
          alignContent: 'start'
        }}
      >
        {SIDEQUESTS.map((project) => (
          <div key={project.id} className="hover:opacity-90 transition-opacity">
            <h3 className="font-semibold" style={{
              marginBottom: 'clamp(0.125rem, 0.25vh, 0.25rem)',
              fontSize: 'clamp(0.8125rem, 1.375vh, 0.9375rem)'
            }}>{project.title}</h3>
            <ul style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(0.0625rem, 0.125vh, 0.1875rem)'
            }}>
              {project.items.map((item, idx) => (
                <li key={idx} className="opacity-80" style={{
                  fontSize: 'clamp(0.6875rem, 1.125vh, 0.8125rem)'
                }}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
})

// Mobile Sidequests (all items)
export const MobileSidequests = memo(function MobileSidequests() {
  return (
    <section>
      <h2 className="font-bold text-base mb-3">Sidequests</h2>
      <div className="space-y-3">
        {SIDEQUESTS.map((project) => (
          <div key={project.id} className="bg-gray-900/20 rounded-lg p-3 hover:opacity-90 transition-opacity">
            <h3 className="font-semibold text-sm mb-1">{project.title}</h3>
            <ul className="text-xs space-y-1">
              <li className="opacity-80">• {project.items[0]}</li>
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
})

// Desktop Sidebar
export const DesktopSidebar = memo(function DesktopSidebar() {
  return (
    <div className="hidden lg:block lg:col-span-2 xl:col-span-2 overflow-hidden">
      <div className="sticky top-4 space-y-6">
        {/* Quick contact */}
        <div>
          <h3 className="font-bold opacity-50 mb-3">CONTACT</h3>
          <div className="space-y-1">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="block hover:opacity-80 transition-opacity cursor-pointer"
              aria-label={`Email ${PERSONAL_INFO.name}`}
            >
              {PERSONAL_INFO.email}
            </a>
            <div>{PERSONAL_INFO.location}</div>
            <a
              href={PERSONAL_INFO.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-80 transition-opacity cursor-pointer"
              aria-label={`Visit ${PERSONAL_INFO.name}'s LinkedIn profile`}
            >
              {PERSONAL_INFO.linkedin.display}
            </a>
          </div>
        </div>

        {/* Skills overview */}
        <div>
          <h3 className="font-bold opacity-50 mb-3">STACK</h3>
          <div className="space-y-1">
            {Object.values(SKILLS).map((skill) => (
              <div key={skill.label}>{formatList(skill.items)}</div>
            ))}
          </div>
        </div>

        {/* Current status */}
        <div>
          <h3 className="font-bold opacity-50 mb-3">STATUS</h3>
          <div>
            <div className="mb-1">{PERSONAL_INFO.title}</div>
            <div className="opacity-60">@ {PERSONAL_INFO.currentCompany}</div>
            <div className="opacity-40 mt-2">{EXPERIENCE[0].period}</div>
          </div>
        </div>

        {/* Education quick */}
        <div>
          <h3 className="font-bold opacity-50 mb-3">EDUCATION</h3>
          <div>
            <div className="mb-1">{EDUCATION[0].institutionShort}</div>
            <div className="opacity-60">{EDUCATION[0].degreeShort}</div>
            <div className="opacity-40">{EDUCATION[0].period}</div>
          </div>
        </div>

        {/* Recent work */}
        <div>
          <h3 className="font-bold opacity-50 mb-3">RECENT</h3>
          <div className="space-y-3">
            {RECENT_WORK.map((work) => (
              <div key={work.id}>
                <div className="mb-1">{work.title}</div>
                <div className="opacity-60">{work.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="font-bold opacity-50 mb-3">CERTS</h3>
          <div className="space-y-1">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert}>{cert}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

// Theme Toggle Button
interface ThemeToggleProps {
  isDark: boolean
  onToggle: () => void
  isMobile?: boolean
}

export const ThemeToggle = memo(function ThemeToggle({ isDark, onToggle, isMobile = false }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`fixed ${isMobile ? 'top-4 right-4 text-xs' : 'top-6 right-6 text-sm'} opacity-50 hover:opacity-100 transition-opacity z-10`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? 'light' : 'dark'}
    </button>
  )
})
