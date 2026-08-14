'use client'

import { useEffect, useId } from 'react'
import { createPortal } from 'react-dom'

import { ctaAnchorProps } from '@/lib/continue'

export interface CasinoInviteCopy {
  eyebrow: string
  title: string
  text: string
  ctaLabel: string
  dismissLabel: string
  legal: string
  perk1: string
  perk2: string
  perk3: string
}

interface CasinoInviteModalProps {
  open: boolean
  gameName: string
  ctaUrl: string
  copy: CasinoInviteCopy
  /** When true, render inside current tree (needed for native fullscreen) */
  inline?: boolean
  onDismiss: () => void
}

export function CasinoInviteModal({
  open,
  gameName,
  ctaUrl,
  copy,
  inline = false,
  onDismiss,
}: CasinoInviteModalProps) {
  const titleId = useId()
  const descId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    if (!inline) document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      if (!inline) document.body.style.overflow = prev
    }
  }, [open, onDismiss, inline])

  if (!open) return null

  const modal = (
    <div
      className={`casino-invite${inline ? ' casino-invite--inline' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <button
        type="button"
        className="casino-invite__backdrop"
        aria-label={copy.dismissLabel}
        onClick={onDismiss}
      />

      <div className="casino-invite__panel">
        <div className="casino-invite__glow" aria-hidden="true" />
        <div className="casino-invite__shine" aria-hidden="true" />

        <button
          type="button"
          className="casino-invite__close"
          onClick={onDismiss}
          aria-label={copy.dismissLabel}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <p className="casino-invite__eyebrow">{copy.eyebrow}</p>
        <h2 id={titleId} className="casino-invite__title">
          {copy.title.replace('{game}', gameName)}
        </h2>
        <p id={descId} className="casino-invite__text">
          {copy.text.replace('{game}', gameName)}
        </p>

        <ul className="casino-invite__perks" role="list">
          <li>{copy.perk1}</li>
          <li>{copy.perk2}</li>
          <li>{copy.perk3}</li>
        </ul>

        <div className="casino-invite__actions">
          <a
            {...ctaAnchorProps(ctaUrl)}
            className="btn-cta casino-invite__cta"
            onClick={onDismiss}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            {copy.ctaLabel}
          </a>
          <button type="button" className="btn-ghost casino-invite__dismiss" onClick={onDismiss}>
            {copy.dismissLabel}
          </button>
        </div>

        <p className="casino-invite__legal">{copy.legal}</p>
      </div>
    </div>
  )

  if (inline || typeof document === 'undefined') return modal
  return createPortal(modal, document.body)
}
