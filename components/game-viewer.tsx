'use client'

import { useState, useCallback } from 'react'

interface GameViewerProps {
  iframeUrl: string
  gameName: string
  demoBadge: string
  fullscreenLabel: string
  closeLabel: string
  launchLabel?: string
  readyTitle?: string
  readyDescription?: string
}

function GoldDots() {
  return (
    <div className="game-frame-dots" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  )
}

function FullscreenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  )
}

function ShrinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 14 10 14 10 20" />
      <polyline points="20 10 14 10 14 4" />
      <line x1="10" y1="14" x2="3" y2="21" />
      <line x1="21" y1="3" x2="14" y2="10" />
    </svg>
  )
}

export function GameViewer({
  iframeUrl,
  gameName,
  demoBadge,
  fullscreenLabel,
  closeLabel,
  launchLabel = 'Launch Demo',
  readyTitle = 'Ready to Play?',
  readyDescription = 'Click the button below to launch the demo',
}: GameViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [iframeLaunched, setIframeLaunched] = useState(false)

  const openFullscreen = useCallback(() => setIsFullscreen(true), [])
  const closeFullscreen = useCallback(() => setIsFullscreen(false), [])
  const launchDemo = useCallback(() => setIframeLaunched(true), [])

  const IframeEl = (
    <iframe
      src={iframeUrl}
      title={`${gameName} ${demoBadge}`}
      allow="autoplay; fullscreen"
      loading="lazy"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
    />
  )

  if (isFullscreen) {
    return (
      <div className="game-fullscreen-overlay" role="dialog" aria-modal="true" aria-label={`${gameName} fullscreen`}>
        <div className="game-frame-bar">
          <GoldDots />
          <span className="game-frame-bar__title">{gameName}</span>
          <button onClick={closeFullscreen} className="btn-fullscreen" aria-label={closeLabel}>
            <ShrinkIcon />
            {closeLabel}
          </button>
        </div>
        {IframeEl}
      </div>
    )
  }

  if (!iframeLaunched) {
    return (
      <div className="game-frame-shell" role="region" aria-label={`${gameName} game window`}>
        <div className="game-frame-bar">
          <GoldDots />
          <span className="game-frame-bar__title">
            {gameName}
            <span className="game-frame-bar__badge">{demoBadge}</span>
          </span>
          <span className="game-frame-bar__spacer" aria-hidden="true" />
        </div>

        <div className="game-frame-body game-frame-body--launch">
          <div className="game-launch" aria-hidden="true">
            <div className="game-launch__orb game-launch__orb--a" />
            <div className="game-launch__orb game-launch__orb--b" />
          </div>

          <div className="game-launch__content">
            <div className="game-launch__play" aria-hidden="true">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="var(--color-gold)">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <h3 className="game-launch__title">{readyTitle}</h3>
            <p className="game-launch__desc">{readyDescription}</p>
            <button onClick={launchDemo} className="btn-cta game-launch__btn" aria-label={launchLabel}>
              <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              {launchLabel}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="game-frame-shell" role="region" aria-label={`${gameName} game window`}>
      <div className="game-frame-bar">
        <GoldDots />
        <span className="game-frame-bar__title">
          {gameName}
          <span className="game-frame-bar__badge">{demoBadge}</span>
        </span>
        <button onClick={openFullscreen} className="btn-fullscreen" aria-label={fullscreenLabel}>
          <FullscreenIcon />
          {fullscreenLabel}
        </button>
      </div>

      <div className="game-frame-body">{IframeEl}</div>
    </div>
  )
}
