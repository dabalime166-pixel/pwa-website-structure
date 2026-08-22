import { NextResponse } from 'next/server'
import { authorizeAdminRequest, type AdminAuthResult } from '@/lib/admin-auth'

export const ADMIN_NO_STORE = { 'Cache-Control': 'no-store' } as const

export function adminJson(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: ADMIN_NO_STORE })
}

export function requireAdmin(request: Request, extraSecret?: string | null): AdminAuthResult {
  return authorizeAdminRequest(request, extraSecret)
}

export function adminUnauthorized(auth: Extract<AdminAuthResult, { ok: false }>) {
  return adminJson({ error: auth.error, code: auth.code }, auth.status)
}
