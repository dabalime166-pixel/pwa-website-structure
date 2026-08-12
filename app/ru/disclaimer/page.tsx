import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Дисклеймер | 1weapp',
  description: 'Важное уведомление о платформе 1weapp и демо-играх.',
  openGraph: {
    title: 'Дисклеймер | 1weapp',
    description: 'Важное уведомление о платформе 1weapp.',
    type: 'website',
  },
}

export default function DisclaimerPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader lang="ru" />
      <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '3rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Дисклеймер</h1>
        
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>1. Демо-игры</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            Все игры на 1weapp предоставляются исключительно в образовательных и развлекательных целях. Демо-игры используют виртуальные кредиты и не связаны с реальными деньгами или азартными играми.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>2. Отсутствие гарантий выигрыша</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            Все игры основаны на генераторах случайных чисел. Мы не гарантируем какие-либо выигрыши или конкретные результаты. Исходы полностью зависят от случайности.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>3. Возрастные ограничения</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            1weapp предназначен только для пользователей старше 18 лет. Мы не разрешаем доступ несовершеннолетним.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>4. Контент третьих лиц</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            Некоторые игры могут быть предоставлены разработчиками третьих лиц. Мы не несем ответственности за контент или сервисы третьих лиц.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>5. Связаться с нами</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            Если у вас есть вопросы об этом дисклеймере, пожалуйста, свяжитесь с нашей командой поддержки.
          </p>
        </section>
      </main>
      <SiteFooter lang="ru" />
    </div>
  )
}
