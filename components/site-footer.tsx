import Link from 'next/link'
import type { Lang } from '@/lib/games'

interface SiteFooterProps {
  lang: Lang
}

export function SiteFooter({ lang }: SiteFooterProps) {
  const isEn = lang === 'en'
  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: '1px solid var(--color-border)',
        background: 'var(--color-bg-surface)',
        padding: '2rem 1rem',
        marginTop: '4rem',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <p style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
              Crash<span style={{ color: 'var(--color-neon)' }}>Games</span>
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', maxWidth: '28rem' }}>
              {isEn
                ? 'Free demo versions of crash games and slots. No real money involved. For entertainment purposes only. 18+ only.'
                : 'Бесплатные демо-версии краш игр и слотов. Без реальных денег. Только для развлечения. 18+.'}
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                gap: '1.25rem',
                flexWrap: 'wrap',
                fontSize: '0.875rem',
              }}
            >
              <li>
                <Link href="/en" style={{ color: 'var(--color-text-secondary)' }}>
                  EN
                </Link>
              </li>
              <li>
                <Link href="/ru" style={{ color: 'var(--color-text-secondary)' }}>
                  RU
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          &copy; {new Date().getFullYear()} CrashGames Demo.{' '}
          {isEn ? 'All rights reserved.' : 'Все права защищены.'}
        </p>
      </div>
    </footer>
  )
}
