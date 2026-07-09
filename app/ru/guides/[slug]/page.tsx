import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GUIDES } from '@/lib/guides-data'
import GuideSinglePage from '@/components/guide-single-page'

const BASE = 'https://www.1weapp.online/ru'

/* ─── Default SEO-оптимизированные title и description для каждого гайда (RU) ─── */
/* Override these by setting titleSeoRu/descriptionSeoRu in lib/guides-data.ts */
const SEO: Record<string, { title: string; description: string; keywords: string }> = {
  plinko: {
    title: 'Стратегия Плинко 2025 — Как выиграть в Plinko онлайн | 1weapp',
    description:
      'Полный гайд по Плинко: теория вероятностей, оптимальный риск, управление банкроллом и как RTP влияет на долгосрочный результат.',
    keywords:
      'стратегия плинко, гайд плинко, как выиграть в плинко, плинко онлайн, плинко советы, плинко вероятность, плинко rtp',
  },
  mines: {
    title: 'Стратегия Mines 2025 — Лучшие тактики для игры в Мины | 1weapp',
    description:
      'Лучшие стратегии для Mines: комбинаторика, выбор количества мин, управление волатильностью и когда забирать выигрыш для максимальной прибыли.',
    keywords:
      'стратегия mines, тактики mines, как выиграть в мины, mines crash игра, мины советы, mines rtp, мины волатильность',
  },
  crash: {
    title: 'Стратегия Краш-игр 2025 — Когда выводить и как выиграть | 1weapp',
    description:
      'Проверенные стратегии для краш-игр: авто-вывод, Мартингейл vs ровные ставки, психологические ловушки и правила банкролла для каждого игрока.',
    keywords:
      'стратегия краш игры, советы краш, как выиграть краш, авто вывод краш, гайд краш игры, стратегия lucky jet',
  },
  mistakes: {
    title: 'Топ-7 ошибок игроков в 2025 году — Гайд iGaming | 1weapp',
    description:
      'Избегайте самых дорогостоящих ошибок: погоня за проигрышем, отсутствие плана, игнорирование RTP и другие. Обязательный гайд для каждого игрока казино.',
    keywords:
      'ошибки в казино, ошибки игроков, советы онлайн казино, как играть умнее, избежать потерь казино, гайд для игроков',
  },
  rtp: {
    title: 'Гайд по RTP и волатильности 2025 — Что это значит и как использовать | 1weapp',
    description:
      'Разберитесь в RTP и волатильности онлайн-слотов и краш-игр. Узнайте, как выбирать игры под свой банкролл и максимизировать долгосрочный доход.',
    keywords:
      'гайд rtp, что такое rtp, волатильность слотов, высокая волатильность, низкая волатильность, rtp vs волатильность, лучший rtp слоты',
  },
  bonuses: {
    title: 'Гайд по бонусам казино 2025 — Как получать и отыгрывать бонусы | 1weapp',
    description:
      'Всё о бонусах казино: приветственные бонусы, фриспины, вейджер, кэшбэк и как выбирать самые выгодные предложения.',
    keywords:
      'гайд бонусы казино, вейджер бонус, фриспины гайд, приветственный бонус казино, как отыграть вейджер, лучшие бонусы казино 2025',
  },
  responsible: {
    title: 'Ответственная игра 2025 — Управление банкроллом и безопасная игра | 1weapp',
    description:
      'Играйте умнее и безопаснее: бюджет на сессию, правило 1-3%, инструменты самоисключения и признаки проблемной игры.',
    keywords:
      'ответственная игра, управление банкроллом, признаки игровой зависимости, лимиты депозита, самоисключение казино, советы по безопасной игре',
  },
  myths: {
    title: 'Мифы об онлайн-слотах 2025 — Факты vs Вымысел в казино | 1weapp',
    description:
      'Разбиваем 8 популярных мифов о слотах и казино: горячие/холодные машины, гарантированные серии побед, непобедимые стратегии. Узнайте правду.',
    keywords:
      'мифы казино, мифы слоты, факты онлайн слотов, миф горячие слоты, мифы об азартных играх, правда rng казино',
  },
}

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = GUIDES.find((g) => g.id === slug)
  if (!guide) return {}

  // Use custom SEO fields if provided, otherwise fall back to defaults
  const title = guide.titleSeoRu ?? SEO[slug]?.title ?? `${guide.titleRu} — Гайд iGaming | 1weapp`
  const description = guide.descriptionSeoRu ?? SEO[slug]?.description ?? guide.subtitleRu
  const keywords = SEO[slug]?.keywords ?? guide.tagRu

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${BASE}/ru/guides/${slug}`,
      languages: {
        ru: `${BASE}/ru/guides/${slug}`,
        en: `${BASE}/en/guides/${slug}`,
        'x-default': `${BASE}/en/guides/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE}/ru/guides/${slug}`,
      locale: 'ru_RU',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = GUIDES.find((g) => g.id === slug)
  if (!guide) notFound()
  return <GuideSinglePage slug={slug} lang="ru" />
}
