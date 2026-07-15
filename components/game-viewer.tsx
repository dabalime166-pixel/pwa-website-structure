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

  /* ── Fullscreen overlay ── */
  if (isFullscreen) {
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
          <button
            onClick={closeFullscreen}
            className="btn-fullscreen"
            aria-label={closeLabel}
          >
            <ShrinkIcon />
            {closeLabel}
          </button>
        </div>
        {IframeEl}
      </div>
    )
  }

  /* ── Launch screen (before demo is activated) ── */
  if (!iframeLaunched) {
    return (
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
          <div style={{ width: 60 }} />
        </div>

        {/* Launch button screen */}
        <div
          className="game-frame-body"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '500px',
            gap: '0',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative background elements */}
          <div
            style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(218, 165, 32, 0.08) 0%, transparent 70%)',
              borderRadius: '50%',
              top: '-100px',
              left: '-50px',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '250px',
              height: '250px',
              background: 'radial-gradient(circle, rgba(218, 165, 32, 0.05) 0%, transparent 70%)',
              borderRadius: '50%',
              bottom: '-80px',
              right: '-30px',
              pointerEvents: 'none',
            }}
          />

          {/* Content container */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 2rem' }}>
            {/* Play icon accent */}
            <div
              style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 2rem',
                background: 'linear-gradient(135deg, rgba(218, 165, 32, 0.2) 0%, rgba(218, 165, 32, 0.1) 100%)',
                border: '2px solid rgba(218, 165, 32, 0.3)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--color-gold)" aria-hidden="true">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>

            {/* Title and description */}
            <h3
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '0.75rem',
                letterSpacing: '-0.02em',
              }}
            >
              {readyTitle}
            </h3>
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--color-text-secondary)',
                marginBottom: '2.5rem',
                maxWidth: '320px',
              }}
            >
              {readyDescription}
            </p>

            {/* Launch button */}
            <button
              onClick={launchDemo}
              style={{
                padding: '1.125rem 3rem',
                background: 'linear-gradient(135deg, var(--color-gold) 0%, #f4d03f 100%)',
                color: 'var(--color-bg-primary)',
                border: 'none',
                borderRadius: '0.75rem',
                fontSize: '1.0625rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 24px rgba(218, 165, 32, 0.35)',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(218, 165, 32, 0.45)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(218, 165, 32, 0.35)'
              }}
              aria-label={launchLabel}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                {launchLabel}
              </span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ── Normal embedded view (after launch) ── */
  return (
    <div className="game-frame-shell" role="region" aria-label={`${gameName} game window`}>
      {/* Title bar */}
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
        <button
          onClick={openFullscreen}
          className="btn-fullscreen"
          aria-label={fullscreenLabel}
        >
          <FullscreenIcon />
          {fullscreenLabel}
        </button>
      </div>

      {/* Iframe body */}
      <div className="game-frame-body">
        {IframeEl}
      </div>
    </div>
  )
}
