'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { CasinoInviteModal } from '@/components/casino-invite-modal'
import type { CasinoInviteCopy } from '@/components/casino-invite-modal'
import { CTA_URL } from '@/lib/games'

const INVITE_DELAY_MS = 2 * 60 * 1000

interface GameViewerProps {
  iframeUrl: string
  gameName: string
  gameSlug: string
  demoBadge: string
  fullscreenLabel: string
  closeLabel: string
  launchLabel?: string
  readyTitle?: string
  readyDescription?: string
  inviteCopy: CasinoInviteCopy
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

function getFullscreenElement(): Element | null {
  const doc = document as Document & {
    webkitFullscreenElement?: Element | null
  }
  return document.fullscreenElement ?? doc.webkitFullscreenElement ?? null
}

async function requestFs(el: HTMLElement): Promise<boolean> {
  const node = el as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void> | void
  }
  try {
    if (el.requestFullscreen) {
      await el.requestFullscreen()
      return true
    }
    if (node.webkitRequestFullscreen) {
      await node.webkitRequestFullscreen()
      return true
    }
  } catch {
    return false
  }
  return false
}

async function exitFs(): Promise<void> {
  const doc = document as Document & {
    webkitExitFullscreen?: () => Promise<void> | void
  }
  try {
    if (getFullscreenElement() && document.exitFullscreen) {
      await document.exitFullscreen()
    } else if (doc.webkitExitFullscreen) {
      await doc.webkitExitFullscreen()
    }
  } catch {
    /* ignore */
  }
}

function inviteStorageKey(slug: string) {
  return `1weapp-casino-invite-shown:${slug}`
}

export function GameViewer({
  iframeUrl,
  gameName,
  gameSlug,
  demoBadge,
  fullscreenLabel,
  closeLabel,
  launchLabel = 'Launch Demo',
  readyTitle = 'Ready to Play?',
  readyDescription = 'Click the button below to launch the demo',
  inviteCopy,
}: GameViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [iframeLaunched, setIframeLaunched] = useState(false)
  const [cssFallback, setCssFallback] = useState(false)
  const [inviteOpen, setInviteOpen] = useState(false)
  const shellRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sync = () => {
      const el = shellRef.current
      const native = Boolean(el && getFullscreenElement() === el)
      if (native) {
        setCssFallback(false)
        setIsFullscreen(true)
        return
      }
      if (!cssFallback) setIsFullscreen(false)
    }

    document.addEventListener('fullscreenchange', sync)
    document.addEventListener('webkitfullscreenchange', sync)
    return () => {
      document.removeEventListener('fullscreenchange', sync)
      document.removeEventListener('webkitfullscreenchange', sync)
    }
  }, [cssFallback])

  useEffect(() => {
    if (!cssFallback) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCssFallback(false)
        setIsFullscreen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [cssFallback])

  // After 2 minutes of demo play, show casino invite once per session/game
  useEffect(() => {
    if (!iframeLaunched) return
    try {
      if (sessionStorage.getItem(inviteStorageKey(gameSlug)) === '1') return
    } catch {
      /* private mode */
    }

    const timer = window.setTimeout(() => {
      setInviteOpen(true)
    }, INVITE_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [iframeLaunched, gameSlug])

  const openFullscreen = useCallback(async () => {
    const el = shellRef.current
    if (!el) return
    const ok = await requestFs(el)
    if (ok) {
      setIsFullscreen(true)
      setCssFallback(false)
      return
    }
    setCssFallback(true)
    setIsFullscreen(true)
  }, [])

  const closeFullscreen = useCallback(async () => {
    if (getFullscreenElement()) await exitFs()
    setCssFallback(false)
    setIsFullscreen(false)
  }, [])

  const launchDemo = useCallback(() => setIframeLaunched(true), [])

  const dismissInvite = useCallback(() => {
    setInviteOpen(false)
    try {
      sessionStorage.setItem(inviteStorageKey(gameSlug), '1')
    } catch {
      /* ignore */
    }
  }, [gameSlug])

  const shellClass = [
    'game-frame-shell',
    isFullscreen && cssFallback ? 'game-frame-shell--fs' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const nativeFs = isFullscreen && !cssFallback

  return (
    <div
      ref={shellRef}
      className={shellClass}
      role="region"
      aria-label={`${gameName} game window`}
    >
      <div className="game-frame-bar">
        <GoldDots />
        <span className="game-frame-bar__title">
          {gameName}
          <span className="game-frame-bar__badge">{demoBadge}</span>
        </span>
        {iframeLaunched ? (
          <button
            type="button"
            onClick={isFullscreen ? closeFullscreen : openFullscreen}
            className="btn-fullscreen"
            aria-label={isFullscreen ? closeLabel : fullscreenLabel}
          >
            {isFullscreen ? <ShrinkIcon /> : <FullscreenIcon />}
            {isFullscreen ? closeLabel : fullscreenLabel}
          </button>
        ) : (
          <span className="game-frame-bar__spacer" aria-hidden="true" />
        )}
      </div>

      {!iframeLaunched ? (
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
            <button
              type="button"
              onClick={launchDemo}
              className="btn-cta game-launch__btn"
              aria-label={launchLabel}
            >
              <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              {launchLabel}
            </button>
          </div>
        </div>
      ) : (
        <div className="game-frame-body">
          <iframe
            src={iframeUrl}
            title={`${gameName} ${demoBadge}`}
            allow="autoplay; fullscreen"
            allowFullScreen
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      )}

      <CasinoInviteModal
        open={inviteOpen}
        gameName={gameName}
        ctaUrl={CTA_URL}
        copy={inviteCopy}
        inline={nativeFs || cssFallback}
        onDismiss={dismissInvite}
      />
    </div>
  )
}
