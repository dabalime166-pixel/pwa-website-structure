'use client'

import { useCallback, useEffect, useState } from 'react'
import { useAdminAuth } from '@/components/admin/use-admin-auth'
import type { ReviewData } from '@/lib/reviews-data'

type ListItem = { id: string; titleEn: string; titleRu: string; provider: string }

export default function AdminReviewsPage() {
  const { adminFetch, unlocked } = useAdminAuth()
  const [items, setItems] = useState<ListItem[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [jsonText, setJsonText] = useState('')
  const [meta, setMeta] = useState<Partial<ReviewData>>({})
  const [status, setStatus] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const loadList = useCallback(async () => {
    if (!unlocked) return
    const res = await adminFetch('/api/admin/reviews')
    const data = await res.json()
    if (res.ok) setItems(data.items || [])
  }, [adminFetch, unlocked])

  useEffect(() => {
    loadList()
  }, [loadList])

  const loadOne = async (id: string) => {
    const res = await adminFetch(`/api/admin/reviews/${encodeURIComponent(id)}`)
    const data = await res.json()
    if (!res.ok) {
      setStatus(data.error || 'Load failed')
      return
    }
    setSelectedId(id)
    setMeta(data.review)
    setJsonText(JSON.stringify(data.review, null, 2))
    setStatus(null)
  }

  const saveMeta = async () => {
    if (!selectedId) return
    setSaving(true)
    const res = await adminFetch(`/api/admin/reviews/${encodeURIComponent(selectedId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meta),
    })
    const data = await res.json()
    setSaving(false)
    setStatus(res.ok ? `Saved review ${selectedId}` : data.error || data.warning || 'Save failed')
  }

  const saveJson = async () => {
    if (!selectedId) return
    let parsed: ReviewData
    try {
      parsed = JSON.parse(jsonText) as ReviewData
    } catch {
      setStatus('Invalid JSON')
      return
    }
    setSaving(true)
    const res = await adminFetch(`/api/admin/reviews/${encodeURIComponent(selectedId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed),
    })
    const data = await res.json()
    setSaving(false)
    setStatus(res.ok ? `Saved full JSON for ${selectedId}` : data.error || data.warning || 'Save failed')
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.6rem', marginBottom: '0.35rem' }}>Reviews</h1>
      <p style={{ color: 'var(--adm-muted)', marginBottom: '1rem' }}>{items.length} reviews</p>
      {status ? <div className="admin-msg admin-msg--ok">{status}</div> : null}

      <div className="admin-split">
        <section className="admin-card">
          {items.map((r) => (
            <button
              key={r.id}
              type="button"
              className="admin-btn"
              style={{ display: 'block', width: '100%', textAlign: 'left', marginBottom: '0.35rem' }}
              onClick={() => loadOne(r.id)}
            >
              <strong>{r.titleEn}</strong>
              <div style={{ fontSize: '0.78rem', color: 'var(--adm-muted)' }}>
                {r.id} · {r.provider}
              </div>
            </button>
          ))}
        </section>

        <section className="admin-card">
          {!selectedId ? (
            <p style={{ color: 'var(--adm-muted)' }}>Pick a review</p>
          ) : (
            <>
              <label className="admin-field">
                <span className="admin-label">Title EN</span>
                <input
                  className="admin-input"
                  value={meta.titleEn || ''}
                  onChange={(e) => setMeta((m) => ({ ...m, titleEn: e.target.value }))}
                />
              </label>
              <label className="admin-field">
                <span className="admin-label">Title RU</span>
                <input
                  className="admin-input"
                  value={meta.titleRu || ''}
                  onChange={(e) => setMeta((m) => ({ ...m, titleRu: e.target.value }))}
                />
              </label>
              <label className="admin-field">
                <span className="admin-label">Related demo slug</span>
                <input
                  className="admin-input"
                  value={meta.relatedDemoSlug || ''}
                  onChange={(e) => setMeta((m) => ({ ...m, relatedDemoSlug: e.target.value }))}
                />
              </label>
              <label className="admin-field">
                <span className="admin-label">Description EN</span>
                <textarea
                  className="admin-textarea"
                  style={{ minHeight: 80 }}
                  value={meta.descriptionEn || ''}
                  onChange={(e) => setMeta((m) => ({ ...m, descriptionEn: e.target.value }))}
                />
              </label>
              <div className="admin-toolbar">
                <button className="admin-btn admin-btn--primary" type="button" disabled={saving} onClick={saveMeta}>
                  Save fields
                </button>
              </div>
              <label className="admin-field">
                <span className="admin-label">Full JSON</span>
                <textarea className="admin-textarea" style={{ minHeight: 320 }} value={jsonText} onChange={(e) => setJsonText(e.target.value)} />
              </label>
              <button className="admin-btn" type="button" disabled={saving} onClick={saveJson}>
                Save JSON
              </button>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
