'use client'

import { AdminShell } from '@/components/admin/admin-shell'

export function AdminClientLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>
}
