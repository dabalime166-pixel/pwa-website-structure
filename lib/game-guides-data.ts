/**
 * Game-focused SEO guides under /guides/games.
 *
 * Keyword research notes (2026-08, SERP + public Wordstat-style clusters):
 * Gates of Olympus — mid/low hot queries we target in the test article:
 *   RU mid:  "gates of olympus демо без регистрации",
 *            "врата олимпа играть бесплатно"
 *   RU low:  "gates of olympus как работают множители",
 *            "gates of olympus фриспины тактика",
 *            "gates of olympus rtp волатильность"
 *   EN mid:  "gates of olympus demo no registration"
 *   EN low:  "how gates of olympus multipliers work",
 *            "gates of olympus free spins demo tips"
 * Exact Wordstat volumes change daily; titles mirror the hottest mid-intent phrases.
 */

export interface GameGuideSection {
  heading: string
  body?: string
  body2?: string
  bullets?: string[]
  callout?: string
  strategies?: { title: string; bullets: string[] }[]
}

export interface GameGuide {
  id: string
  /** Related catalog game slug for CTA → /{lang}/{gameSlug} */
  gameSlug: string
  icon: string
  titleRu: string
  titleEn: string
  subtitleRu: string
  subtitleEn: string
  tagRu: string
  tagEn: string
  keywordsRu: string[]
  keywordsEn: string[]
  descriptionRu: string
  descriptionEn: string
  titleSeoRu: string
  titleSeoEn: string
  descriptionSeoRu: string
  descriptionSeoEn: string
  /** Approximate monthly intent band for editors */
  intentBand: 'mid' | 'low-mid' | 'low'
  sections: { ru: GameGuideSection[]; en: GameGuideSection[] }
}

export const GAME_GUIDES: GameGuide[] = [
  {
    id: 'gates-of-olympus-demo',
    gameSlug: 'gates-of-olympus',
    icon: '⚡',
    intentBand: 'mid',
    titleRu: 'Gates of Olympus демо без регистрации — множители Зевса',
    titleEn: 'Gates of Olympus Demo No Registration — Zeus Multipliers',
    subtitleRu:
      'Как открыть Gates of Olympus демо без регистрации, понять множители и отработать фриспины бесплатно',
    subtitleEn:
      'Open Gates of Olympus demo with no signup, learn Zeus multipliers, and practice free spins for free',
    tagRu: 'Слот · Pragmatic',
    tagEn: 'Slot · Pragmatic',
    keywordsRu: [
      'gates of olympus демо без регистрации',
      'врата олимпа играть бесплатно',
      'gates of olympus как работают множители',
      'gates of olympus фриспины тактика',
      'gates of olympus rtp волатильность',
    ],
    keywordsEn: [
      'gates of olympus demo no registration',
      'how gates of olympus multipliers work',
      'gates of olympus free spins demo tips',
      'gates of olympus rtp volatility',
    ],
    descriptionRu:
      'Практический разбор: Gates of Olympus демо без регистрации, как работают множители Зевса, фриспины и RTP/волатильность. Врата Олимпа — играть бесплатно на 1weapp, 18+.',
    descriptionEn:
      'Practical guide: Gates of Olympus demo no registration, how Zeus multipliers work, free spins tips, RTP and volatility. Play free on 1weapp, 18+.',
    titleSeoRu:
      'Gates of Olympus демо без регистрации — множители и фриспины | 1weapp',
    titleSeoEn:
      'Gates of Olympus Demo No Registration — Multipliers & Free Spins | 1weapp',
    descriptionSeoRu:
      'Gates of Olympus демо без регистрации: как работают множители Зевса, тактика фриспинов, RTP и волатильность. Врата Олимпа — играть бесплатно в браузере.',
    descriptionSeoEn:
      'Gates of Olympus demo no registration: how multipliers work, free spins tips, RTP and volatility. Play the free Pragmatic demo in your browser.',
    sections: {
      ru: [
        {
          heading: 'Gates of Olympus демо без регистрации — с чего начать',
          body: 'Запрос «gates of olympus демо без регистрации» обычно значит одно: открыть слот Pragmatic Play сразу в браузере, без аккаунта и депозита. На 1weapp карточка Gates of Olympus запускает тот же pay-anywhere движок, что и в режиме на деньги, но на виртуальных кредитах. Параллельный горячий запрос — «врата олимпа играть бесплатно»: по сути это та же цель с русскоязычной формулировкой названия.',
          callout:
            'Сначала 80–120 спинов в демо на фиксированной ставке — так вы увидите сухие серии до любого депозита.',
          bullets: [
            'Откройте /ru/gates-of-olympus и нажмите «Запустить демо»',
            'Ставка в демо — учебная: держите один размер 50+ спинов подряд',
            'Регистрация и депозит для демо на 1weapp не нужны',
          ],
        },
        {
          heading: 'Gates of Olympus: как работают множители Зевса',
          body: 'Ключевой низкочастотный интерес — «gates of olympus как работают множители». На поле 6×5 выплаты идут за 8+ одинаковых символов в любом месте (Pay Anywhere). Зевс может бросать сферы-множители от 2x до 500x: они применяются к выигрышу текущего каскада. В базовой игре множители не копятся между спинами — каждый раунд начинается «с нуля».',
          body2:
            'Именно поэтому демо полезно: вы калибруете ожидания по частоте сфер, а не ищете «сигнал», что слот «должен отдать». RNG не читает историю проигрышей.',
          bullets: [
            '8+ символов → выплата; символы исчезают, падают новые (tumble)',
            'Сфера множителя усиливает выигрыш текущего каскада',
            'В базовой игре множители не суммируются между спинами',
          ],
        },
        {
          heading: 'Gates of Olympus фриспины: тактика в демо',
          body: 'Кластер «gates of olympus фриспины тактика» — про режим Free Spins: обычно 4+ скаттера дают раунд, где множители могут суммироваться в общий Total Multiplier и не сбрасываться между фриспинами. Это меняет профиль сессии: база спокойнее «учит» темп, бонус — зона редких всплесков.',
          strategies: [
            {
              title: 'Учебная сессия в демо (низкий риск обучения)',
              bullets: [
                'Фиксированная ставка 50–100 спинов без смены размера',
                'Записывайте: сколько спинов до первого бонуса, длина сухих серий',
                'Не включайте buy bonus, пока не поняли базовый темп',
              ],
            },
            {
              title: 'Разбор бонуса после 2–3 фриспин-запусков',
              bullets: [
                'Смотрите, как растёт Total Multiplier внутри бонуса',
                'Сравните ощущение банка: база vs бонус на той же ставке',
                'Только потом решайте, нужен ли вам ante / покупка бонуса на деньги',
              ],
            },
          ],
          callout:
            'Демо не предсказывает следующий бонус. Оно показывает волатильность на вашей длине сессии.',
        },
        {
          heading: 'RTP и волатильность Gates of Olympus',
          body: 'Запрос «gates of olympus rtp волатильность» — типичный mid/low informational. У карточки на 1weapp заявленный RTP около 96.50%, волатильность высокая: редкие бонусы и множители тянут дисперсию вверх. Высокий RTP не отменяет сухие серии на короткой выборке.',
          bullets: [
            'RTP ~96.50% — долгий ориентир, не гарантия часа игры',
            'Высокая волатильность = длинные паузы между «вкусными» событиями',
            'В демо проверьте, выдерживает ли ваш план ставки 100–200 спинов',
          ],
        },
        {
          heading: 'Чеклист перед игрой на деньги',
          bullets: [
            'Поняли Pay Anywhere и множители в базе',
            'Увидели хотя бы один бонусный раунд в демо',
            'Задали лимит сессии и депозита заранее',
            'Играете только 18+, без догона после сухой серии',
          ],
          callout:
            'Сначала «врата олимпа играть бесплатно» в демо — потом осознанный переход на деньги, если формат вам подходит.',
        },
      ],
      en: [
        {
          heading: 'Gates of Olympus demo no registration — quick start',
          body: 'People searching “gates of olympus demo no registration” want the Pragmatic Play slot in the browser with virtual credits — no account wall. On 1weapp the Gates of Olympus card launches the same pay-anywhere engine as real-money mode, without a deposit.',
          callout:
            'Run 80–120 fixed-stake demo spins first so you feel dry stretches before any deposit.',
          bullets: [
            'Open /en/gates-of-olympus and tap Launch Demo',
            'Keep one stake size for 50+ spins',
            'No signup required for the 1weapp demo',
          ],
        },
        {
          heading: 'How Gates of Olympus multipliers work',
          body: 'The low-frequency cluster “how gates of olympus multipliers work” is about the 6×5 Pay Anywhere grid: 8+ matching symbols anywhere pay, then tumble. Zeus can throw multiplier orbs from 2x to 500x that apply to the current cascade win. In the base game those multipliers do not carry between spins.',
          body2:
            'Demo helps you calibrate how often orbs appear — it does not prove the slot “owes” a bonus after losses. RNG has no memory.',
          bullets: [
            '8+ symbols pay; winners tumble away for new drops',
            'Multiplier orbs boost the current cascade',
            'Base-game multipliers reset each spin',
          ],
        },
        {
          heading: 'Gates of Olympus free spins demo tips',
          body: '“Gates of olympus free spins demo tips” focuses on the bonus: typically 4+ scatters start free spins where multipliers can stack into a Total Multiplier that persists inside the feature. Base play trains pace; the bonus is where rare spikes live.',
          strategies: [
            {
              title: 'Learning session (demo)',
              bullets: [
                'Fixed stake for 50–100 spins',
                'Log spins-to-bonus and dry-streak length',
                'Skip bonus buy until base pace feels familiar',
              ],
            },
            {
              title: 'After 2–3 bonus triggers',
              bullets: [
                'Watch how Total Multiplier builds inside free spins',
                'Compare bankroll feel: base vs bonus at the same stake',
                'Only then decide on ante / bonus buy with real limits',
              ],
            },
          ],
          callout:
            'Demo does not predict the next bonus. It shows volatility on your session length.',
        },
        {
          heading: 'RTP and volatility',
          body: 'Published RTP is typically around 96.50% with high volatility. That means long stretches without a feature are normal — high RTP is a long-run average, not an hourly promise.',
          bullets: [
            'RTP ~96.50% is a long-horizon guide',
            'High volatility = infrequent but larger swings',
            'In demo, check whether your stake plan survives 100–200 spins',
          ],
        },
        {
          heading: 'Checklist before real-money play',
          bullets: [
            'You understand Pay Anywhere and base multipliers',
            'You have seen at least one bonus round in demo',
            'Session and deposit limits are set in advance',
            '18+ only — never chase a dry streak',
          ],
          callout:
            'Learn free in demo first. Move to real money only if the format fits your limits.',
        },
      ],
    },
  },
]

export function getGameGuide(id: string): GameGuide | undefined {
  return GAME_GUIDES.find((g) => g.id === id)
}
