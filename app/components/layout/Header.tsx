'use client'

import { memo } from 'react'
import { PERSONAL_INFO, SUMMARY } from '../../data'

export const Header = memo(function Header() {
  return (
    <header className="header">
      <h1 className="header-name">{PERSONAL_INFO.name}</h1>
      <p className="header-title">{PERSONAL_INFO.title}</p>
      <p className="header-bio">{SUMMARY}</p>
    </header>
  )
})
