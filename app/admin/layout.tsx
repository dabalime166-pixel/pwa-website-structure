import type { Metadata } from 'next'
import '@/components/admin/admin-styles.css'
import { AdminClientLayout } from '@/components/admin/admin-client-layout'

export const metadata: Metadata = {
  title: 'Admin · 1weapp',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminClientLayout>{children}</AdminClientLayout>
}
