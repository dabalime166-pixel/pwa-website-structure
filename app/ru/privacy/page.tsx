import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | 1weapp',
  description:
    'Политика конфиденциальности для 1weapp. Узнайте, как мы собираем, используем и защищаем ваши личные данные.',
  openGraph: {
    title: 'Политика конфиденциальности | 1weapp',
    description:
      'Политика конфиденциальности для 1weapp.',
    type: 'website',
  },
}

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader lang="ru" />
      <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '3rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Политика конфиденциальности</h1>
        
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>1. Информация, которую мы собираем</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            Мы собираем информацию, которую вы добровольно предоставляете при использовании 1weapp, включая данные об игровом процессе, информацию об устройстве и файлы cookie для аналитики.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>2. Как мы используем вашу информацию</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            Ваши данные используются для предоставления и улучшения наших услуг, персонализации вашего опыта и соблюдения юридических обязательств. Мы не продаем вашу личную информацию третьим лицам.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>3. Безопасность данных</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            Мы реализуем стандартные отраслевые меры безопасности для защиты вашей личной информации. Однако никакая передача данных через интернет не является полностью безопасной.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>4. Ваши права</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            У вас есть право доступа, исправления или удаления вашей личной информации. По вопросам о ваших данных свяжитесь с нами через поддержку.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>5. Свяжитесь с нами</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            Если у вас есть вопросы об этой Политике конфиденциальности, пожалуйста, свяжитесь с нашей командой поддержки.
          </p>
        </section>
      </main>
      <SiteFooter lang="ru" />
    </div>
  )
}
