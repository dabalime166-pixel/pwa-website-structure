'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'admin_push_secret'

type AdminAuthContextValue = {
  secret: string
  setSecret: (value: string) => void
  unlocked: boolean
  authError: string | null
  loading: boolean
  login: (nextSecret: string) => Promise<boolean>
  logout: () => Promise<void>
  adminFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [secret, setSecret] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const login = useCallback(async (nextSecret: string) => {
    setAuthError(null)
    const res = await fetch('/api/push/login', {
      method: 'POST',
      cache: 'no-store',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': nextSecret,
      },
      body: JSON.stringify({ secret: nextSecret }),
    })
    const data = (await res.json().catch(() => null)) as
      | { ok?: boolean; error?: string; code?: string }
      | null

    if (!res.ok || !data?.ok) {
      setUnlocked(false)
      sessionStorage.removeItem(STORAGE_KEY)
      setAuthError(data?.error || `Login failed (${res.status})`)
      return false
    }

    sessionStorage.setItem(STORAGE_KEY, nextSecret)
    setSecret(nextSecret)
    setUnlocked(true)
    return true
  }, [])

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (!saved) {
      setLoading(false)
      return
    }
    setSecret(saved)
    login(saved).finally(() => setLoading(false))
  }, [login])

  const logout = useCallback(async () => {
    await fetch('/api/push/login', { method: 'DELETE', cache: 'no-store' }).catch(() => null)
    sessionStorage.removeItem(STORAGE_KEY)
    setSecret('')
    setUnlocked(false)
  }, [])

  const adminFetch = useCallback(
    async (input: RequestInfo | URL, init: RequestInit = {}) => {
      const headers = new Headers(init.headers)
      if (secret) headers.set('x-admin-secret', secret)
      return fetch(input, {
        ...init,
        cache: 'no-store',
        credentials: 'same-origin',
        headers,
      })
    },
    [secret],
  )

  const value = useMemo(
    () => ({ secret, setSecret, unlocked, authError, loading, login, logout, adminFetch }),
    [secret, unlocked, authError, loading, login, logout, adminFetch],
  )

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
