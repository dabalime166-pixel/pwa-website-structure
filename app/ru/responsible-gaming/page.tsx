import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Ответственная игра | 1weapp',
  description: 'Информация и ресурсы по ответственной игре и безопасному онлайн-развлечению.',
  openGraph: {
    title: 'Ответственная игра | 1weapp',
    description: 'Информация по ответственной игре.',
    type: 'website',
  },
}

export default function ResponsibleGamingPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader lang="ru" />
      <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '3rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Ответственная игра</h1>
        
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>Играйте ответственно</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            Онлайн-игры должны восприниматься как развлечение. Устанавливайте лимиты на время игры и никогда не тратьте деньги, которые вы не можете себе позволить потерять. 1weapp предоставляет демо-игры без реальных денег.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>Самооценка</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            Регулярно задавайте себе вопросы: Играю ли я для развлечения? Устанавливаю ли я лимиты времени? Могу ли я остановиться, когда захочу? Если вы ответили "нет" хотя бы на один вопрос, вам может помочь профессиональная поддержка.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>Ресурсы поддержки</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            Если вы или кто-то из ваших знакомых испытывает проблемы с игровыми привычками, обратитесь за профессиональной помощью через консультационные сервисы или организации поддержки в вашей стране. Полезный ресурс:{' '}
            <a
              href="https://www.begambleaware.org/"
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              BeGambleAware.org
            </a>
            .
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>Советы для безопасной игры</h2>
          <ul style={{ lineHeight: 1.8, marginLeft: '1.5rem' }}>
            <li>Установите лимит времени до начала игры</li>
            <li>Никогда не играйте в состоянии стресса или расстройства</li>
            <li>Не преследуйте проигрыши</li>
            <li>Относитесь к играм как к развлечению, а не как к источнику дохода</li>
            <li>Делайте регулярные перерывы</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2rem' }}>Связаться с нами</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
            Если у вас есть вопросы об ответственной игре, пожалуйста, свяжитесь с нашей командой поддержки.
          </p>
        </section>
      </main>
      <SiteFooter lang="ru" />
    </div>
  )
}
