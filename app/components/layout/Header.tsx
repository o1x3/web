'use client'

import { memo } from 'react'
import { PERSONAL_INFO } from '../../data'

export const Header = memo(function Header() {
  return (
    <header className="hero-section">
      <h1 className="hero-name">{PERSONAL_INFO.name}</h1>
      <div className="hero-title">
        <span>{PERSONAL_INFO.title}</span>
        <span className="hero-separator">·</span>
        <span className="hero-org">{PERSONAL_INFO.currentCompany}</span>
      </div>
    </header>
  )
})
