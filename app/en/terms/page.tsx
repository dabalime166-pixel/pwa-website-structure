import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Terms of Service | 1weapp',
  description: 'Terms of service for 1weapp. Please read our terms before using our platform.',
  openGraph: {
    title: 'Terms of Service | 1weapp',
    description: 'Terms of service for 1weapp.',
    type: 'website',
  },
}

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader lang="en" />
      <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '3rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Terms of Service</h1>
        
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>1. Acceptance of Terms</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            By accessing and using 1weapp, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>2. License Grant</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            We grant you a limited, non-exclusive, non-transferable license to use 1weapp for personal, non-commercial purposes. You may not copy, modify, or distribute any content without permission.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>3. User Responsibilities</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            You are responsible for maintaining the confidentiality of any account information and for all activities that occur under your account. You agree to immediately notify us of any unauthorized use of your account.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>4. Limitation of Liability</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            1weapp shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our platform or services.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>5. Contact Us</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            For questions about these Terms of Service, please contact our support team.
          </p>
        </section>
      </main>
      <SiteFooter lang="en" />
    </div>
  )
}
