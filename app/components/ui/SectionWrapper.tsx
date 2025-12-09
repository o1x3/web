'use client'

import { memo, useEffect, useRef, useState, ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  title?: string
  className?: string
  id?: string
  staggerChildren?: boolean
}

export const SectionWrapper = memo(function SectionWrapper({
  children,
  title,
  className = '',
  id,
  staggerChildren = true,
}: SectionWrapperProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
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
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`section animate-on-scroll ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {title && (
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <div className="section-line" />
        </div>
      )}
      <div className={staggerChildren ? 'stagger-children' : ''}>
        {children}
      </div>
    </section>
  )
})
