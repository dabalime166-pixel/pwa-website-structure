import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

/** English home is `/` — keep `/en` as a permanent alias via next.config redirect. */
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.1weapp.online/',
  },
}

export default function EnHomePage() {
  redirect('/')
}
