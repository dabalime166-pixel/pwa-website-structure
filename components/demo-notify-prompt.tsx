'use client'

import { useEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import type { NotifyUiVariant } from '@/lib/device-profile'

export interface DemoNotifyCopy {
  eyebrow: string
  title: string
  text: string
  allowLabel: string
  skipLabel: string
  legal: string
  perk1: string
  perk2: string
  perk3: string
  iosTitle: string
  iosBody: string
  iosStepShare: string
  iosStepAdd: string
  iosStepOpen: string
  iosContinueLabel: string
  iosShareHint: string
}

interface DemoNotifyPromptProps {
  open: boolean
  variant: NotifyUiVariant
  gameName: string
  copy: DemoNotifyCopy
  busy?: boolean
  onAllow: () => void
  onSkip: () => void
}

function BellIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M8 7l4-4 4 4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function DemoNotifyPrompt({
  open,
  variant,
  gameName,
  copy,
  busy = false,
  onAllow,
  onSkip,
}: DemoNotifyPromptProps) {
  const titleId = useId()
  const descId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !busy) onSkip()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onSkip, busy])

  if (!open) return null

  const isSheet = variant === 'mobile' || variant === 'ios-browser' || variant === 'ios-pwa'
  const isIosGuide = variant === 'ios-browser'

  const shellClass = [
    'demo-notify',
    isSheet ? 'demo-notify--sheet' : 'demo-notify--dialog',
    variant === 'mobile' ? 'demo-notify--android' : '',
    variant === 'ios-pwa' ? 'demo-notify--ios-pwa' : '',
    isIosGuide ? 'demo-notify--ios-guide' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const panel = (
    <div
      className={shellClass}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <button
        type="button"
        className="demo-notify__backdrop"
        aria-label={copy.skipLabel}
        onClick={busy ? undefined : onSkip}
        disabled={busy}
      />

      <div className="demo-notify__panel">
        {isSheet ? <div className="demo-notify__grab" aria-hidden="true" /> : null}

        <div className="demo-notify__glow" aria-hidden="true" />
        <div className="demo-notify__shine" aria-hidden="true" />

        {!isIosGuide ? (
          <div className="demo-notify__icon" aria-hidden="true">
            <BellIcon />
          </div>
        ) : null}

        <p className="demo-notify__eyebrow">{copy.eyebrow}</p>
        <h2 id={titleId} className="demo-notify__title">
          {isIosGuide ? copy.iosTitle : copy.title.replace('{game}', gameName)}
        </h2>

        {isIosGuide ? (
          <p id={descId} className="demo-notify__text">
            {copy.iosBody.replace('{game}', gameName)}
          </p>
        ) : null}

        {isIosGuide ? (
          <ol className="demo-notify__steps" role="list">
            <li>
              <span className="demo-notify__step-badge demo-notify__step-badge--icon">
                <ShareIcon />
              </span>
              <span>{copy.iosStepShare}</span>
            </li>
            <li>
              <span className="demo-notify__step-badge">2</span>
              <span>{copy.iosStepAdd}</span>
            </li>
            <li>
              <span className="demo-notify__step-badge">3</span>
              <span>{copy.iosStepOpen}</span>
            </li>
          </ol>
        ) : (
          <>
            <p id={descId} className="demo-notify__text">
              {copy.text}
            </p>
            <ul className="demo-notify__perks" role="list">
              <li>{copy.perk1}</li>
              <li>{copy.perk2}</li>
              <li>{copy.perk3}</li>
            </ul>
          </>
        )}

        {isIosGuide ? (
          <p className="demo-notify__hint" aria-hidden="true">
            {copy.iosShareHint}
          </p>
        ) : null}

        <div className="demo-notify__actions">
          {!isIosGuide ? (
            <button
              type="button"
              className="btn-cta demo-notify__allow"
              onClick={onAllow}
              disabled={busy}
              aria-busy={busy}
            >
              <BellIcon />
              {busy ? '…' : copy.allowLabel}
            </button>
          ) : null}
          <button
            type="button"
            className={isIosGuide ? 'btn-cta demo-notify__allow' : 'btn-ghost demo-notify__skip'}
            onClick={onSkip}
            disabled={busy}
          >
            {isIosGuide ? copy.iosContinueLabel : copy.skipLabel}
          </button>
        </div>

        {!isIosGuide ? <p className="demo-notify__legal">{copy.legal}</p> : null}
      </div>
    </div>
  )

  if (typeof document === 'undefined') return panel
  return createPortal(panel, document.body)
}
