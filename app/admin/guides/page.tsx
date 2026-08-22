'use client'

import { useCallback, useEffect, useState } from 'react'
import { useAdminAuth } from '@/components/admin/use-admin-auth'
import type { GuideData } from '@/lib/guides-data'

type ListItem = { id: string; slug: string; titleEn: string; titleRu: string }

export default function AdminGuidesPage() {
  const { adminFetch, unlocked } = useAdminAuth()
  const [items, setItems] = useState<ListItem[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [jsonText, setJsonText] = useState('')
  const [meta, setMeta] = useState<Partial<GuideData>>({})
  const [status, setStatus] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const loadList = useCallback(async () => {
    if (!unlocked) return
    const res = await adminFetch('/api/admin/guides')
    const data = await res.json()
    if (res.ok) setItems(data.items || [])
  }, [adminFetch, unlocked])

  useEffect(() => {
    loadList()
  }, [loadList])

  const loadOne = async (id: string) => {
    const res = await adminFetch(`/api/admin/guides/${encodeURIComponent(id)}`)
    const data = await res.json()
    if (!res.ok) {
      setStatus(data.error || 'Load failed')
      return
    }
    setSelectedId(id)
    setMeta(data.guide)
    setJsonText(JSON.stringify(data.guide, null, 2))
    setStatus(null)
  }

  const saveMeta = async () => {
    if (!selectedId) return
    setSaving(true)
    const res = await adminFetch(`/api/admin/guides/${encodeURIComponent(selectedId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meta),
    })
    const data = await res.json()
    setSaving(false)
    setStatus(res.ok ? `Saved guide ${selectedId}` : data.error || data.warning || 'Save failed')
  }

  const saveJson = async () => {
    if (!selectedId) return
    let parsed: GuideData
    try {
      parsed = JSON.parse(jsonText) as GuideData
    } catch {
      setStatus('Invalid JSON')
      return
    }
    setSaving(true)
    const res = await adminFetch(`/api/admin/guides/${encodeURIComponent(selectedId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed),
    })
    const data = await res.json()
    setSaving(false)
    if (res.ok) {
      setMeta(parsed)
      setStatus(`Saved full JSON for ${selectedId}`)
    } else {
      setStatus(data.error || data.warning || 'Save failed')
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.6rem', marginBottom: '0.35rem' }}>Guides</h1>
      <p style={{ color: 'var(--adm-muted)', marginBottom: '1rem' }}>{items.length} guides · quick fields + raw JSON</p>
      {status ? <div className="admin-msg admin-msg--ok">{status}</div> : null}

      <div className="admin-split">
        <section className="admin-card">
          {items.map((g) => (
            <button
              key={g.id}
              type="button"
              className="admin-btn"
              style={{ display: 'block', width: '100%', textAlign: 'left', marginBottom: '0.35rem' }}
              onClick={() => loadOne(g.id)}
            >
              <strong>{g.titleEn}</strong>
              <div style={{ fontSize: '0.78rem', color: 'var(--adm-muted)' }}>{g.id}</div>
            </button>
          ))}
        </section>

        <section className="admin-card">
          {!selectedId ? (
            <p style={{ color: 'var(--adm-muted)' }}>Pick a guide</p>
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
                <span className="admin-label">Description EN</span>
                <textarea
                  className="admin-textarea"
                  style={{ minHeight: 80 }}
                  value={meta.descriptionEn || ''}
                  onChange={(e) => setMeta((m) => ({ ...m, descriptionEn: e.target.value }))}
                />
              </label>
              <label className="admin-field">
                <span className="admin-label">Description RU</span>
                <textarea
                  className="admin-textarea"
                  style={{ minHeight: 80 }}
                  value={meta.descriptionRu || ''}
                  onChange={(e) => setMeta((m) => ({ ...m, descriptionRu: e.target.value }))}
                />
              </label>
              <label className="admin-field">
                <span className="admin-label">Updated at (YYYY-MM-DD)</span>
                <input
                  className="admin-input"
                  value={meta.updatedAt || ''}
                  onChange={(e) => setMeta((m) => ({ ...m, updatedAt: e.target.value }))}
                />
              </label>
              <div className="admin-toolbar">
                <button className="admin-btn admin-btn--primary" type="button" disabled={saving} onClick={saveMeta}>
                  Save fields
                </button>
              </div>
              <label className="admin-field">
                <span className="admin-label">Full JSON (sections, keywords…)</span>
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
