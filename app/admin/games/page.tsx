'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAdminAuth } from '@/components/admin/use-admin-auth'
import type { GameRecord } from '@/lib/admin-games-store'

type ListItem = {
  slug: string
  name: string
  provider: string
  avatar: string
  rtp?: string
  gameType?: string
}

const EMPTY: GameRecord = {
  slug: '',
  name: '',
  provider: '',
  iframeUrl: '',
  keywordsRu: '',
  keywordsEn: '',
  seoTextRu: '',
  seoTextEn: '',
  avatar: '',
  rtp: '',
  gameType: '',
}

export default function AdminGamesPage() {
  const { adminFetch, unlocked } = useAdminAuth()
  const [q, setQ] = useState('')
  const [provider, setProvider] = useState('')
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<ListItem[]>([])
  const [providers, setProviders] = useState<string[]>([])
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [form, setForm] = useState<GameRecord>(EMPTY)
  const [status, setStatus] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [loadingList, setLoadingList] = useState(false)

  const loadList = useCallback(async () => {
    if (!unlocked) return
    setLoadingList(true)
    const params = new URLSearchParams({ page: String(page), limit: '30' })
    if (q.trim()) params.set('q', q.trim())
    if (provider) params.set('provider', provider)
    const res = await adminFetch(`/api/admin/games?${params}`)
    const data = await res.json()
    setLoadingList(false)
    if (!res.ok) {
      setStatus(data.error || 'List failed')
      return
    }
    setItems(data.items || [])
    setProviders(data.providers || [])
    setPages(data.pages || 1)
    setTotal(data.total || 0)
  }, [adminFetch, unlocked, page, provider, q])

  useEffect(() => {
    const t = setTimeout(loadList, q ? 350 : 0)
    return () => clearTimeout(t)
  }, [loadList, q])

  const loadGame = useCallback(
    async (slug: string) => {
      const res = await adminFetch(`/api/admin/games/${encodeURIComponent(slug)}`)
      const data = await res.json()
      if (!res.ok) {
        setStatus(data.error || 'Load failed')
        return
      }
      setSelected(slug)
      setForm(data.game)
      setStatus(null)
    },
    [adminFetch],
  )

  const save = async () => {
    setSaving(true)
    setStatus(null)
    const isNew = !selected
    const url = isNew ? '/api/admin/games' : `/api/admin/games/${encodeURIComponent(form.slug)}`
    const method = isNew ? 'POST' : 'PATCH'
    const res = await adminFetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setSaving(false)
    if (!res.ok) {
      setStatus(data.error || data.warning || 'Save failed')
      return
    }
    setStatus(
      data.warning ||
        `Saved (${data.mode || 'local'})${data.commit ? ` · ${String(data.commit).slice(0, 7)}` : ''}`,
    )
    setSelected(form.slug)
    await loadList()
  }

  const remove = async () => {
    if (!selected || !confirm(`Delete game "${selected}"?`)) return
    setSaving(true)
    const res = await adminFetch(`/api/admin/games/${encodeURIComponent(selected)}`, { method: 'DELETE' })
    const data = await res.json()
    setSaving(false)
    if (!res.ok) {
      setStatus(data.error || 'Delete failed')
      return
    }
    setSelected(null)
    setForm(EMPTY)
    setStatus('Deleted')
    await loadList()
  }

  const field = (key: keyof GameRecord, label: string, multiline = false) => (
    <label className="admin-field" key={key}>
      <span className="admin-label">{label}</span>
      {multiline ? (
        <textarea
          className="admin-textarea"
          value={String(form[key] ?? '')}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        />
      ) : (
        <input
          className="admin-input"
          value={String(form[key] ?? '')}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          disabled={key === 'slug' && Boolean(selected)}
        />
      )}
    </label>
  )

  const editorTitle = useMemo(() => (selected ? `Edit · ${selected}` : 'New game'), [selected])

  return (
    <div>
      <h1 style={{ fontSize: '1.6rem', marginBottom: '0.35rem' }}>Games</h1>
      <p style={{ color: 'var(--adm-muted)', marginBottom: '1rem' }}>
        {total.toLocaleString()} cards · paginated search (30/page) · incremental catalog sync on save
      </p>

      {status ? (
        <div
          className={`admin-msg ${status.toLowerCase().includes('fail') || status.toLowerCase().includes('error') ? 'admin-msg--err' : 'admin-msg--ok'}`}
        >
          {status}
        </div>
      ) : null}

      <div className="admin-split">
        <section className="admin-card">
          <div className="admin-toolbar">
            <input
              className="admin-input"
              placeholder="Search slug, name, provider…"
              value={q}
              onChange={(e) => {
                setPage(1)
                setQ(e.target.value)
              }}
            />
            <select
              className="admin-select"
              value={provider}
              onChange={(e) => {
                setPage(1)
                setProvider(e.target.value)
              }}
            >
              <option value="">All providers</option>
              {providers.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {loadingList ? <p style={{ color: 'var(--adm-muted)' }}>Loading…</p> : null}

          <table className="admin-table">
            <thead>
              <tr>
                <th>Game</th>
                <th>Provider</th>
              </tr>
            </thead>
            <tbody>
              {items.map((g) => (
                <tr key={g.slug} style={{ cursor: 'pointer' }} onClick={() => loadGame(g.slug)}>
                  <td>
                    <strong>{g.name}</strong>
                    <div style={{ color: 'var(--adm-muted)', fontSize: '0.78rem' }}>{g.slug}</div>
                  </td>
                  <td>{g.provider}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="admin-toolbar" style={{ marginTop: '0.75rem' }}>
            <button className="admin-btn" type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              Prev
            </button>
            <span style={{ color: 'var(--adm-muted)', fontSize: '0.85rem' }}>
              Page {page} / {pages}
            </span>
            <button
              className="admin-btn"
              type="button"
              disabled={page >= pages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
            <button
              className="admin-btn admin-btn--primary"
              type="button"
              onClick={() => {
                setSelected(null)
                setForm({ ...EMPTY, slug: '', avatar: '/avatars/new-game.webp' })
              }}
            >
              New game
            </button>
          </div>
        </section>

        <section className="admin-card">
          <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>{editorTitle}</h2>
          {field('slug', 'Slug')}
          {field('name', 'Name')}
          {field('provider', 'Provider')}
          {field('gameType', 'Game type')}
          {field('rtp', 'RTP')}
          {field('avatar', 'Avatar path')}
          {field('iframeUrl', 'Iframe URL', true)}
          {field('titleSeoEn', 'SEO title EN')}
          {field('titleSeoRu', 'SEO title RU')}
          {field('descriptionSeoEn', 'SEO description EN', true)}
          {field('descriptionSeoRu', 'SEO description RU', true)}
          {field('keywordsEn', 'Keywords EN', true)}
          {field('keywordsRu', 'Keywords RU', true)}
          {field('seoTextEn', 'SEO body EN', true)}
          {field('seoTextRu', 'SEO body RU', true)}

          <div className="admin-toolbar">
            <button className="admin-btn admin-btn--primary" type="button" disabled={saving} onClick={save}>
              {saving ? 'Saving…' : 'Save game'}
            </button>
            {selected ? (
              <button className="admin-btn admin-btn--danger" type="button" disabled={saving} onClick={remove}>
                Delete
              </button>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  )
}
