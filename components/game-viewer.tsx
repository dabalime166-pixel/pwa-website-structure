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
            flex: 1,
            gap: '0',
            position: 'relative',
            overflow: 'hidden',
            padding: '2rem 1rem',
          }}
        >
          {/* Decorative background elements */}
          <div
            style={{
              position: 'absolute',
              width: 'clamp(200px, 40vw, 300px)',
              height: 'clamp(200px, 40vw, 300px)',
              background: 'radial-gradient(circle, rgba(218, 165, 32, 0.08) 0%, transparent 70%)',
              borderRadius: '50%',
              top: '-50%',
              left: '-20%',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 'clamp(150px, 35vw, 250px)',
              height: 'clamp(150px, 35vw, 250px)',
              background: 'radial-gradient(circle, rgba(218, 165, 32, 0.05) 0%, transparent 70%)',
              borderRadius: '50%',
              bottom: '-30%',
              right: '-10%',
              pointerEvents: 'none',
            }}
          />

          {/* Content container - properly centered */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: 'clamp(300px, 90vw, 500px)',
            }}
          >
            {/* Play icon accent */}
            <div
              style={{
                width: 'clamp(60px, 15vw, 80px)',
                height: 'clamp(60px, 15vw, 80px)',
                marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
                background: 'linear-gradient(135deg, rgba(218, 165, 32, 0.2) 0%, rgba(218, 165, 32, 0.1) 100%)',
                border: '2px solid rgba(218, 165, 32, 0.3)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg
                width="clamp(30px, 10vw, 40px)"
                height="clamp(30px, 10vw, 40px)"
                viewBox="0 0 24 24"
                fill="var(--color-gold)"
                aria-hidden="true"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>

            {/* Title and description */}
            <h3
              style={{
                fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: 'clamp(0.5rem, 2vw, 0.75rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              {readyTitle}
            </h3>
            <p
              style={{
                fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                color: 'var(--color-text-secondary)',
                marginBottom: 'clamp(1.5rem, 5vw, 2.5rem)',
                lineHeight: 1.5,
              }}
            >
              {readyDescription}
            </p>

            {/* Launch button */}
            <button
              onClick={launchDemo}
              style={{
                padding: 'clamp(0.75rem, 2vw, 1.125rem) clamp(1.5rem, 5vw, 3rem)',
                background: 'linear-gradient(135deg, var(--color-gold) 0%, #f4d03f 100%)',
                color: 'var(--color-bg-primary)',
                border: 'none',
                borderRadius: '0.75rem',
                fontSize: 'clamp(0.95rem, 2.5vw, 1.0625rem)',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 24px rgba(218, 165, 32, 0.35)',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
                flexShrink: 0,
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
                <svg width="1.3em" height="1.3em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
