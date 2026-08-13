'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

type FormState = {
  title: string
  body: string
  url: string
  icon: string
  image: string
  tag: string
}

function normalizePublicPath(input: string): string {
  const value = input.trim()
  if (value.startsWith('/workspace/public/')) {
    return value.replace('/workspace/public', '')
  }
  return value
}

function isDirectImageRef(input: string): boolean {
  const value = input.trim()
  if (!value) return true
  if (value.startsWith('/')) {
    return /\.(png|jpe?g|webp|gif|avif)$/i.test(value)
  }
  return /^https:\/\/.+\.(png|jpe?g|webp|gif|avif)(\?.*)?$/i.test(value)
}

const DEFAULTS: FormState = {
  title: '🔥 Новое демо',
  body: 'Зайди на 1weapp — свежее демо и бонусы уже в каталоге.',
  url: '/ru',
  icon: '/icon-192.png',
  image: '',
  tag: '1weapp-broadcast',
}

function PreviewCard({ form }: { form: FormState }) {
  return (
    <div
      aria-hidden="true"
      style={{
        maxWidth: 360,
        background: 'linear-gradient(160deg, #1a1814 0%, #12110f 100%)',
        border: '1px solid rgba(226,184,74,0.35)',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
      }}
    >
      {form.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={form.image} alt="" style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
      ) : null}
      <div style={{ display: 'flex', gap: 12, padding: '14px 16px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={form.icon || '/icon-192.png'}
          alt=""
          width={44}
          height={44}
          style={{ borderRadius: 10, objectFit: 'cover', flexShrink: 0, background: '#0d0d0f' }}
        />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 11, color: '#9a7420', marginBottom: 4, letterSpacing: '0.04em' }}>
            1weapp.online
          </div>
          <div style={{ fontWeight: 700, color: '#f7f1e3', fontSize: 15, lineHeight: 1.3, marginBottom: 4 }}>
            {form.title || 'Заголовок'}
          </div>
          <div style={{ color: '#b8a57a', fontSize: 13, lineHeight: 1.45 }}>
            {form.body || 'Текст уведомления'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminNotificationsPage() {
  const [secret, setSecret] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [count, setCount] = useState<number | null>(null)
  const [form, setForm] = useState<FormState>(DEFAULTS)
  const [status, setStatus] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_push_secret')
    if (saved) {
      setSecret(saved)
      setUnlocked(true)
    }
  }, [])

  const authHeaders = useMemo(
    () => ({
      Authorization: `Bearer ${secret}`,
      'x-admin-secret': secret,
    }),
    [secret],
  )

  const refreshCount = useCallback(async () => {
    if (!secret) return
    const res = await fetch('/api/push/send', {
      headers: authHeaders,
    })
    const data = (await res.json().catch(() => null)) as { count?: number; error?: string } | null
    if (res.status === 401) {
      setUnlocked(false)
      setAuthError(data?.error === 'Unauthorized' ? 'Неверный секрет' : data?.error || 'Неверный секрет')
      sessionStorage.removeItem('admin_push_secret')
      return
    }
    if (!res.ok) {
      setAuthError(data?.error || 'Не удалось загрузить счётчик')
      return
    }
    setCount(data?.count ?? 0)
    setAuthError(null)
  }, [secret, authHeaders])

  useEffect(() => {
    if (unlocked && secret) {
      void refreshCount()
    }
  }, [unlocked, secret, refreshCount])

  const unlock = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextSecret = secret.trim()
    if (!nextSecret) return
    setAuthError(null)
    try {
      const res = await fetch('/api/push/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: nextSecret }),
      })
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; count?: number; error?: string; warning?: string }
        | null
      if (!res.ok) {
        setUnlocked(false)
        setAuthError(
          res.status === 503
            ? data?.error || 'ADMIN_PUSH_SECRET не задан на сервере. Добавьте в Vercel env и сделайте Redeploy.'
            : 'Неверный секрет',
        )
        return
      }
      sessionStorage.setItem('admin_push_secret', nextSecret)
      setSecret(nextSecret)
      setUnlocked(true)
      setCount(data?.count ?? 0)
      if (data?.warning) setAuthError(data.warning)
    } catch {
      setAuthError('Ошибка сети')
    }
  }

  const onChange = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
  }

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return
    if (form.image && !isDirectImageRef(form.image)) {
      setStatus('Картинка должна быть прямой ссылкой на файл (png/jpg/webp), а не страницей')
      return
    }
    setSending(true)
    setStatus(null)
    try {
      const res = await fetch('/api/push/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeaders.Authorization,
          'x-admin-secret': authHeaders['x-admin-secret'],
        },
        body: JSON.stringify({
          title: form.title,
          body: form.body,
          url: form.url || '/',
          icon: normalizePublicPath(form.icon || '/icon-192.png'),
          image: normalizePublicPath(form.image) || undefined,
          tag: form.tag || '1weapp-broadcast',
        }),
      })
      const data = (await res.json()) as {
        ok?: boolean
        total?: number
        sent?: number
        failed?: number
        removed?: number
        error?: string
      }
      if (!res.ok) {
        setStatus(data.error || 'Ошибка отправки')
        return
      }
      setStatus(
        `Отправлено: ${data.sent}/${data.total}` +
          (data.failed ? ` · ошибок: ${data.failed}` : '') +
          (data.removed ? ` · удалено просроченных: ${data.removed}` : ''),
      )
      await refreshCount()
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Ошибка сети')
    } finally {
      setSending(false)
    }
  }

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--color-bg-card)',
    border: '1px solid var(--color-border-gold)',
    borderRadius: 10,
    color: 'var(--color-text-primary)',
    padding: '0.75rem 0.9rem',
    fontSize: '0.9375rem',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    color: 'var(--color-gold-dim)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: 6,
    fontWeight: 600,
  }

  if (!unlocked) {
    return (
      <main style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', padding: '1.5rem' }}>
        <form
          onSubmit={unlock}
          style={{
            width: '100%',
            maxWidth: 400,
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-gold)',
            borderRadius: 16,
            padding: '1.75rem',
          }}
        >
          <h1 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Admin · Уведомления</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
            Введите ADMIN_PUSH_SECRET из Vercel Environment Variables (после Redeploy).
          </p>
          <label style={labelStyle} htmlFor="secret">
            Секрет
          </label>
          <input
            id="secret"
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            style={{ ...fieldStyle, marginBottom: '1rem' }}
            autoComplete="current-password"
            required
          />
          {authError ? (
            <p style={{ color: '#e07a7a', fontSize: '0.8125rem', marginBottom: '0.75rem' }}>{authError}</p>
          ) : null}
          <button type="submit" className="btn-cta" style={{ width: '100%' }}>
            Войти
          </button>
        </form>
      </main>
    )
  }

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '2rem 1rem 4rem' }}>
      <header
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '1.75rem',
        }}
      >
        <div>
          <h1 style={{ marginBottom: 6 }}>Рассылка уведомлений</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
            Подписчиков в базе:{' '}
            <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>
              {count === null ? '…' : count}
            </span>
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', marginTop: 6 }}>
            Локально с ПК: <code>pnpm push:export</code> и <code>pnpm push:send</code>
          </p>
        </div>
        <button type="button" className="btn-fullscreen" onClick={() => void refreshCount()}>
          Обновить
        </button>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(260px, 0.8fr)',
          gap: '1.5rem',
          alignItems: 'start',
        }}
        className="admin-push-grid"
      >
        <form
          onSubmit={send}
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-gold)',
            borderRadius: 16,
            padding: '1.25rem',
            display: 'grid',
            gap: '1rem',
          }}
        >
          <div>
            <label style={labelStyle} htmlFor="title">
              Заголовок
            </label>
            <input id="title" value={form.title} onChange={onChange('title')} style={fieldStyle} required maxLength={80} />
          </div>
          <div>
            <label style={labelStyle} htmlFor="body">
              Текст
            </label>
            <textarea
              id="body"
              value={form.body}
              onChange={onChange('body')}
              style={{ ...fieldStyle, minHeight: 110, resize: 'vertical' }}
              required
              maxLength={220}
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="url">
              Ссылка по клику
            </label>
            <input id="url" value={form.url} onChange={onChange('url')} style={fieldStyle} placeholder="/ru/lucky-jet" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={labelStyle} htmlFor="icon">
                Иконка
              </label>
              <input id="icon" value={form.icon} onChange={onChange('icon')} style={fieldStyle} />
            </div>
            <div>
              <label style={labelStyle} htmlFor="tag">
                Tag
              </label>
              <input id="tag" value={form.tag} onChange={onChange('tag')} style={fieldStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle} htmlFor="image">
              Картинка (опционально)
            </label>
            <input
              id="image"
              value={form.image}
              onChange={onChange('image')}
              style={fieldStyle}
              placeholder="https://... или /banners/promo.webp"
            />
          </div>

          <button type="submit" className="btn-cta" disabled={sending || count === 0} style={{ justifySelf: 'start' }}>
            {sending ? 'Отправка…' : 'Отправить всем'}
          </button>

          {status ? (
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{status}</p>
          ) : null}
        </form>

        <aside>
          <p style={{ ...labelStyle, marginBottom: 10 }}>Превью</p>
          <PreviewCard form={form} />
          <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
            На iPhone уведомления работают только если сайт добавлен на домашний экран (PWA). Chrome/Android — сразу.
          </p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
            Для фото используйте публичный HTTPS URL или путь вида /banners/.... Форматы: JPG/PNG/WebP.
          </p>
        </aside>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .admin-push-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
