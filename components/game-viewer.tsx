'use client'

import { useState, useCallback } from 'react'
import { requestPushAndSubscribe } from '@/lib/push-client'
import { IosInstallSheet } from '@/components/ios-install-sheet'

interface GameViewerProps {
  iframeUrl: string
  gameName: string
  demoBadge: string
  fullscreenLabel: string
  closeLabel: string
  startLabel: string
  startHint: string
  iosInstallTitle: string
  iosInstallBody: string
  iosStepShare: string
  iosStepAdd: string
  iosStepOpen: string
  iosContinueLabel: string
  iosShareHint: string
  lang?: string
  gameSlug?: string
}

export function GameViewer({
  iframeUrl,
  gameName,
  demoBadge,
  fullscreenLabel,
  closeLabel,
  startLabel,
  startHint,
  iosInstallTitle,
  iosInstallBody,
  iosStepShare,
  iosStepAdd,
  iosStepOpen,
  iosContinueLabel,
  iosShareHint,
  lang,
  gameSlug,
}: GameViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [started, setStarted] = useState(false)
  const [starting, setStarting] = useState(false)
  const [showIosInstall, setShowIosInstall] = useState(false)

  const openFullscreen = useCallback(() => setIsFullscreen(true), [])
  const closeFullscreen = useCallback(() => setIsFullscreen(false), [])

  const launchDemo = useCallback(() => {
    setShowIosInstall(false)
    setStarted(true)
    setStarting(false)
  }, [])

  const onStartClick = useCallback(async () => {
    if (starting || started) return
    setStarting(true)
    const result = await requestPushAndSubscribe({ lang, gameSlug })
    if (result.status === 'needs_ios_install') {
      setShowIosInstall(true)
      setStarting(false)
      return
    }
    setStarted(true)
    setStarting(false)
  }, [starting, started, lang, gameSlug])

  const IframeEl = (
    <iframe
      src={iframeUrl}
      title={`${gameName} ${demoBadge}`}
      allow="autoplay; fullscreen"
      loading="lazy"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
    />
  )

  const FullscreenIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  )

  const ShrinkIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 14 10 14 10 20" />
      <polyline points="20 10 14 10 14 4" />
      <line x1="10" y1="14" x2="3" y2="21" />
      <line x1="21" y1="3" x2="14" y2="10" />
    </svg>
  )

  const GoldDots = () => (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      {['var(--color-gold-light)', 'var(--color-gold)', 'var(--color-gold-dim)'].map((c, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.8 }}
        />
      ))}
    </div>
  )

  if (isFullscreen && started) {
    return (
      <div className="game-fullscreen-overlay" role="dialog" aria-modal="true" aria-label={`${gameName} fullscreen`}>
        <div className="game-frame-bar">
          <GoldDots />
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: 'var(--color-gold)',
              letterSpacing: '0.04em',
            }}
          >
            {gameName}
          </span>
          <button onClick={closeFullscreen} className="btn-fullscreen" aria-label={closeLabel}>
            <ShrinkIcon />
            {closeLabel}
          </button>
        </div>
        {IframeEl}
      </div>
    )
  }

  return (
    <>
      <div className="game-frame-shell" role="region" aria-label={`${gameName} game window`}>
        <div className="game-frame-bar">
          <GoldDots />
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: 'var(--color-gold)',
              letterSpacing: '0.04em',
            }}
          >
            {gameName}
            <span
              style={{
                marginLeft: '0.5rem',
                fontSize: '0.6875rem',
                fontWeight: 400,
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {demoBadge}
            </span>
          </span>
          {started && (
            <button onClick={openFullscreen} className="btn-fullscreen" aria-label={fullscreenLabel}>
              <FullscreenIcon />
              {fullscreenLabel}
            </button>
          )}
        </div>

        <div className="game-frame-body" style={{ position: 'relative' }}>
          {started ? (
            IframeEl
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                padding: '1.5rem',
                textAlign: 'center',
                background:
                  'radial-gradient(ellipse at 50% 40%, rgba(201,162,39,0.12) 0%, transparent 55%), linear-gradient(180deg, #0d0e12 0%, #161618 100%)',
              }}
            >
              <p
                style={{
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.9375rem',
                  maxWidth: '22rem',
                  lineHeight: 1.6,
                }}
              >
                {startHint}
              </p>
              <button
                type="button"
                className="btn-cta"
                onClick={onStartClick}
                disabled={starting}
                aria-busy={starting}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                {starting ? '…' : startLabel}
              </button>
            </div>
          )}
        </div>
      </div>

      <IosInstallSheet
        open={showIosInstall}
        title={iosInstallTitle}
        body={iosInstallBody}
        stepShare={iosStepShare}
        stepAdd={iosStepAdd}
        stepOpen={iosStepOpen}
        continueLabel={iosContinueLabel}
        shareHint={iosShareHint}
        onContinue={launchDemo}
      />
    </>
  )
}
