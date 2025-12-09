'use client'

import { memo, ReactNode } from 'react'

interface TagProps {
  children: ReactNode
  variant?: 'default' | 'accent'
  className?: string
  onClick?: () => void
}

export const Tag = memo(function Tag({
  children,
  variant = 'default',
  className = '',
  onClick,
}: TagProps) {
  const variantClass = variant === 'accent' ? 'tag-accent' : ''

  return (
    <span
      className={`tag ${variantClass} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </span>
  )
})

interface TagListProps {
  tags: string[]
  variant?: 'default' | 'accent'
  className?: string
}

export const TagList = memo(function TagList({
  tags,
  variant = 'default',
  className = '',
}: TagListProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <Tag key={tag} variant={variant}>
          {tag}
        </Tag>
      ))}
    </div>
  )
})
