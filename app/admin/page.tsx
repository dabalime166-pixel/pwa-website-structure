'use client'

import { useEffect, useState } from 'react'
import { useAdminAuth } from '@/components/admin/use-admin-auth'

type Stats = {
  counts?: {
    games: number
    guides: number
    reviews: number
    providers: number
    pushSubscribers: number
  }
  persist?: {
    github: boolean
    localFs: boolean
    deployHook: boolean
    githubBranch?: string
  }
  warning?: string
}

export default function AdminDashboardPage() {
  const { adminFetch, unlocked } = useAdminAuth()
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!unlocked) return
    let cancelled = false
    ;(async () => {
      const res = await adminFetch('/api/admin/stats')
      const data = (await res.json().catch(() => null)) as Stats & { error?: string }
      if (cancelled) return
      if (!res.ok) {
        setError(data?.error || `Failed (${res.status})`)
        return
      }
      setStats(data)
    })()
    return () => {
      cancelled = true
    }
  }, [adminFetch, unlocked])

  return (
    <div>
      <h1 style={{ fontSize: '1.6rem', marginBottom: '0.35rem' }}>Dashboard</h1>
      <p style={{ color: 'var(--adm-muted)', marginBottom: '1rem' }}>
        Static admin shell — no cron, no polling. Stats load once when you open this page.
      </p>

      {error ? <div className="admin-msg admin-msg--err">{error}</div> : null}

      {stats?.persist && !stats.persist.github && !stats.persist.localFs ? (
        <div className="admin-msg admin-msg--warn">
          Production saves need <code>GITHUB_TOKEN</code> + <code>GITHUB_REPO</code>. Without them edits cannot
          persist on serverless. Optional <code>VERCEL_DEPLOY_HOOK</code> triggers one rebuild after save.
        </div>
      ) : null}

      <div className="admin-grid" style={{ marginBottom: '1rem' }}>
        <div className="admin-card admin-stat">
          <strong>{stats?.counts?.games ?? '—'}</strong>
          <span>Game cards</span>
        </div>
        <div className="admin-card admin-stat">
          <strong>{stats?.counts?.guides ?? '—'}</strong>
          <span>Guides</span>
        </div>
        <div className="admin-card admin-stat">
          <strong>{stats?.counts?.reviews ?? '—'}</strong>
          <span>Reviews</span>
        </div>
        <div className="admin-card admin-stat">
          <strong>{stats?.counts?.providers ?? '—'}</strong>
          <span>Providers</span>
        </div>
        <div className="admin-card admin-stat">
          <strong>{stats?.counts?.pushSubscribers ?? '—'}</strong>
          <span>Push subscribers</span>
        </div>
      </div>

      <div className="admin-card">
        <h2 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>Save model</h2>
        <ul style={{ color: 'var(--adm-muted)', fontSize: '0.88rem', lineHeight: 1.55, paddingLeft: '1.1rem' }}>
          <li>Games: patch one slug → sync only catalog + seo for that slug (not full 1.4k rebuild in memory).</li>
          <li>Guides / reviews / providers: single JSON file write per save.</li>
          <li>Site stays SSG — after GitHub save, redeploy (manual or deploy hook) publishes changes.</li>
        </ul>
      </div>
    </div>
  )
}
