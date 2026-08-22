'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AdminAuthProvider, useAdminAuth } from '@/components/admin/use-admin-auth'

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/games', label: 'Games' },
  { href: '/admin/guides', label: 'Guides' },
  { href: '/admin/reviews', label: 'Reviews' },
  { href: '/admin/site', label: 'Site & providers' },
  { href: '/admin/notifications', label: 'Push notifications' },
] as const

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminShellInner>{children}</AdminShellInner>
    </AdminAuthProvider>
  )
}

function AdminShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { secret, setSecret, unlocked, authError, loading, login, logout } = useAdminAuth()

  if (loading) {
    return (
      <div className="admin-root">
        <div className="admin-login admin-card">Loading admin…</div>
      </div>
    )
  }

  if (!unlocked) {
    return (
      <div className="admin-root">
        <form
          className="admin-login admin-card"
          onSubmit={async (e) => {
            e.preventDefault()
            await login(secret)
          }}
        >
          <p className="admin-nav__brand">1weapp admin</p>
          <h1 style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>Sign in</h1>
          <p style={{ color: 'var(--adm-muted)', fontSize: '0.88rem', marginBottom: '1rem' }}>
            Uses <code>ADMIN_PUSH_SECRET</code>. No background polling — API runs only when you save or search.
          </p>
          <label className="admin-field">
            <span className="admin-label">Secret</span>
            <input
              className="admin-input"
              type="password"
              autoComplete="current-password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
          </label>
          {authError ? <div className="admin-msg admin-msg--err">{authError}</div> : null}
          <button className="admin-btn admin-btn--primary" type="submit">
            Unlock admin
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="admin-root admin-shell">
      <aside className="admin-nav">
        <p className="admin-nav__brand">1weapp admin</p>
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href ? 'page' : undefined}
          >
            {item.label}
          </Link>
        ))}
        <button
          type="button"
          className="admin-btn admin-btn--danger"
          style={{ marginTop: '1rem', width: '100%' }}
          onClick={() => logout()}
        >
          Log out
        </button>
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  )
}
