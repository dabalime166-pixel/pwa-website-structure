'use client'

import { useCallback, useEffect, useState } from 'react'
import { useAdminAuth } from '@/components/admin/use-admin-auth'
import type { ProviderDef } from '@/lib/providers'
import type { ExpertProfile } from '@/lib/expert'

export default function AdminSitePage() {
  const { adminFetch, unlocked } = useAdminAuth()
  const [providersText, setProvidersText] = useState('[]')
  const [expertText, setExpertText] = useState('{}')
  const [status, setStatus] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    if (!unlocked) return
    const res = await adminFetch('/api/admin/site')
    const data = await res.json()
    if (!res.ok) {
      setStatus(data.error || 'Load failed')
      return
    }
    setProvidersText(JSON.stringify(data.providers || [], null, 2))
    setExpertText(JSON.stringify(data.expert || {}, null, 2))
  }, [adminFetch, unlocked])

  useEffect(() => {
    load()
  }, [load])

  const saveProviders = async () => {
    let providers: ProviderDef[]
    try {
      providers = JSON.parse(providersText) as ProviderDef[]
    } catch {
      setStatus('Invalid providers JSON')
      return
    }
    setSaving(true)
    const res = await adminFetch('/api/admin/site', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ providers }),
    })
    const data = await res.json()
    setSaving(false)
    setStatus(res.ok ? 'Providers saved' : data.error || data.warning || 'Save failed')
  }

  const saveExpert = async () => {
    let expert: ExpertProfile
    try {
      expert = JSON.parse(expertText) as ExpertProfile
    } catch {
      setStatus('Invalid expert JSON')
      return
    }
    setSaving(true)
    const res = await adminFetch('/api/admin/site', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expert }),
    })
    const data = await res.json()
    setSaving(false)
    setStatus(res.ok ? 'Expert profile saved' : data.error || data.warning || 'Save failed')
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.6rem', marginBottom: '0.35rem' }}>Site & providers</h1>
      <p style={{ color: 'var(--adm-muted)', marginBottom: '1rem' }}>
        Provider hubs + E-E-A-T expert block. Legal pages still live in route files — edit in repo for now.
      </p>
      {status ? <div className="admin-msg admin-msg--ok">{status}</div> : null}

      <section className="admin-card" style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>Providers</h2>
        <textarea className="admin-textarea" style={{ minHeight: 220 }} value={providersText} onChange={(e) => setProvidersText(e.target.value)} />
        <button className="admin-btn admin-btn--primary" type="button" disabled={saving} onClick={saveProviders}>
          Save providers
        </button>
      </section>

      <section className="admin-card">
        <h2 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>Expert profile</h2>
        <textarea className="admin-textarea" style={{ minHeight: 260 }} value={expertText} onChange={(e) => setExpertText(e.target.value)} />
        <button className="admin-btn admin-btn--primary" type="button" disabled={saving} onClick={saveExpert}>
          Save expert
        </button>
      </section>
    </div>
  )
}
