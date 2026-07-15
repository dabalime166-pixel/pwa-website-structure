'use client'

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
        borderTop: '1px solid var(--color-border-gold)',
        background: 'var(--color-bg-surface)',
        padding: '2rem 1rem 1.5rem',
        marginTop: '4rem',
        position: 'relative',
      }}
    >
      {/* Gold top line */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--color-gold-dim) 30%, var(--color-gold) 50%, var(--color-gold-dim) 70%, transparent)',
        }}
      />
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
            <p
              style={{
                fontWeight: 800,
                fontSize: '1.0625rem',
                letterSpacing: '-0.01em',
                marginBottom: '0.5rem',
              }}
            >
              <span style={{ color: 'var(--color-text-primary)' }}>1we</span>
              <span
                style={{
                  background: 'linear-gradient(90deg, var(--color-gold-light), var(--color-gold))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                app
              </span>
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', maxWidth: '30rem', lineHeight: 1.6 }}>
              {isEn
                ? 'Free demo versions of crash games and slots. No real money involved. For entertainment only. 18+ only.'
                : 'Бесплатные демо-версии краш-игр и слотов. Без реальных денег. Только для развлечения. 18+.'}
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              alignItems: 'flex-start',
            }}
          >
            <nav aria-label="Language selection">
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
                  <Link
                    href="/en"
                    style={{
                      color: lang === 'en' ? 'var(--color-gold)' : 'var(--color-text-muted)',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      fontSize: '0.8125rem',
                    }}
                  >
                    EN
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ru"
                    style={{
                      color: lang === 'ru' ? 'var(--color-gold)' : 'var(--color-text-muted)',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      fontSize: '0.8125rem',
                    }}
                  >
                    RU
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Legal and compliance">
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  gap: '1.5rem',
                  flexWrap: 'wrap',
                  fontSize: '0.75rem',
                }}
              >
                <li>
                  <a
                    href={isEn ? '/en/terms' : '/ru/terms'}
                    style={{
                      color: 'var(--color-text-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                  >
                    {isEn ? 'Terms of Service' : 'Условия обслуживания'}
                  </a>
                </li>
                <li>
                  <a
                    href={isEn ? '/en/privacy' : '/ru/privacy'}
                    style={{
                      color: 'var(--color-text-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                  >
                    {isEn ? 'Privacy Policy' : 'Политика конфиденциальности'}
                  </a>
                </li>
                <li>
                  <a
                    href={isEn ? '/en/disclaimer' : '/ru/disclaimer'}
                    style={{
                      color: 'var(--color-text-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                  >
                    {isEn ? 'Disclaimer' : 'Дисклеймер'}
                  </a>
                </li>
                <li>
                  <a
                    href={isEn ? '/en/responsible-gaming' : '/ru/responsible-gaming'}
                    style={{
                      color: 'var(--color-text-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                  >
                    {isEn ? 'Responsible Gaming' : 'Ответственная игра'}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--color-border-gold), transparent)',
            marginBottom: '1.25rem',
          }}
        />

        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          &copy; {new Date().getFullYear()} 1weapp.{' '}
          {isEn ? 'All rights reserved.' : 'Все права защищены.'}
        </p>
      </div>
    </footer>
  )
}
