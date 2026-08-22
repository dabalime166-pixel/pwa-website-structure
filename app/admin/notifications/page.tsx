'use client'

import { useCallback, useEffect, useState } from 'react'
import { useAdminAuth } from '@/components/admin/use-admin-auth'

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
    <div className="admin-card" style={{ maxWidth: 360, padding: 0, overflow: 'hidden' }}>
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
          <div style={{ fontSize: 11, color: '#9a7420', marginBottom: 4 }}>1weapp.online</div>
          <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.3, marginBottom: 4 }}>{form.title || 'Заголовок'}</div>
          <div style={{ color: '#b8a57a', fontSize: 13, lineHeight: 1.45 }}>{form.body || 'Текст уведомления'}</div>
        </div>
      </div>
    </div>
  )
}

export default function AdminNotificationsPage() {
  const { secret, unlocked, adminFetch } = useAdminAuth()
  const [count, setCount] = useState<number | null>(null)
  const [form, setForm] = useState<FormState>(DEFAULTS)
  const [status, setStatus] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  const refreshCount = useCallback(async () => {
    if (!secret) return
    const res = await adminFetch('/api/push/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret }),
    })
    const data = await res.json().catch(() => null)
    if (res.ok) setCount(data?.count ?? 0)
  }, [adminFetch, secret])

  useEffect(() => {
    if (unlocked) void refreshCount()
  }, [unlocked, refreshCount])

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
      const res = await adminFetch('/api/push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret,
          title: form.title,
          body: form.body,
          url: form.url || '/',
          icon: normalizePublicPath(form.icon || '/icon-192.png'),
          image: normalizePublicPath(form.image) || undefined,
          tag: form.tag || '1weapp-broadcast',
        }),
      })
      const data = await res.json()
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

  return (
    <div>
      <header className="admin-toolbar" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.35rem' }}>Push notifications</h1>
          <p style={{ color: 'var(--adm-muted)', fontSize: '0.9rem' }}>
            Подписчиков: <strong style={{ color: 'var(--adm-gold)' }}>{count === null ? '…' : count}</strong>
          </p>
        </div>
        <button className="admin-btn" type="button" onClick={() => void refreshCount()}>
          Refresh count
        </button>
      </header>

      <div className="admin-split">
        <form className="admin-card" onSubmit={send} style={{ display: 'grid', gap: '0.75rem' }}>
          <label className="admin-field">
            <span className="admin-label">Заголовок</span>
            <input className="admin-input" value={form.title} onChange={onChange('title')} required maxLength={80} />
          </label>
          <label className="admin-field">
            <span className="admin-label">Текст</span>
            <textarea className="admin-textarea" style={{ minHeight: 100 }} value={form.body} onChange={onChange('body')} required maxLength={220} />
          </label>
          <label className="admin-field">
            <span className="admin-label">Ссылка</span>
            <input className="admin-input" value={form.url} onChange={onChange('url')} placeholder="/ru/lucky-jet" />
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
            <label className="admin-field">
              <span className="admin-label">Иконка</span>
              <input className="admin-input" value={form.icon} onChange={onChange('icon')} />
            </label>
            <label className="admin-field">
              <span className="admin-label">Tag</span>
              <input className="admin-input" value={form.tag} onChange={onChange('tag')} />
            </label>
          </div>
          <label className="admin-field">
            <span className="admin-label">Картинка (опционально)</span>
            <input className="admin-input" value={form.image} onChange={onChange('image')} placeholder="/banners/promo.webp" />
          </label>
          <button className="admin-btn admin-btn--primary" type="submit" disabled={sending || count === 0}>
            {sending ? 'Отправка…' : 'Отправить всем'}
          </button>
          {status ? <p style={{ fontSize: '0.86rem', color: 'var(--adm-muted)' }}>{status}</p> : null}
        </form>
        <aside>
          <p className="admin-label">Превью</p>
          <PreviewCard form={form} />
        </aside>
      </div>
    </div>
  )
}
