import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Responsible Gaming | 1weapp',
  description: 'Responsible gaming information and resources for safe online entertainment.',
  openGraph: {
    title: 'Responsible Gaming | 1weapp',
    description: 'Responsible gaming information and resources.',
    type: 'website',
  },
}

export default function ResponsibleGamingPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader lang="en" />
      <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '3rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Responsible Gaming</h1>
        
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>Play Responsibly</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            Online gaming should be enjoyed as entertainment. Set limits on your time and never spend money you cannot afford to lose. 1weapp provides demo games with no real money involved.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>Self-Assessment</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            Ask yourself regularly: Am I gaming for fun? Do I set time limits? Can I stop when I want? If you answer no to any of these, you may benefit from support resources.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>Support Resources</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            If you or someone you know is struggling with gaming habits, seek professional help through counseling services or support organizations in your country.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>Tips for Safe Gaming</h2>
          <ul style={{ lineHeight: 1.8, marginLeft: '1.5rem' }}>
            <li>Set time limits before you start playing</li>
            <li>Never play while stressed or upset</li>
            <li>Don't chase losses</li>
            <li>Treat gaming as entertainment, not income</li>
            <li>Take regular breaks</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>Contact Us</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            For questions about responsible gaming, please contact our support team.
          </p>
        </section>
      </main>
      <SiteFooter lang="en" />
    </div>
  )
}
