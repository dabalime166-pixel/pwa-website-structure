import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | 1weapp',
  description:
    'Privacy policy for 1weapp. Learn how we collect, use, and protect your personal data.',
  openGraph: {
    title: 'Privacy Policy | 1weapp',
    description:
      'Privacy policy for 1weapp. Learn how we collect, use, and protect your personal data.',
    type: 'website',
  },
}

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader lang="en" />
      <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '3rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Privacy Policy</h1>
        
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>1. Information We Collect</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            We collect information you voluntarily provide when using 1weapp, including but not limited to gameplay data, device information, and cookies for analytics and user experience improvement.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>2. How We Use Your Information</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            Your data is used to provide and improve our services, personalize your experience, maintain security, and comply with legal obligations. We do not sell your personal information to third parties.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>3. Data Security</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            We implement industry-standard security measures to protect your personal data. However, no transmission over the internet is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>4. Your Rights</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            You have the right to access, correct, or delete your personal data. For inquiries about your data, please contact us through our support channels.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>5. Contact Us</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            If you have questions about this Privacy Policy, please contact our support team.
          </p>
        </section>
      </main>
      <SiteFooter lang="en" />
    </div>
  )
}
