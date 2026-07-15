import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Disclaimer | 1weapp',
  description: 'Important disclaimer regarding 1weapp gaming platform and demo games.',
  openGraph: {
    title: 'Disclaimer | 1weapp',
    description: 'Important disclaimer regarding 1weapp gaming platform.',
    type: 'website',
  },
}

export default function DisclaimerPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader lang="en" />
      <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '3rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Disclaimer</h1>
        
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>1. Demo Games</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            All games on 1weapp are provided for educational and entertainment purposes only. Demo games use virtual credits and do not involve real money or gambling.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>2. No Guarantee of Wins</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            All games are based on random number generators. We provide no guarantee of wins or specific outcomes. Game outcomes are entirely dependent on chance and randomization.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>3. Age Restriction</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            1weapp is intended for users 18 years of age and older only. We do not knowingly allow access to minors.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>4. Third-Party Content</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            Some games may be provided by third-party developers. We are not responsible for third-party content or services linked from our platform.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>5. Contact Us</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            For questions about this disclaimer, please contact our support team.
          </p>
        </section>
      </main>
      <SiteFooter lang="en" />
    </div>
  )
}
