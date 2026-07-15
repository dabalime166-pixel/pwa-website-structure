import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Условия обслуживания | 1weapp',
  description: 'Условия обслуживания для 1weapp. Пожалуйста, ознакомьтесь с условиями перед использованием платформы.',
  openGraph: {
    title: 'Условия обслуживания | 1weapp',
    description: 'Условия обслуживания для 1weapp.',
    type: 'website',
  },
}

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader lang="ru" />
      <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '3rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Условия обслуживания</h1>
        
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>1. Принятие условий</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            Используя 1weapp, вы принимаете и соглашаетесь соблюдать все условия этого соглашения. Если вы не согласны, пожалуйста, не используйте наш сервис.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>2. Лицензия на использование</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            Мы предоставляем вам ограниченную, неисключительную лицензию на использование 1weapp в личных, некоммерческих целях. Вы не можете копировать, изменять или распространять содержимое без разрешения.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>3. Ответственность пользователя</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            Вы отвечаете за сохранение конфиденциальности информации вашей учетной записи и за всю деятельность в соответствии с ней. Вы согласны немедленно уведомить нас о любом несанкционированном использовании.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>4. Ограничение ответственности</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            1weapp не несет ответственности за любые косвенные, случайные или специальные убытки, вызванные использованием или невозможностью использования нашей платформы.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>5. Связаться с нами</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            Если у вас есть вопросы об этих Условиях обслуживания, пожалуйста, свяжитесь с нашей командой поддержки.
          </p>
        </section>
      </main>
      <SiteFooter lang="ru" />
    </div>
  )
}
