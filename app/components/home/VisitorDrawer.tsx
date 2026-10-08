'use client'

import { useEffect, useRef, useState } from 'react'
import { drawFingerprint } from './fingerprint'

export function VisitorDrawer() {
  const dialog = useRef<HTMLDialogElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const [print, setPrint] = useState('')

  useEffect(() => {
    const open = () => {
      if (dialog.current?.open) return
      previousFocus.current = document.activeElement as HTMLElement
      setPrint(drawFingerprint())
      dialog.current?.showModal()
      document.documentElement.classList.add('visitor-open')
    }
    window.addEventListener('open-visitor', open)
    return () => {
      window.removeEventListener('open-visitor', open)
      document.documentElement.classList.remove('visitor-open')
    }
  }, [])

  const close = () => dialog.current?.close()
  return <dialog ref={dialog} className="visitor-drawer" aria-labelledby="visitor-heading" onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close() } }} onClose={() => { document.documentElement.classList.remove('visitor-open'); previousFocus.current?.focus({ preventScroll: true }) }}>
    <div className="visitor-drawer-heading"><h2 id="visitor-heading">░▒▓ you</h2><button type="button" onClick={close} autoFocus>× close</button></div>
    <pre className="visitor-fingerprint" role="img" aria-label="A dithered fingerprint drawn locally from this tab's screen, language, time zone and rendering capabilities">{print}</pre>
    <div className="visitor-drawer-description"><p>drawn from what this tab can read: screen, language, time zone, graphics, fonts. nothing is sent or stored.</p><a href="https://coveryourtracks.eff.org/" target="_blank" rel="noopener noreferrer">eff · cover your tracks ↗</a></div>
  </dialog>
}
