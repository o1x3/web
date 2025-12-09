'use client'

import { memo, useState, ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  expandable?: boolean
  defaultExpanded?: boolean
  onClick?: () => void
}

export const Card = memo(function Card({
  children,
  className = '',
  expandable = false,
  defaultExpanded = false,
  onClick,
}: CardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const handleClick = () => {
    if (expandable) {
      setIsExpanded(!isExpanded)
    }
    onClick?.()
  }

  return (
    <div
      className={`bento-card ${expandable ? 'bento-card-expandable bento-card-interactive' : ''} ${isExpanded ? 'expanded' : ''} ${className}`}
      onClick={expandable ? handleClick : onClick}
      role={expandable || onClick ? 'button' : undefined}
      tabIndex={expandable || onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && (expandable || onClick)) {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      <div className="bento-card-accent" />
      {children}
    </div>
  )
})

interface CardHeaderProps {
  title: string
  subtitle?: string
  meta?: string
}

export const CardHeader = memo(function CardHeader({
  title,
  subtitle,
  meta,
}: CardHeaderProps) {
  return (
    <div className="bento-card-header">
      <h3 className="bento-card-title">{title}</h3>
      {subtitle && <p className="bento-card-subtitle">{subtitle}</p>}
      {meta && <p className="bento-card-meta">{meta}</p>}
    </div>
  )
})

interface CardContentProps {
  children: ReactNode
}

export const CardContent = memo(function CardContent({ children }: CardContentProps) {
  return <div className="bento-card-content">{children}</div>
})

interface CardToggleProps {
  isExpanded: boolean
  expandedText?: string
  collapsedText?: string
}

export const CardToggle = memo(function CardToggle({
  isExpanded,
  expandedText = 'Show less',
  collapsedText = 'Show more',
}: CardToggleProps) {
  return (
    <div className="bento-card-toggle">
      <span>{isExpanded ? '−' : '+'}</span>
      <span>{isExpanded ? expandedText : collapsedText}</span>
    </div>
  )
})
