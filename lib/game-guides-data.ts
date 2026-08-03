/**
 * Game-focused SEO guides under /guides/games.
 * Covers all Popular (FEATURED) lobby titles with catalog avatars.
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
  /** Catalog avatar path under /public, e.g. /avatars/foo.webp */
  avatar: string
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
    id: "lucky-jet-demo",
    gameSlug: "lucky-jet",
    avatar: "/avatars/lucky-jet.webp",
    intentBand: "mid",
    titleRu: "Lucky Jet демо без регистрации — кэшаут до улёта джета",
    titleEn: "Lucky Jet Demo No Registration — Cash-out before the jet flies away",
    subtitleRu: "Как открыть Lucky Jet демо без регистрации, понять кэшаут до улёта джета и отработать бесплатно",
    subtitleEn: "Open Lucky Jet demo with no signup, learn cash-out before the jet flies away, and practice for free",
    tagRu: "Crash · 1weapp",
    tagEn: "Crash · 1weapp",
    keywordsRu: [
      "lucky jet демо без регистрации",
      "lucky jet играть бесплатно",
      "lucky jet демо без депозита",
      "lucky jet как играть",
      "lucky jet rtp волатильность",
    ],
    keywordsEn: [
      "lucky jet demo no registration",
      "lucky jet free play",
      "lucky jet demo no deposit",
      "how to play lucky jet demo",
      "lucky jet rtp volatility",
    ],
    descriptionRu: "Практический разбор: Lucky Jet демо без регистрации, кэшаут до улёта джета, RTP ~97.00%. Играть бесплатно на 1weapp, 18+.",
    descriptionEn: "Practical guide: Lucky Jet demo no registration, cash-out before the jet flies away, RTP ~97.00%. Play free on 1weapp, 18+.",
    titleSeoRu: "Lucky Jet демо без регистрации — гайд и бесплатная игра | 1weapp",
    titleSeoEn: "Lucky Jet Demo No Registration — Free Play Guide | 1weapp",
    descriptionSeoRu: "Lucky Jet демо без регистрации: кэшаут до улёта джета, RTP ~97.00%. Играйте бесплатно в браузере на 1weapp.",
    descriptionSeoEn: "Lucky Jet demo no registration: cash-out before the jet flies away, RTP ~97.00%. Play the free demo in your browser on 1weapp.",
    sections: {
      ru: [
        {
          heading: "Lucky Jet демо без регистрации — с чего начать",
          body: "Запрос «lucky jet демо без регистрации» обычно значит одно: открыть crash-демо 1weapp Games сразу в браузере, без аккаунта и депозита. На 1weapp карточка Lucky Jet запускает официальное демо с виртуальным балансом. Параллельный запрос — «lucky jet играть бесплатно»: та же цель.",
          callout: "Сначала 40–60 демо-раундов с одной целью кэшаута — так виден темп, а не эмоция.",
          bullets: [
            "Откройте /ru/lucky-jet и нажмите «Запустить демо»",
            "Ставка в демо — учебная: держите один размер 40+ раундов подряд",
            "Регистрация и депозит для демо на 1weapp не нужны",
          ],
        },
        {
          heading: "Lucky Jet: кэшаут до улёта джета",
          body: "Lucky Jet — crash-игра: множитель растёт, пока джет в воздухе. Ваша задача — забрать ставку до краша. В демо баланс виртуальный, поэтому можно спокойно сравнить ранний выход и погоню за высоким x.",
          body2: "Именно поэтому демо полезно: вы калибруете ожидания по темпу и частоте фич, а не ищете «сигнал», что игра «должна отдать». RNG не читает историю проигрышей.",
          bullets: [
            "Множитель растёт до кэшаута или краша",
            "Авто-кэшаут помогает держать план",
            "Демо не предсказывает следующий полёт",
          ],
        },
        {
          heading: "Lucky Jet: фичи и тактика в демо",
          body: "В демо отработайте три сценария: авто-кэшаут на 1.5x–2x, ручной выход «на глаз» и осознанный риск выше 5x на малой доле банкролла. Смотрите длину «сухих» полётов — crash не обязан «отдать» после серии ранних крашей.",
          strategies: [
            {
              title: "Учебная сессия в демо (низкий риск обучения)",
              bullets: [
                "Фиксированная ставка 50–100 раундов без смены размера",
                "Записывайте: сколько раундов до первой фичи, длина сухих серий",
                "Не поднимайте цель кэшаута после серии ранних крашей",
              ],
            },
            {
              title: "После 1–3 фич / бонусов",
              bullets: [
                "Сравните ощущение банка: база vs фича на той же ставке",
                "Решите, подходит ли вам волатильность формата",
                "Только потом думайте о лимитах на деньги — если вообще нужно",
              ],
            },
          ],
          callout: "Демо не предсказывает следующую фичу. Оно показывает волатильность на вашей длине сессии.",
        },
        {
          heading: "RTP и волатильность Lucky Jet",
          body: "На карточке 1weapp для Lucky Jet указан ориентир RTP ~97.00%. Это долгий средний показатель, а не обещание часа игры. Высокая или средняя волатильность значит: сухие серии на короткой выборке — норма, не «поломка» демо.",
          bullets: [
            "RTP ~97.00% — долгий ориентир, не гарантия сессии",
            "Короткая выборка всегда врёт сильнее длинной",
            "В демо проверьте, выдерживает ли ваш план ставки 80–150 раундов",
          ],
        },
        {
          heading: "Чеклист перед игрой на деньги",
          bullets: [
            "Поняли, как в Lucky Jet устроены кэшаут до улёта джета",
            "Увидели хотя бы одну характерную фичу в демо",
            "Задали лимит сессии и депозита заранее",
            "Играете только 18+, без догона после сухой серии",
          ],
          callout: "Сначала «lucky jet играть бесплатно» в демо — потом осознанный переход на деньги, если формат вам подходит.",
        },
      ],
      en: [
        {
          heading: "Lucky Jet demo no registration — quick start",
          body: "People searching “lucky jet demo no registration” want the 1weapp Games crash demo in the browser with virtual credits — no account wall. On 1weapp the Lucky Jet card launches the free demo build. “lucky jet free play” is the same intent.",
          callout: "Run 40–60 demo rounds with one cash-out target so you learn pace, not impulse.",
          bullets: [
            "Open /en/lucky-jet and tap Launch Demo",
            "Keep one stake size for 40+ rounds",
            "No signup required for the 1weapp demo",
          ],
        },
        {
          heading: "Lucky Jet: cash-out before the jet flies away",
          body: "Lucky Jet is a crash title: the multiplier climbs while the jet is airborne. Cash out before it crashes. Demo uses virtual credits so you can compare early exits vs chasing a high x.",
          body2: "Demo helps you calibrate pace and feature frequency — it does not prove the game “owes” a win after losses. RNG has no memory.",
          bullets: [
            "Multiplier climbs until cash-out or crash",
            "Auto cash-out helps keep a plan",
            "Demo does not predict the next flight",
          ],
        },
        {
          heading: "Lucky Jet free play tips",
          body: "In demo, practice three plans: auto cash-out at 1.5x–2x, manual gut-feel exits, and rare high-x attempts on a small bankroll slice. Note dry flight stretches — crash RNG does not “owe” a big multiplier after early busts.",
          strategies: [
            {
              title: "Learning session (demo)",
              bullets: [
                "Fixed stake for 50–100 rounds",
                "Log rounds-to-feature and dry-streak length",
                "Do not raise cash-out targets after early crash streaks",
              ],
            },
            {
              title: "After 1–3 features",
              bullets: [
                "Compare bankroll feel: base vs feature at the same stake",
                "Decide if the volatility profile fits you",
                "Only then set real-money limits — if you play cash at all",
              ],
            },
          ],
          callout: "Demo does not predict the next feature. It shows volatility on your session length.",
        },
        {
          heading: "RTP and volatility",
          body: "The 1weapp card lists Lucky Jet RTP around ~97.00%. That is a long-run average, not an hourly promise. Medium/high volatility means dry stretches on short samples are normal — not a “broken” demo.",
          bullets: [
            "RTP ~97.00% is a long-horizon guide",
            "Short samples lie more than long ones",
            "In demo, check whether your stake plan survives 80–150 rounds",
          ],
        },
        {
          heading: "Checklist before real-money play",
          bullets: [
            "You understand cash-out before the jet flies away in Lucky Jet",
            "You have seen at least one signature feature in demo",
            "Session and deposit limits are set in advance",
            "18+ only — never chase a dry streak",
          ],
          callout: "Learn free in demo first. Move to real money only if the format fits your limits.",
        },
      ],
    },
  },
  {
    id: "gates-of-olympus-demo",
    gameSlug: "gates-of-olympus",
    avatar: "/avatars/gates-of-olympus.webp",
    intentBand: "mid",
    titleRu: "Gates of Olympus демо без регистрации — tumble и множители Зевса",
    titleEn: "Gates of Olympus Demo No Registration — Tumbles and Zeus multipliers",
    subtitleRu: "Как открыть Gates of Olympus демо без регистрации, понять tumble и множители Зевса и отработать бесплатно",
    subtitleEn: "Open Gates of Olympus demo with no signup, learn tumbles and Zeus multipliers, and practice for free",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    keywordsRu: [
      "gates of olympus демо без регистрации",
      "врата олимпа играть бесплатно",
      "gates of olympus как работают множители",
      "gates of olympus фриспины тактика",
      "gates of olympus rtp волатильность",
    ],
    keywordsEn: [
      "gates of olympus demo no registration",
      "how gates of olympus multipliers work",
      "gates of olympus free spins demo tips",
      "gates of olympus rtp volatility",
    ],
    descriptionRu: "Практический разбор: Gates of Olympus демо без регистрации, tumble и множители Зевса, RTP 96.50%. Играть бесплатно на 1weapp, 18+.",
    descriptionEn: "Practical guide: Gates of Olympus demo no registration, tumbles and Zeus multipliers, RTP 96.50%. Play free on 1weapp, 18+.",
    titleSeoRu: "Gates of Olympus демо без регистрации — гайд и бесплатная игра | 1weapp",
    titleSeoEn: "Gates of Olympus Demo No Registration — Free Play Guide | 1weapp",
    descriptionSeoRu: "Gates of Olympus демо без регистрации: tumble и множители Зевса, RTP 96.50%. Играйте бесплатно в браузере на 1weapp.",
    descriptionSeoEn: "Gates of Olympus demo no registration: tumbles and Zeus multipliers, RTP 96.50%. Play the free demo in your browser on 1weapp.",
    sections: {
      ru: [
        {
          heading: "Gates of Olympus демо без регистрации — с чего начать",
          body: "Запрос «gates of olympus демо без регистрации» обычно значит одно: открыть демо слота Pragmatic Play сразу в браузере, без аккаунта и депозита. На 1weapp карточка Gates of Olympus запускает официальное демо с виртуальным балансом. Параллельный запрос — «gates of olympus играть бесплатно»: та же цель.",
          callout: "Сначала 80–120 спинов на фиксированной ставке — так вы увидите сухие серии до любого депозита.",
          bullets: [
            "Откройте /ru/gates-of-olympus и нажмите «Запустить демо»",
            "Ставка в демо — учебная: держите один размер 40+ раундов подряд",
            "Регистрация и депозит для демо на 1weapp не нужны",
          ],
        },
        {
          heading: "Gates of Olympus: tumble и множители Зевса",
          body: "Gates of Olympus — слот Pragmatic Play на сетке 6×5 Pay Anywhere: 8+ одинаковых символов в любом месте дают выплату, затем каскад (tumble). Зевс может бросать сферы-множители от 2x до 500x на текущий каскад. В базе множители не копятся между спинами.",
          body2: "Именно поэтому демо полезно: вы калибруете ожидания по темпу и частоте фич, а не ищете «сигнал», что игра «должна отдать». RNG не читает историю проигрышей.",
          bullets: [
            "Фокус механики: tumble и множители Зевса",
            "База учит темпу; бонус — зона всплесков",
            "Демо не предсказывает следующий бонус",
          ],
        },
        {
          heading: "Gates of Olympus: фичи и тактика в демо",
          body: "Во фриспинах множители часто складываются в Total Multiplier и не сбрасываются между фриспинами — профиль сессии резко меняется. Демо идеально, чтобы увидеть 1–2 бонуса без депозита и сравнить «тихую» базу с всплесками бонуса.",
          strategies: [
            {
              title: "Учебная сессия в демо (низкий риск обучения)",
              bullets: [
                "Фиксированная ставка 50–100 раундов без смены размера",
                "Записывайте: сколько раундов до первой фичи, длина сухих серий",
                "Не включайте buy bonus, пока не поняли базовый темп",
              ],
            },
            {
              title: "После 1–3 фич / бонусов",
              bullets: [
                "Сравните ощущение банка: база vs фича на той же ставке",
                "Решите, подходит ли вам волатильность формата",
                "Только потом думайте о лимитах на деньги — если вообще нужно",
              ],
            },
          ],
          callout: "Демо не предсказывает следующую фичу. Оно показывает волатильность на вашей длине сессии.",
        },
        {
          heading: "RTP и волатильность Gates of Olympus",
          body: "На карточке 1weapp для Gates of Olympus указан ориентир RTP 96.50%. Это долгий средний показатель, а не обещание часа игры. Высокая или средняя волатильность значит: сухие серии на короткой выборке — норма, не «поломка» демо.",
          bullets: [
            "RTP 96.50% — долгий ориентир, не гарантия сессии",
            "Короткая выборка всегда врёт сильнее длинной",
            "В демо проверьте, выдерживает ли ваш план ставки 80–150 раундов",
          ],
        },
        {
          heading: "Чеклист перед игрой на деньги",
          bullets: [
            "Поняли, как в Gates of Olympus устроены tumble и множители Зевса",
            "Увидели хотя бы одну характерную фичу в демо",
            "Задали лимит сессии и депозита заранее",
            "Играете только 18+, без догона после сухой серии",
          ],
          callout: "Сначала «gates of olympus играть бесплатно» в демо — потом осознанный переход на деньги, если формат вам подходит.",
        },
      ],
      en: [
        {
          heading: "Gates of Olympus demo no registration — quick start",
          body: "People searching “gates of olympus demo no registration” want the Pragmatic Play slot demo in the browser with virtual credits — no account wall. On 1weapp the Gates of Olympus card launches the free demo build. “gates of olympus free play” is the same intent.",
          callout: "Run 80–120 fixed-stake demo spins first so you feel dry stretches before any deposit.",
          bullets: [
            "Open /en/gates-of-olympus and tap Launch Demo",
            "Keep one stake size for 40+ rounds",
            "No signup required for the 1weapp demo",
          ],
        },
        {
          heading: "Gates of Olympus: tumbles and Zeus multipliers",
          body: "Gates of Olympus is a Pragmatic Play 6×5 Pay Anywhere slot: 8+ matching symbols anywhere pay, then tumble. Zeus can throw multiplier orbs from 2x to 500x on the current cascade. Base-game multipliers do not carry between spins.",
          body2: "Demo helps you calibrate pace and feature frequency — it does not prove the game “owes” a win after losses. RNG has no memory.",
          bullets: [
            "Mechanic focus: tumbles and Zeus multipliers",
            "Base trains pace; features are spike zones",
            "Demo does not predict the next bonus",
          ],
        },
        {
          heading: "Gates of Olympus free play tips",
          body: "In free spins, multipliers often stack into a Total Multiplier that persists inside the feature — session feel changes a lot. Demo is ideal to see 1–2 bonuses with no deposit and compare quiet base play to bonus spikes.",
          strategies: [
            {
              title: "Learning session (demo)",
              bullets: [
                "Fixed stake for 50–100 rounds",
                "Log rounds-to-feature and dry-streak length",
                "Skip bonus buy until base pace feels familiar",
              ],
            },
            {
              title: "After 1–3 features",
              bullets: [
                "Compare bankroll feel: base vs feature at the same stake",
                "Decide if the volatility profile fits you",
                "Only then set real-money limits — if you play cash at all",
              ],
            },
          ],
          callout: "Demo does not predict the next feature. It shows volatility on your session length.",
        },
        {
          heading: "RTP and volatility",
          body: "The 1weapp card lists Gates of Olympus RTP around 96.50%. That is a long-run average, not an hourly promise. Medium/high volatility means dry stretches on short samples are normal — not a “broken” demo.",
          bullets: [
            "RTP 96.50% is a long-horizon guide",
            "Short samples lie more than long ones",
            "In demo, check whether your stake plan survives 80–150 rounds",
          ],
        },
        {
          heading: "Checklist before real-money play",
          bullets: [
            "You understand tumbles and Zeus multipliers in Gates of Olympus",
            "You have seen at least one signature feature in demo",
            "Session and deposit limits are set in advance",
            "18+ only — never chase a dry streak",
          ],
          callout: "Learn free in demo first. Move to real money only if the format fits your limits.",
        },
      ],
    },
  },
  {
    id: "sweet-bonanza-demo",
    gameSlug: "sweet-bonanza",
    avatar: "/avatars/sweet-bonanza.webp",
    intentBand: "mid",
    titleRu: "Sweet Bonanza демо без регистрации — кластеры конфет и множители во фриспинах",
    titleEn: "Sweet Bonanza Demo No Registration — Candy clusters and free-spins multipliers",
    subtitleRu: "Как открыть Sweet Bonanza демо без регистрации, понять кластеры конфет и множители во фриспинах и отработать бесплатно",
    subtitleEn: "Open Sweet Bonanza demo with no signup, learn candy clusters and free-spins multipliers, and practice for free",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    keywordsRu: [
      "sweet bonanza демо без регистрации",
      "sweet bonanza играть бесплатно",
      "sweet bonanza демо без депозита",
      "sweet bonanza как играть",
      "sweet bonanza rtp волатильность",
    ],
    keywordsEn: [
      "sweet bonanza demo no registration",
      "sweet bonanza free play",
      "sweet bonanza demo no deposit",
      "how to play sweet bonanza demo",
      "sweet bonanza rtp volatility",
    ],
    descriptionRu: "Практический разбор: Sweet Bonanza демо без регистрации, кластеры конфет и множители во фриспинах, RTP 96.48%. Играть бесплатно на 1weapp, 18+.",
    descriptionEn: "Practical guide: Sweet Bonanza demo no registration, candy clusters and free-spins multipliers, RTP 96.48%. Play free on 1weapp, 18+.",
    titleSeoRu: "Sweet Bonanza демо без регистрации — гайд и бесплатная игра | 1weapp",
    titleSeoEn: "Sweet Bonanza Demo No Registration — Free Play Guide | 1weapp",
    descriptionSeoRu: "Sweet Bonanza демо без регистрации: кластеры конфет и множители во фриспинах, RTP 96.48%. Играйте бесплатно в браузере на 1weapp.",
    descriptionSeoEn: "Sweet Bonanza demo no registration: candy clusters and free-spins multipliers, RTP 96.48%. Play the free demo in your browser on 1weapp.",
    sections: {
      ru: [
        {
          heading: "Sweet Bonanza демо без регистрации — с чего начать",
          body: "Запрос «sweet bonanza демо без регистрации» обычно значит одно: открыть демо слота Pragmatic Play сразу в браузере, без аккаунта и депозита. На 1weapp карточка Sweet Bonanza запускает официальное демо с виртуальным балансом. Параллельный запрос — «sweet bonanza играть бесплатно»: та же цель.",
          callout: "Держите одну ставку 60–100 спинов и запишите число бонусов — так видна волатильность.",
          bullets: [
            "Откройте /ru/sweet-bonanza и нажмите «Запустить демо»",
            "Ставка в демо — учебная: держите один размер 40+ раундов подряд",
            "Регистрация и депозит для демо на 1weapp не нужны",
          ],
        },
        {
          heading: "Sweet Bonanza: кластеры конфет и множители во фриспинах",
          body: "Sweet Bonanza — флагманский candy-слот Pragmatic с выплатами за кластеры (scatter pays), а не за линии. Выигрышные символы исчезают, сверху падают новые. Темп сессии задают каскады и редкие входы в бонус.",
          body2: "Именно поэтому демо полезно: вы калибруете ожидания по темпу и частоте фич, а не ищете «сигнал», что игра «должна отдать». RNG не читает историю проигрышей.",
          bullets: [
            "Фокус механики: кластеры конфет и множители во фриспинах",
            "База учит темпу; бонус — зона всплесков",
            "Демо не предсказывает следующий бонус",
          ],
        },
        {
          heading: "Sweet Bonanza: фичи и тактика в демо",
          body: "В бесплатных спинах на поле могут появляться множители, которые усиливают кластерные выплаты. В демо посчитайте, как часто выходит бонус на вашей длине сессии — не ищите «сигнал», что слот «должен» отдать.",
          strategies: [
            {
              title: "Учебная сессия в демо (низкий риск обучения)",
              bullets: [
                "Фиксированная ставка 50–100 раундов без смены размера",
                "Записывайте: сколько раундов до первой фичи, длина сухих серий",
                "Не включайте buy bonus, пока не поняли базовый темп",
              ],
            },
            {
              title: "После 1–3 фич / бонусов",
              bullets: [
                "Сравните ощущение банка: база vs фича на той же ставке",
                "Решите, подходит ли вам волатильность формата",
                "Только потом думайте о лимитах на деньги — если вообще нужно",
              ],
            },
          ],
          callout: "Демо не предсказывает следующую фичу. Оно показывает волатильность на вашей длине сессии.",
        },
        {
          heading: "RTP и волатильность Sweet Bonanza",
          body: "На карточке 1weapp для Sweet Bonanza указан ориентир RTP 96.48%. Это долгий средний показатель, а не обещание часа игры. Высокая или средняя волатильность значит: сухие серии на короткой выборке — норма, не «поломка» демо.",
          bullets: [
            "RTP 96.48% — долгий ориентир, не гарантия сессии",
            "Короткая выборка всегда врёт сильнее длинной",
            "В демо проверьте, выдерживает ли ваш план ставки 80–150 раундов",
          ],
        },
        {
          heading: "Чеклист перед игрой на деньги",
          bullets: [
            "Поняли, как в Sweet Bonanza устроены кластеры конфет и множители во фриспинах",
            "Увидели хотя бы одну характерную фичу в демо",
            "Задали лимит сессии и депозита заранее",
            "Играете только 18+, без догона после сухой серии",
          ],
          callout: "Сначала «sweet bonanza играть бесплатно» в демо — потом осознанный переход на деньги, если формат вам подходит.",
        },
      ],
      en: [
        {
          heading: "Sweet Bonanza demo no registration — quick start",
          body: "People searching “sweet bonanza demo no registration” want the Pragmatic Play slot demo in the browser with virtual credits — no account wall. On 1weapp the Sweet Bonanza card launches the free demo build. “sweet bonanza free play” is the same intent.",
          callout: "Keep one stake for 60–100 spins and log bonus count — that shows volatility better than one lucky hit.",
          bullets: [
            "Open /en/sweet-bonanza and tap Launch Demo",
            "Keep one stake size for 40+ rounds",
            "No signup required for the 1weapp demo",
          ],
        },
        {
          heading: "Sweet Bonanza: candy clusters and free-spins multipliers",
          body: "Sweet Bonanza is Pragmatic’s flagship candy slot with cluster (scatter pays) wins instead of paylines. Winning symbols tumble away for new drops. Cascades and rare bonus entries set the session pace.",
          body2: "Demo helps you calibrate pace and feature frequency — it does not prove the game “owes” a win after losses. RNG has no memory.",
          bullets: [
            "Mechanic focus: candy clusters and free-spins multipliers",
            "Base trains pace; features are spike zones",
            "Demo does not predict the next bonus",
          ],
        },
        {
          heading: "Sweet Bonanza free play tips",
          body: "Free spins can drop multipliers that boost cluster wins. In demo, track how often the bonus appears on your session length — do not treat dry stretches as a signal the slot “owes” a feature.",
          strategies: [
            {
              title: "Learning session (demo)",
              bullets: [
                "Fixed stake for 50–100 rounds",
                "Log rounds-to-feature and dry-streak length",
                "Skip bonus buy until base pace feels familiar",
              ],
            },
            {
              title: "After 1–3 features",
              bullets: [
                "Compare bankroll feel: base vs feature at the same stake",
                "Decide if the volatility profile fits you",
                "Only then set real-money limits — if you play cash at all",
              ],
            },
          ],
          callout: "Demo does not predict the next feature. It shows volatility on your session length.",
        },
        {
          heading: "RTP and volatility",
          body: "The 1weapp card lists Sweet Bonanza RTP around 96.48%. That is a long-run average, not an hourly promise. Medium/high volatility means dry stretches on short samples are normal — not a “broken” demo.",
          bullets: [
            "RTP 96.48% is a long-horizon guide",
            "Short samples lie more than long ones",
            "In demo, check whether your stake plan survives 80–150 rounds",
          ],
        },
        {
          heading: "Checklist before real-money play",
          bullets: [
            "You understand candy clusters and free-spins multipliers in Sweet Bonanza",
            "You have seen at least one signature feature in demo",
            "Session and deposit limits are set in advance",
            "18+ only — never chase a dry streak",
          ],
          callout: "Learn free in demo first. Move to real money only if the format fits your limits.",
        },
      ],
    },
  },
  {
    id: "rocket-queen-demo",
    gameSlug: "rocket-queen",
    avatar: "/avatars/rocket-queen.webp",
    intentBand: "mid",
    titleRu: "Rocket Queen демо без регистрации — рост множителя и авто/ручной кэшаут",
    titleEn: "Rocket Queen Demo No Registration — Rising multiplier and auto/manual cash-out",
    subtitleRu: "Как открыть Rocket Queen демо без регистрации, понять рост множителя и авто/ручной кэшаут и отработать бесплатно",
    subtitleEn: "Open Rocket Queen demo with no signup, learn rising multiplier and auto/manual cash-out, and practice for free",
    tagRu: "Crash · 1weapp",
    tagEn: "Crash · 1weapp",
    keywordsRu: [
      "rocket queen демо без регистрации",
      "rocket queen играть бесплатно",
      "rocket queen демо без депозита",
      "rocket queen как играть",
      "rocket queen rtp волатильность",
    ],
    keywordsEn: [
      "rocket queen demo no registration",
      "rocket queen free play",
      "rocket queen demo no deposit",
      "how to play rocket queen demo",
      "rocket queen rtp volatility",
    ],
    descriptionRu: "Практический разбор: Rocket Queen демо без регистрации, рост множителя и авто/ручной кэшаут, RTP ~97.00%. Играть бесплатно на 1weapp, 18+.",
    descriptionEn: "Practical guide: Rocket Queen demo no registration, rising multiplier and auto/manual cash-out, RTP ~97.00%. Play free on 1weapp, 18+.",
    titleSeoRu: "Rocket Queen демо без регистрации — гайд и бесплатная игра | 1weapp",
    titleSeoEn: "Rocket Queen Demo No Registration — Free Play Guide | 1weapp",
    descriptionSeoRu: "Rocket Queen демо без регистрации: рост множителя и авто/ручной кэшаут, RTP ~97.00%. Играйте бесплатно в браузере на 1weapp.",
    descriptionSeoEn: "Rocket Queen demo no registration: rising multiplier and auto/manual cash-out, RTP ~97.00%. Play the free demo in your browser on 1weapp.",
    sections: {
      ru: [
        {
          heading: "Rocket Queen демо без регистрации — с чего начать",
          body: "Запрос «rocket queen демо без регистрации» обычно значит одно: открыть crash-демо 1weapp Games сразу в браузере, без аккаунта и депозита. На 1weapp карточка Rocket Queen запускает официальное демо с виртуальным балансом. Параллельный запрос — «rocket queen играть бесплатно»: та же цель.",
          callout: "Не повышайте цель после серии ранних крашей — это классический догон.",
          bullets: [
            "Откройте /ru/rocket-queen и нажмите «Запустить демо»",
            "Ставка в демо — учебная: держите один размер 40+ раундов подряд",
            "Регистрация и депозит для демо на 1weapp не нужны",
          ],
        },
        {
          heading: "Rocket Queen: рост множителя и авто/ручной кэшаут",
          body: "Rocket Queen — crash-демо с ракетной темой: множитель растёт, пока ракета в полёте. Вы забираете виртуальный выигрыш кэшаутом или теряете раунд при краше. Правила те же, что в режиме на деньги, баланс — учебный.",
          body2: "Именно поэтому демо полезно: вы калибруете ожидания по темпу и частоте фич, а не ищете «сигнал», что игра «должна отдать». RNG не читает историю проигрышей.",
          bullets: [
            "Множитель растёт до кэшаута или краша",
            "Авто-кэшаут помогает держать план",
            "Демо не предсказывает следующий полёт",
          ],
        },
        {
          heading: "Rocket Queen: фичи и тактика в демо",
          body: "Сравните авто-кэшаут на фиксированной цели с ручным выходом. Crash-игры быстро «съедают» дисциплину — демо как раз место, где можно ошибиться без депозита.",
          strategies: [
            {
              title: "Учебная сессия в демо (низкий риск обучения)",
              bullets: [
                "Фиксированная ставка 50–100 раундов без смены размера",
                "Записывайте: сколько раундов до первой фичи, длина сухих серий",
                "Не поднимайте цель кэшаута после серии ранних крашей",
              ],
            },
            {
              title: "После 1–3 фич / бонусов",
              bullets: [
                "Сравните ощущение банка: база vs фича на той же ставке",
                "Решите, подходит ли вам волатильность формата",
                "Только потом думайте о лимитах на деньги — если вообще нужно",
              ],
            },
          ],
          callout: "Демо не предсказывает следующую фичу. Оно показывает волатильность на вашей длине сессии.",
        },
        {
          heading: "RTP и волатильность Rocket Queen",
          body: "На карточке 1weapp для Rocket Queen указан ориентир RTP ~97.00%. Это долгий средний показатель, а не обещание часа игры. Высокая или средняя волатильность значит: сухие серии на короткой выборке — норма, не «поломка» демо.",
          bullets: [
            "RTP ~97.00% — долгий ориентир, не гарантия сессии",
            "Короткая выборка всегда врёт сильнее длинной",
            "В демо проверьте, выдерживает ли ваш план ставки 80–150 раундов",
          ],
        },
        {
          heading: "Чеклист перед игрой на деньги",
          bullets: [
            "Поняли, как в Rocket Queen устроены рост множителя и авто/ручной кэшаут",
            "Увидели хотя бы одну характерную фичу в демо",
            "Задали лимит сессии и депозита заранее",
            "Играете только 18+, без догона после сухой серии",
          ],
          callout: "Сначала «rocket queen играть бесплатно» в демо — потом осознанный переход на деньги, если формат вам подходит.",
        },
      ],
      en: [
        {
          heading: "Rocket Queen demo no registration — quick start",
          body: "People searching “rocket queen demo no registration” want the 1weapp Games crash demo in the browser with virtual credits — no account wall. On 1weapp the Rocket Queen card launches the free demo build. “rocket queen free play” is the same intent.",
          callout: "Do not raise your cash-out target after a streak of early crashes — that is classic chase behaviour.",
          bullets: [
            "Open /en/rocket-queen and tap Launch Demo",
            "Keep one stake size for 40+ rounds",
            "No signup required for the 1weapp demo",
          ],
        },
        {
          heading: "Rocket Queen: rising multiplier and auto/manual cash-out",
          body: "Rocket Queen is a rocket-themed crash demo: the multiplier climbs while the rocket flies. Cash out for a virtual win or lose the round on a crash. Same rules as cash mode; balance is for practice only.",
          body2: "Demo helps you calibrate pace and feature frequency — it does not prove the game “owes” a win after losses. RNG has no memory.",
          bullets: [
            "Multiplier climbs until cash-out or crash",
            "Auto cash-out helps keep a plan",
            "Demo does not predict the next flight",
          ],
        },
        {
          heading: "Rocket Queen free play tips",
          body: "Compare fixed auto cash-out targets with manual exits. Crash titles burn discipline fast — demo is where mistakes should stay free.",
          strategies: [
            {
              title: "Learning session (demo)",
              bullets: [
                "Fixed stake for 50–100 rounds",
                "Log rounds-to-feature and dry-streak length",
                "Do not raise cash-out targets after early crash streaks",
              ],
            },
            {
              title: "After 1–3 features",
              bullets: [
                "Compare bankroll feel: base vs feature at the same stake",
                "Decide if the volatility profile fits you",
                "Only then set real-money limits — if you play cash at all",
              ],
            },
          ],
          callout: "Demo does not predict the next feature. It shows volatility on your session length.",
        },
        {
          heading: "RTP and volatility",
          body: "The 1weapp card lists Rocket Queen RTP around ~97.00%. That is a long-run average, not an hourly promise. Medium/high volatility means dry stretches on short samples are normal — not a “broken” demo.",
          bullets: [
            "RTP ~97.00% is a long-horizon guide",
            "Short samples lie more than long ones",
            "In demo, check whether your stake plan survives 80–150 rounds",
          ],
        },
        {
          heading: "Checklist before real-money play",
          bullets: [
            "You understand rising multiplier and auto/manual cash-out in Rocket Queen",
            "You have seen at least one signature feature in demo",
            "Session and deposit limits are set in advance",
            "18+ only — never chase a dry streak",
          ],
          callout: "Learn free in demo first. Move to real money only if the format fits your limits.",
        },
      ],
    },
  },
  {
    id: "sugar-rush-demo",
    gameSlug: "sugar-rush",
    avatar: "/avatars/sugar-rush.webp",
    intentBand: "mid",
    titleRu: "Sugar Rush демо без регистрации — кластеры и множители на клетках сетки",
    titleEn: "Sugar Rush Demo No Registration — Clusters and sticky grid multipliers",
    subtitleRu: "Как открыть Sugar Rush демо без регистрации, понять кластеры и множители на клетках сетки и отработать бесплатно",
    subtitleEn: "Open Sugar Rush demo with no signup, learn clusters and sticky grid multipliers, and practice for free",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    keywordsRu: [
      "sugar rush демо без регистрации",
      "sugar rush играть бесплатно",
      "sugar rush демо без депозита",
      "sugar rush как играть",
      "sugar rush rtp волатильность",
    ],
    keywordsEn: [
      "sugar rush demo no registration",
      "sugar rush free play",
      "sugar rush demo no deposit",
      "how to play sugar rush demo",
      "sugar rush rtp volatility",
    ],
    descriptionRu: "Практический разбор: Sugar Rush демо без регистрации, кластеры и множители на клетках сетки, RTP 96.50%. Играть бесплатно на 1weapp, 18+.",
    descriptionEn: "Practical guide: Sugar Rush demo no registration, clusters and sticky grid multipliers, RTP 96.50%. Play free on 1weapp, 18+.",
    titleSeoRu: "Sugar Rush демо без регистрации — гайд и бесплатная игра | 1weapp",
    titleSeoEn: "Sugar Rush Demo No Registration — Free Play Guide | 1weapp",
    descriptionSeoRu: "Sugar Rush демо без регистрации: кластеры и множители на клетках сетки, RTP 96.50%. Играйте бесплатно в браузере на 1weapp.",
    descriptionSeoEn: "Sugar Rush demo no registration: clusters and sticky grid multipliers, RTP 96.50%. Play the free demo in your browser on 1weapp.",
    sections: {
      ru: [
        {
          heading: "Sugar Rush демо без регистрации — с чего начать",
          body: "Запрос «sugar rush демо без регистрации» обычно значит одно: открыть демо слота Pragmatic Play сразу в браузере, без аккаунта и депозита. На 1weapp карточка Sugar Rush запускает официальное демо с виртуальным балансом. Параллельный запрос — «sugar rush играть бесплатно»: та же цель.",
          callout: "Сделайте 70–100 демо-спинов на одной ставке, прежде чем судить о «везении» сетки.",
          bullets: [
            "Откройте /ru/sugar-rush и нажмите «Запустить демо»",
            "Ставка в демо — учебная: держите один размер 40+ раундов подряд",
            "Регистрация и депозит для демо на 1weapp не нужны",
          ],
        },
        {
          heading: "Sugar Rush: кластеры и множители на клетках сетки",
          body: "Sugar Rush — конфетный слот Pragmatic с кластерными выплатами на сетке. Особые клетки могут получать множители, которые усиливают последующие выигрыши на этих позициях — отсюда «липкое» ощущение поля.",
          body2: "Именно поэтому демо полезно: вы калибруете ожидания по темпу и частоте фич, а не ищете «сигнал», что игра «должна отдать». RNG не читает историю проигрышей.",
          bullets: [
            "Фокус механики: кластеры и множители на клетках сетки",
            "База учит темпу; бонус — зона всплесков",
            "Демо не предсказывает следующий бонус",
          ],
        },
        {
          heading: "Sugar Rush: фичи и тактика в демо",
          body: "В демо следите, какие клетки «загораются» множителями после каскадов и как это меняет размер следующих кластеров. Бонусный режим обычно усиливает ту же идею.",
          strategies: [
            {
              title: "Учебная сессия в демо (низкий риск обучения)",
              bullets: [
                "Фиксированная ставка 50–100 раундов без смены размера",
                "Записывайте: сколько раундов до первой фичи, длина сухих серий",
                "Не включайте buy bonus, пока не поняли базовый темп",
              ],
            },
            {
              title: "После 1–3 фич / бонусов",
              bullets: [
                "Сравните ощущение банка: база vs фича на той же ставке",
                "Решите, подходит ли вам волатильность формата",
                "Только потом думайте о лимитах на деньги — если вообще нужно",
              ],
            },
          ],
          callout: "Демо не предсказывает следующую фичу. Оно показывает волатильность на вашей длине сессии.",
        },
        {
          heading: "RTP и волатильность Sugar Rush",
          body: "На карточке 1weapp для Sugar Rush указан ориентир RTP 96.50%. Это долгий средний показатель, а не обещание часа игры. Высокая или средняя волатильность значит: сухие серии на короткой выборке — норма, не «поломка» демо.",
          bullets: [
            "RTP 96.50% — долгий ориентир, не гарантия сессии",
            "Короткая выборка всегда врёт сильнее длинной",
            "В демо проверьте, выдерживает ли ваш план ставки 80–150 раундов",
          ],
        },
        {
          heading: "Чеклист перед игрой на деньги",
          bullets: [
            "Поняли, как в Sugar Rush устроены кластеры и множители на клетках сетки",
            "Увидели хотя бы одну характерную фичу в демо",
            "Задали лимит сессии и депозита заранее",
            "Играете только 18+, без догона после сухой серии",
          ],
          callout: "Сначала «sugar rush играть бесплатно» в демо — потом осознанный переход на деньги, если формат вам подходит.",
        },
      ],
      en: [
        {
          heading: "Sugar Rush demo no registration — quick start",
          body: "People searching “sugar rush demo no registration” want the Pragmatic Play slot demo in the browser with virtual credits — no account wall. On 1weapp the Sugar Rush card launches the free demo build. “sugar rush free play” is the same intent.",
          callout: "Run 70–100 fixed-stake demo spins before judging whether the grid “feels hot”.",
          bullets: [
            "Open /en/sugar-rush and tap Launch Demo",
            "Keep one stake size for 40+ rounds",
            "No signup required for the 1weapp demo",
          ],
        },
        {
          heading: "Sugar Rush: clusters and sticky grid multipliers",
          body: "Sugar Rush is a Pragmatic candy slot with cluster pays on a grid. Special cells can gain multipliers that boost later wins on those spots — that sticky-grid feel is the core hook.",
          body2: "Demo helps you calibrate pace and feature frequency — it does not prove the game “owes” a win after losses. RNG has no memory.",
          bullets: [
            "Mechanic focus: clusters and sticky grid multipliers",
            "Base trains pace; features are spike zones",
            "Demo does not predict the next bonus",
          ],
        },
        {
          heading: "Sugar Rush free play tips",
          body: "In demo, watch which cells light up with multipliers after cascades and how that changes the next cluster size. The bonus usually amplifies the same idea.",
          strategies: [
            {
              title: "Learning session (demo)",
              bullets: [
                "Fixed stake for 50–100 rounds",
                "Log rounds-to-feature and dry-streak length",
                "Skip bonus buy until base pace feels familiar",
              ],
            },
            {
              title: "After 1–3 features",
              bullets: [
                "Compare bankroll feel: base vs feature at the same stake",
                "Decide if the volatility profile fits you",
                "Only then set real-money limits — if you play cash at all",
              ],
            },
          ],
          callout: "Demo does not predict the next feature. It shows volatility on your session length.",
        },
        {
          heading: "RTP and volatility",
          body: "The 1weapp card lists Sugar Rush RTP around 96.50%. That is a long-run average, not an hourly promise. Medium/high volatility means dry stretches on short samples are normal — not a “broken” demo.",
          bullets: [
            "RTP 96.50% is a long-horizon guide",
            "Short samples lie more than long ones",
            "In demo, check whether your stake plan survives 80–150 rounds",
          ],
        },
        {
          heading: "Checklist before real-money play",
          bullets: [
            "You understand clusters and sticky grid multipliers in Sugar Rush",
            "You have seen at least one signature feature in demo",
            "Session and deposit limits are set in advance",
            "18+ only — never chase a dry streak",
          ],
          callout: "Learn free in demo first. Move to real money only if the format fits your limits.",
        },
      ],
    },
  },
  {
    id: "starlight-princess-demo",
    gameSlug: "starlight-princess",
    avatar: "/avatars/starlight-princess.webp",
    intentBand: "mid",
    titleRu: "Starlight Princess демо без регистрации — tumble и множители принцессы",
    titleEn: "Starlight Princess Demo No Registration — Tumbles and princess multipliers",
    subtitleRu: "Как открыть Starlight Princess демо без регистрации, понять tumble и множители принцессы и отработать бесплатно",
    subtitleEn: "Open Starlight Princess demo with no signup, learn tumbles and princess multipliers, and practice for free",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    keywordsRu: [
      "starlight princess демо без регистрации",
      "starlight princess играть бесплатно",
      "starlight princess демо без депозита",
      "starlight princess как играть",
      "starlight princess rtp волатильность",
    ],
    keywordsEn: [
      "starlight princess demo no registration",
      "starlight princess free play",
      "starlight princess demo no deposit",
      "how to play starlight princess demo",
      "starlight princess rtp volatility",
    ],
    descriptionRu: "Практический разбор: Starlight Princess демо без регистрации, tumble и множители принцессы, RTP 96.50%. Играть бесплатно на 1weapp, 18+.",
    descriptionEn: "Practical guide: Starlight Princess demo no registration, tumbles and princess multipliers, RTP 96.50%. Play free on 1weapp, 18+.",
    titleSeoRu: "Starlight Princess демо без регистрации — гайд и бесплатная игра | 1weapp",
    titleSeoEn: "Starlight Princess Demo No Registration — Free Play Guide | 1weapp",
    descriptionSeoRu: "Starlight Princess демо без регистрации: tumble и множители принцессы, RTP 96.50%. Играйте бесплатно в браузере на 1weapp.",
    descriptionSeoEn: "Starlight Princess demo no registration: tumbles and princess multipliers, RTP 96.50%. Play the free demo in your browser on 1weapp.",
    sections: {
      ru: [
        {
          heading: "Starlight Princess демо без регистрации — с чего начать",
          body: "Запрос «starlight princess демо без регистрации» обычно значит одно: открыть демо слота Pragmatic Play сразу в браузере, без аккаунта и депозита. На 1weapp карточка Starlight Princess запускает официальное демо с виртуальным балансом. Параллельный запрос — «starlight princess играть бесплатно»: та же цель.",
          callout: "Не покупайте бонус в демо, пока не поняли базовый темп tumble.",
          bullets: [
            "Откройте /ru/starlight-princess и нажмите «Запустить демо»",
            "Ставка в демо — учебная: держите один размер 40+ раундов подряд",
            "Регистрация и депозит для демо на 1weapp не нужны",
          ],
        },
        {
          heading: "Starlight Princess: tumble и множители принцессы",
          body: "Starlight Princess — аниме-слот Pragmatic в духе tumble/pay-anywhere: выплаты за группу символов, каскады и символы-множители. По ощущению близка к Gates of Olympus, но со своей темой и темпом анимаций.",
          body2: "Именно поэтому демо полезно: вы калибруете ожидания по темпу и частоте фич, а не ищете «сигнал», что игра «должна отдать». RNG не читает историю проигрышей.",
          bullets: [
            "Фокус механики: tumble и множители принцессы",
            "База учит темпу; бонус — зона всплесков",
            "Демо не предсказывает следующий бонус",
          ],
        },
        {
          heading: "Starlight Princess: фичи и тактика в демо",
          body: "Во фриспинах множители часто работают агрессивнее, чем в базе. В демо сравните «тихие» серии базы с ощущением банка после бонуса — без депозита это безопасный стресс-тест волатильности.",
          strategies: [
            {
              title: "Учебная сессия в демо (низкий риск обучения)",
              bullets: [
                "Фиксированная ставка 50–100 раундов без смены размера",
                "Записывайте: сколько раундов до первой фичи, длина сухих серий",
                "Не включайте buy bonus, пока не поняли базовый темп",
              ],
            },
            {
              title: "После 1–3 фич / бонусов",
              bullets: [
                "Сравните ощущение банка: база vs фича на той же ставке",
                "Решите, подходит ли вам волатильность формата",
                "Только потом думайте о лимитах на деньги — если вообще нужно",
              ],
            },
          ],
          callout: "Демо не предсказывает следующую фичу. Оно показывает волатильность на вашей длине сессии.",
        },
        {
          heading: "RTP и волатильность Starlight Princess",
          body: "На карточке 1weapp для Starlight Princess указан ориентир RTP 96.50%. Это долгий средний показатель, а не обещание часа игры. Высокая или средняя волатильность значит: сухие серии на короткой выборке — норма, не «поломка» демо.",
          bullets: [
            "RTP 96.50% — долгий ориентир, не гарантия сессии",
            "Короткая выборка всегда врёт сильнее длинной",
            "В демо проверьте, выдерживает ли ваш план ставки 80–150 раундов",
          ],
        },
        {
          heading: "Чеклист перед игрой на деньги",
          bullets: [
            "Поняли, как в Starlight Princess устроены tumble и множители принцессы",
            "Увидели хотя бы одну характерную фичу в демо",
            "Задали лимит сессии и депозита заранее",
            "Играете только 18+, без догона после сухой серии",
          ],
          callout: "Сначала «starlight princess играть бесплатно» в демо — потом осознанный переход на деньги, если формат вам подходит.",
        },
      ],
      en: [
        {
          heading: "Starlight Princess demo no registration — quick start",
          body: "People searching “starlight princess demo no registration” want the Pragmatic Play slot demo in the browser with virtual credits — no account wall. On 1weapp the Starlight Princess card launches the free demo build. “starlight princess free play” is the same intent.",
          callout: "Skip bonus buy in demo until base tumble pace feels familiar.",
          bullets: [
            "Open /en/starlight-princess and tap Launch Demo",
            "Keep one stake size for 40+ rounds",
            "No signup required for the 1weapp demo",
          ],
        },
        {
          heading: "Starlight Princess: tumbles and princess multipliers",
          body: "Starlight Princess is a Pragmatic anime tumble/pay-anywhere style slot: group pays, cascades, and multiplier symbols. It feels related to Gates of Olympus, with its own theme and animation pace.",
          body2: "Demo helps you calibrate pace and feature frequency — it does not prove the game “owes” a win after losses. RNG has no memory.",
          bullets: [
            "Mechanic focus: tumbles and princess multipliers",
            "Base trains pace; features are spike zones",
            "Demo does not predict the next bonus",
          ],
        },
        {
          heading: "Starlight Princess free play tips",
          body: "Free spins often make multipliers more aggressive than base play. In demo, compare quiet base stretches with bankroll feel after a bonus — a safe volatility stress test with no deposit.",
          strategies: [
            {
              title: "Learning session (demo)",
              bullets: [
                "Fixed stake for 50–100 rounds",
                "Log rounds-to-feature and dry-streak length",
                "Skip bonus buy until base pace feels familiar",
              ],
            },
            {
              title: "After 1–3 features",
              bullets: [
                "Compare bankroll feel: base vs feature at the same stake",
                "Decide if the volatility profile fits you",
                "Only then set real-money limits — if you play cash at all",
              ],
            },
          ],
          callout: "Demo does not predict the next feature. It shows volatility on your session length.",
        },
        {
          heading: "RTP and volatility",
          body: "The 1weapp card lists Starlight Princess RTP around 96.50%. That is a long-run average, not an hourly promise. Medium/high volatility means dry stretches on short samples are normal — not a “broken” demo.",
          bullets: [
            "RTP 96.50% is a long-horizon guide",
            "Short samples lie more than long ones",
            "In demo, check whether your stake plan survives 80–150 rounds",
          ],
        },
        {
          heading: "Checklist before real-money play",
          bullets: [
            "You understand tumbles and princess multipliers in Starlight Princess",
            "You have seen at least one signature feature in demo",
            "Session and deposit limits are set in advance",
            "18+ only — never chase a dry streak",
          ],
          callout: "Learn free in demo first. Move to real money only if the format fits your limits.",
        },
      ],
    },
  },
  {
    id: "big-bass-bonanza-demo",
    gameSlug: "big-bass-bonanza",
    avatar: "/avatars/big-bass-bonanza.webp",
    intentBand: "mid",
    titleRu: "Big Bass Bonanza демо без регистрации — рыбак собирает стоимость рыб во фриспинах",
    titleEn: "Big Bass Bonanza Demo No Registration — Fisherman collecting fish values in free spins",
    subtitleRu: "Как открыть Big Bass Bonanza демо без регистрации, понять рыбак собирает стоимость рыб во фриспинах и отработать бесплатно",
    subtitleEn: "Open Big Bass Bonanza demo with no signup, learn fisherman collecting fish values in free spins, and practice for free",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    keywordsRu: [
      "big bass bonanza демо без регистрации",
      "big bass bonanza играть бесплатно",
      "big bass bonanza демо без депозита",
      "big bass bonanza как играть",
      "big bass bonanza rtp волатильность",
    ],
    keywordsEn: [
      "big bass bonanza demo no registration",
      "big bass bonanza free play",
      "big bass bonanza demo no deposit",
      "how to play big bass bonanza demo",
      "big bass bonanza rtp volatility",
    ],
    descriptionRu: "Практический разбор: Big Bass Bonanza демо без регистрации, рыбак собирает стоимость рыб во фриспинах, RTP 96.71%. Играть бесплатно на 1weapp, 18+.",
    descriptionEn: "Practical guide: Big Bass Bonanza demo no registration, fisherman collecting fish values in free spins, RTP 96.71%. Play free on 1weapp, 18+.",
    titleSeoRu: "Big Bass Bonanza демо без регистрации — гайд и бесплатная игра | 1weapp",
    titleSeoEn: "Big Bass Bonanza Demo No Registration — Free Play Guide | 1weapp",
    descriptionSeoRu: "Big Bass Bonanza демо без регистрации: рыбак собирает стоимость рыб во фриспинах, RTP 96.71%. Играйте бесплатно в браузере на 1weapp.",
    descriptionSeoEn: "Big Bass Bonanza demo no registration: fisherman collecting fish values in free spins, RTP 96.71%. Play the free demo in your browser on 1weapp.",
    sections: {
      ru: [
        {
          heading: "Big Bass Bonanza демо без регистрации — с чего начать",
          body: "Запрос «big bass bonanza демо без регистрации» обычно значит одно: открыть демо слота Pragmatic Play сразу в браузере, без аккаунта и депозита. На 1weapp карточка Big Bass Bonanza запускает официальное демо с виртуальным балансом. Параллельный запрос — «big bass bonanza играть бесплатно»: та же цель.",
          callout: "Фиксируйте спины до бонуса — так вы калибруете ожидания по частоте фичи.",
          bullets: [
            "Откройте /ru/big-bass-bonanza и нажмите «Запустить демо»",
            "Ставка в демо — учебная: держите один размер 40+ раундов подряд",
            "Регистрация и депозит для демо на 1weapp не нужны",
          ],
        },
        {
          heading: "Big Bass Bonanza: рыбак собирает стоимость рыб во фриспинах",
          body: "Big Bass Bonanza — классика Pragmatic: в базе спокойные линии, главный интерес — бесплатные спины, где рыбак собирает money-символы (рыб) с денежными значениями. Без рыбака рыбы часто «молчат».",
          body2: "Именно поэтому демо полезно: вы калибруете ожидания по темпу и частоте фич, а не ищете «сигнал», что игра «должна отдать». RNG не читает историю проигрышей.",
          bullets: [
            "Фокус механики: рыбак собирает стоимость рыб во фриспинах",
            "База учит темпу; бонус — зона всплесков",
            "Демо не предсказывает следующий бонус",
          ],
        },
        {
          heading: "Big Bass Bonanza: фичи и тактика в демо",
          body: "В демо дождитесь хотя бы одного бонуса и посмотрите, как суммируются рыбы при появлении рыбака. Это учит терпению к сухим сериям базы лучше любых «таблиц сигналов».",
          strategies: [
            {
              title: "Учебная сессия в демо (низкий риск обучения)",
              bullets: [
                "Фиксированная ставка 50–100 раундов без смены размера",
                "Записывайте: сколько раундов до первой фичи, длина сухих серий",
                "Не включайте buy bonus, пока не поняли базовый темп",
              ],
            },
            {
              title: "После 1–3 фич / бонусов",
              bullets: [
                "Сравните ощущение банка: база vs фича на той же ставке",
                "Решите, подходит ли вам волатильность формата",
                "Только потом думайте о лимитах на деньги — если вообще нужно",
              ],
            },
          ],
          callout: "Демо не предсказывает следующую фичу. Оно показывает волатильность на вашей длине сессии.",
        },
        {
          heading: "RTP и волатильность Big Bass Bonanza",
          body: "На карточке 1weapp для Big Bass Bonanza указан ориентир RTP 96.71%. Это долгий средний показатель, а не обещание часа игры. Высокая или средняя волатильность значит: сухие серии на короткой выборке — норма, не «поломка» демо.",
          bullets: [
            "RTP 96.71% — долгий ориентир, не гарантия сессии",
            "Короткая выборка всегда врёт сильнее длинной",
            "В демо проверьте, выдерживает ли ваш план ставки 80–150 раундов",
          ],
        },
        {
          heading: "Чеклист перед игрой на деньги",
          bullets: [
            "Поняли, как в Big Bass Bonanza устроены рыбак собирает стоимость рыб во фриспинах",
            "Увидели хотя бы одну характерную фичу в демо",
            "Задали лимит сессии и депозита заранее",
            "Играете только 18+, без догона после сухой серии",
          ],
          callout: "Сначала «big bass bonanza играть бесплатно» в демо — потом осознанный переход на деньги, если формат вам подходит.",
        },
      ],
      en: [
        {
          heading: "Big Bass Bonanza demo no registration — quick start",
          body: "People searching “big bass bonanza demo no registration” want the Pragmatic Play slot demo in the browser with virtual credits — no account wall. On 1weapp the Big Bass Bonanza card launches the free demo build. “big bass bonanza free play” is the same intent.",
          callout: "Log spins-to-bonus so you calibrate feature frequency expectations.",
          bullets: [
            "Open /en/big-bass-bonanza and tap Launch Demo",
            "Keep one stake size for 40+ rounds",
            "No signup required for the 1weapp demo",
          ],
        },
        {
          heading: "Big Bass Bonanza: fisherman collecting fish values in free spins",
          body: "Big Bass Bonanza is a Pragmatic classic: calmer line play in base, with the real hook in free spins where the fisherman collects money-symbol fish values. Without the fisherman, fish often do nothing.",
          body2: "Demo helps you calibrate pace and feature frequency — it does not prove the game “owes” a win after losses. RNG has no memory.",
          bullets: [
            "Mechanic focus: fisherman collecting fish values in free spins",
            "Base trains pace; features are spike zones",
            "Demo does not predict the next bonus",
          ],
        },
        {
          heading: "Big Bass Bonanza free play tips",
          body: "In demo, wait for at least one bonus and watch how fish values add when the fisherman lands. That teaches base-game patience better than any “signal” chart.",
          strategies: [
            {
              title: "Learning session (demo)",
              bullets: [
                "Fixed stake for 50–100 rounds",
                "Log rounds-to-feature and dry-streak length",
                "Skip bonus buy until base pace feels familiar",
              ],
            },
            {
              title: "After 1–3 features",
              bullets: [
                "Compare bankroll feel: base vs feature at the same stake",
                "Decide if the volatility profile fits you",
                "Only then set real-money limits — if you play cash at all",
              ],
            },
          ],
          callout: "Demo does not predict the next feature. It shows volatility on your session length.",
        },
        {
          heading: "RTP and volatility",
          body: "The 1weapp card lists Big Bass Bonanza RTP around 96.71%. That is a long-run average, not an hourly promise. Medium/high volatility means dry stretches on short samples are normal — not a “broken” demo.",
          bullets: [
            "RTP 96.71% is a long-horizon guide",
            "Short samples lie more than long ones",
            "In demo, check whether your stake plan survives 80–150 rounds",
          ],
        },
        {
          heading: "Checklist before real-money play",
          bullets: [
            "You understand fisherman collecting fish values in free spins in Big Bass Bonanza",
            "You have seen at least one signature feature in demo",
            "Session and deposit limits are set in advance",
            "18+ only — never chase a dry streak",
          ],
          callout: "Learn free in demo first. Move to real money only if the format fits your limits.",
        },
      ],
    },
  },
  {
    id: "the-dog-house-demo",
    gameSlug: "the-dog-house",
    avatar: "/avatars/the-dog-house.webp",
    intentBand: "mid",
    titleRu: "The Dog House демо без регистрации — липкие вайлды во фриспинах",
    titleEn: "The Dog House Demo No Registration — Sticky wilds in free spins",
    subtitleRu: "Как открыть The Dog House демо без регистрации, понять липкие вайлды во фриспинах и отработать бесплатно",
    subtitleEn: "Open The Dog House demo with no signup, learn sticky wilds in free spins, and practice for free",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    keywordsRu: [
      "the dog house демо без регистрации",
      "the dog house играть бесплатно",
      "the dog house демо без депозита",
      "the dog house как играть",
      "the dog house rtp волатильность",
    ],
    keywordsEn: [
      "the dog house demo no registration",
      "the dog house free play",
      "the dog house demo no deposit",
      "how to play the dog house demo",
      "the dog house rtp volatility",
    ],
    descriptionRu: "Практический разбор: The Dog House демо без регистрации, липкие вайлды во фриспинах, RTP 96.51%. Играть бесплатно на 1weapp, 18+.",
    descriptionEn: "Practical guide: The Dog House demo no registration, sticky wilds in free spins, RTP 96.51%. Play free on 1weapp, 18+.",
    titleSeoRu: "The Dog House демо без регистрации — гайд и бесплатная игра | 1weapp",
    titleSeoEn: "The Dog House Demo No Registration — Free Play Guide | 1weapp",
    descriptionSeoRu: "The Dog House демо без регистрации: липкие вайлды во фриспинах, RTP 96.51%. Играйте бесплатно в браузере на 1weapp.",
    descriptionSeoEn: "The Dog House demo no registration: sticky wilds in free spins, RTP 96.51%. Play the free demo in your browser on 1weapp.",
    sections: {
      ru: [
        {
          heading: "The Dog House демо без регистрации — с чего начать",
          body: "Запрос «the dog house демо без регистрации» обычно значит одно: открыть демо слота Pragmatic Play сразу в браузере, без аккаунта и депозита. На 1weapp карточка The Dog House запускает официальное демо с виртуальным балансом. Параллельный запрос — «the dog house играть бесплатно»: та же цель.",
          callout: "Сделайте учебную сессию без смены ставки — так проще сравнить базу и бонус.",
          bullets: [
            "Откройте /ru/the-dog-house и нажмите «Запустить демо»",
            "Ставка в демо — учебная: держите один размер 40+ раундов подряд",
            "Регистрация и депозит для демо на 1weapp не нужны",
          ],
        },
        {
          heading: "The Dog House: липкие вайлды во фриспинах",
          body: "The Dog House — слот Pragmatic про питомник: база про линии и вайлды, а характер слота раскрывается во фриспинах с липкими вайлдами, которые остаются на барабанах на несколько спинов.",
          body2: "Именно поэтому демо полезно: вы калибруете ожидания по темпу и частоте фич, а не ищете «сигнал», что игра «должна отдать». RNG не читает историю проигрышей.",
          bullets: [
            "Фокус механики: липкие вайлды во фриспинах",
            "База учит темпу; бонус — зона всплесков",
            "Демо не предсказывает следующий бонус",
          ],
        },
        {
          heading: "The Dog House: фичи и тактика в демо",
          body: "В демо отследите, куда «прилипают» вайлды и как меняется картина выплат на следующих фриспинах. Липкие позиции — ключ к пониманию, почему бонус ощущается иначе, чем база.",
          strategies: [
            {
              title: "Учебная сессия в демо (низкий риск обучения)",
              bullets: [
                "Фиксированная ставка 50–100 раундов без смены размера",
                "Записывайте: сколько раундов до первой фичи, длина сухих серий",
                "Не включайте buy bonus, пока не поняли базовый темп",
              ],
            },
            {
              title: "После 1–3 фич / бонусов",
              bullets: [
                "Сравните ощущение банка: база vs фича на той же ставке",
                "Решите, подходит ли вам волатильность формата",
                "Только потом думайте о лимитах на деньги — если вообще нужно",
              ],
            },
          ],
          callout: "Демо не предсказывает следующую фичу. Оно показывает волатильность на вашей длине сессии.",
        },
        {
          heading: "RTP и волатильность The Dog House",
          body: "На карточке 1weapp для The Dog House указан ориентир RTP 96.51%. Это долгий средний показатель, а не обещание часа игры. Высокая или средняя волатильность значит: сухие серии на короткой выборке — норма, не «поломка» демо.",
          bullets: [
            "RTP 96.51% — долгий ориентир, не гарантия сессии",
            "Короткая выборка всегда врёт сильнее длинной",
            "В демо проверьте, выдерживает ли ваш план ставки 80–150 раундов",
          ],
        },
        {
          heading: "Чеклист перед игрой на деньги",
          bullets: [
            "Поняли, как в The Dog House устроены липкие вайлды во фриспинах",
            "Увидели хотя бы одну характерную фичу в демо",
            "Задали лимит сессии и депозита заранее",
            "Играете только 18+, без догона после сухой серии",
          ],
          callout: "Сначала «the dog house играть бесплатно» в демо — потом осознанный переход на деньги, если формат вам подходит.",
        },
      ],
      en: [
        {
          heading: "The Dog House demo no registration — quick start",
          body: "People searching “the dog house demo no registration” want the Pragmatic Play slot demo in the browser with virtual credits — no account wall. On 1weapp the The Dog House card launches the free demo build. “the dog house free play” is the same intent.",
          callout: "Keep a fixed stake in the learning session so base vs bonus is easier to compare.",
          bullets: [
            "Open /en/the-dog-house and tap Launch Demo",
            "Keep one stake size for 40+ rounds",
            "No signup required for the 1weapp demo",
          ],
        },
        {
          heading: "The Dog House: sticky wilds in free spins",
          body: "The Dog House is a Pragmatic kennel slot: base play is lines and wilds, while the real character shows in free spins with sticky wilds that stay on the reels for several spins.",
          body2: "Demo helps you calibrate pace and feature frequency — it does not prove the game “owes” a win after losses. RNG has no memory.",
          bullets: [
            "Mechanic focus: sticky wilds in free spins",
            "Base trains pace; features are spike zones",
            "Demo does not predict the next bonus",
          ],
        },
        {
          heading: "The Dog House free play tips",
          body: "In demo, track where sticky wilds lock and how the pay picture changes on the next free spins. Sticky positions explain why the bonus feels different from base.",
          strategies: [
            {
              title: "Learning session (demo)",
              bullets: [
                "Fixed stake for 50–100 rounds",
                "Log rounds-to-feature and dry-streak length",
                "Skip bonus buy until base pace feels familiar",
              ],
            },
            {
              title: "After 1–3 features",
              bullets: [
                "Compare bankroll feel: base vs feature at the same stake",
                "Decide if the volatility profile fits you",
                "Only then set real-money limits — if you play cash at all",
              ],
            },
          ],
          callout: "Demo does not predict the next feature. It shows volatility on your session length.",
        },
        {
          heading: "RTP and volatility",
          body: "The 1weapp card lists The Dog House RTP around 96.51%. That is a long-run average, not an hourly promise. Medium/high volatility means dry stretches on short samples are normal — not a “broken” demo.",
          bullets: [
            "RTP 96.51% is a long-horizon guide",
            "Short samples lie more than long ones",
            "In demo, check whether your stake plan survives 80–150 rounds",
          ],
        },
        {
          heading: "Checklist before real-money play",
          bullets: [
            "You understand sticky wilds in free spins in The Dog House",
            "You have seen at least one signature feature in demo",
            "Session and deposit limits are set in advance",
            "18+ only — never chase a dry streak",
          ],
          callout: "Learn free in demo first. Move to real money only if the format fits your limits.",
        },
      ],
    },
  },
  {
    id: "wolf-gold-demo",
    gameSlug: "wolf-gold",
    avatar: "/avatars/wolf-gold.webp",
    intentBand: "low-mid",
    titleRu: "Wolf Gold демо без регистрации — money respin и jackpot-моменты",
    titleEn: "Wolf Gold Demo No Registration — Money respin and jackpot-style moments",
    subtitleRu: "Как открыть Wolf Gold демо без регистрации, понять money respin и jackpot-моменты и отработать бесплатно",
    subtitleEn: "Open Wolf Gold demo with no signup, learn money respin and jackpot-style moments, and practice for free",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    keywordsRu: [
      "wolf gold демо без регистрации",
      "wolf gold играть бесплатно",
      "wolf gold демо без депозита",
      "wolf gold как играть",
      "wolf gold rtp волатильность",
    ],
    keywordsEn: [
      "wolf gold demo no registration",
      "wolf gold free play",
      "wolf gold demo no deposit",
      "how to play wolf gold demo",
      "wolf gold rtp volatility",
    ],
    descriptionRu: "Практический разбор: Wolf Gold демо без регистрации, money respin и jackpot-моменты, RTP 96.01%. Играть бесплатно на 1weapp, 18+.",
    descriptionEn: "Practical guide: Wolf Gold demo no registration, money respin and jackpot-style moments, RTP 96.01%. Play free on 1weapp, 18+.",
    titleSeoRu: "Wolf Gold демо без регистрации — гайд и бесплатная игра | 1weapp",
    titleSeoEn: "Wolf Gold Demo No Registration — Free Play Guide | 1weapp",
    descriptionSeoRu: "Wolf Gold демо без регистрации: money respin и jackpot-моменты, RTP 96.01%. Играйте бесплатно в браузере на 1weapp.",
    descriptionSeoEn: "Wolf Gold demo no registration: money respin and jackpot-style moments, RTP 96.01%. Play the free demo in your browser on 1weapp.",
    sections: {
      ru: [
        {
          heading: "Wolf Gold демо без регистрации — с чего начать",
          body: "Запрос «wolf gold демо без регистрации» обычно значит одно: открыть демо слота Pragmatic Play сразу в браузере, без аккаунта и депозита. На 1weapp карточка Wolf Gold запускает официальное демо с виртуальным балансом. Параллельный запрос — «wolf gold играть бесплатно»: та же цель.",
          callout: "40–80 демо-спинов достаточно, чтобы понять, ваш ли это темп.",
          bullets: [
            "Откройте /ru/wolf-gold и нажмите «Запустить демо»",
            "Ставка в демо — учебная: держите один размер 40+ раундов подряд",
            "Регистрация и депозит для демо на 1weapp не нужны",
          ],
        },
        {
          heading: "Wolf Gold: money respin и jackpot-моменты",
          body: "Wolf Gold — пустынный слот Pragmatic с классическими линиями и особым money/respin-режимом, когда на барабанах собираются денежные символы. Темп спокойнее многих tumble-хитов, но всплески приходят пакетами.",
          body2: "Именно поэтому демо полезно: вы калибруете ожидания по темпу и частоте фич, а не ищете «сигнал», что игра «должна отдать». RNG не читает историю проигрышей.",
          bullets: [
            "Фокус механики: money respin и jackpot-моменты",
            "База учит темпу; бонус — зона всплесков",
            "Демо не предсказывает следующий бонус",
          ],
        },
        {
          heading: "Wolf Gold: фичи и тактика в демо",
          body: "В демо разберите, когда money-символы запускают спецрежим и как читается экран сбора. Не путайте учебный баланс с «прогревом» к депозиту.",
          strategies: [
            {
              title: "Учебная сессия в демо (низкий риск обучения)",
              bullets: [
                "Фиксированная ставка 50–100 раундов без смены размера",
                "Записывайте: сколько раундов до первой фичи, длина сухих серий",
                "Не включайте buy bonus, пока не поняли базовый темп",
              ],
            },
            {
              title: "После 1–3 фич / бонусов",
              bullets: [
                "Сравните ощущение банка: база vs фича на той же ставке",
                "Решите, подходит ли вам волатильность формата",
                "Только потом думайте о лимитах на деньги — если вообще нужно",
              ],
            },
          ],
          callout: "Демо не предсказывает следующую фичу. Оно показывает волатильность на вашей длине сессии.",
        },
        {
          heading: "RTP и волатильность Wolf Gold",
          body: "На карточке 1weapp для Wolf Gold указан ориентир RTP 96.01%. Это долгий средний показатель, а не обещание часа игры. Высокая или средняя волатильность значит: сухие серии на короткой выборке — норма, не «поломка» демо.",
          bullets: [
            "RTP 96.01% — долгий ориентир, не гарантия сессии",
            "Короткая выборка всегда врёт сильнее длинной",
            "В демо проверьте, выдерживает ли ваш план ставки 80–150 раундов",
          ],
        },
        {
          heading: "Чеклист перед игрой на деньги",
          bullets: [
            "Поняли, как в Wolf Gold устроены money respin и jackpot-моменты",
            "Увидели хотя бы одну характерную фичу в демо",
            "Задали лимит сессии и депозита заранее",
            "Играете только 18+, без догона после сухой серии",
          ],
          callout: "Сначала «wolf gold играть бесплатно» в демо — потом осознанный переход на деньги, если формат вам подходит.",
        },
      ],
      en: [
        {
          heading: "Wolf Gold demo no registration — quick start",
          body: "People searching “wolf gold demo no registration” want the Pragmatic Play slot demo in the browser with virtual credits — no account wall. On 1weapp the Wolf Gold card launches the free demo build. “wolf gold free play” is the same intent.",
          callout: "40–80 demo spins are enough to decide if the pace fits you.",
          bullets: [
            "Open /en/wolf-gold and tap Launch Demo",
            "Keep one stake size for 40+ rounds",
            "No signup required for the 1weapp demo",
          ],
        },
        {
          heading: "Wolf Gold: money respin and jackpot-style moments",
          body: "Wolf Gold is a Pragmatic desert slot with classic lines plus a money/respin-style collection when money symbols land. Pace is calmer than many tumble hits, with spikes arriving in bursts.",
          body2: "Demo helps you calibrate pace and feature frequency — it does not prove the game “owes” a win after losses. RNG has no memory.",
          bullets: [
            "Mechanic focus: money respin and jackpot-style moments",
            "Base trains pace; features are spike zones",
            "Demo does not predict the next bonus",
          ],
        },
        {
          heading: "Wolf Gold free play tips",
          body: "In demo, learn when money symbols start the special mode and how to read the collection screen. Do not confuse practice credits with a reason to deposit.",
          strategies: [
            {
              title: "Learning session (demo)",
              bullets: [
                "Fixed stake for 50–100 rounds",
                "Log rounds-to-feature and dry-streak length",
                "Skip bonus buy until base pace feels familiar",
              ],
            },
            {
              title: "After 1–3 features",
              bullets: [
                "Compare bankroll feel: base vs feature at the same stake",
                "Decide if the volatility profile fits you",
                "Only then set real-money limits — if you play cash at all",
              ],
            },
          ],
          callout: "Demo does not predict the next feature. It shows volatility on your session length.",
        },
        {
          heading: "RTP and volatility",
          body: "The 1weapp card lists Wolf Gold RTP around 96.01%. That is a long-run average, not an hourly promise. Medium/high volatility means dry stretches on short samples are normal — not a “broken” demo.",
          bullets: [
            "RTP 96.01% is a long-horizon guide",
            "Short samples lie more than long ones",
            "In demo, check whether your stake plan survives 80–150 rounds",
          ],
        },
        {
          heading: "Checklist before real-money play",
          bullets: [
            "You understand money respin and jackpot-style moments in Wolf Gold",
            "You have seen at least one signature feature in demo",
            "Session and deposit limits are set in advance",
            "18+ only — never chase a dry streak",
          ],
          callout: "Learn free in demo first. Move to real money only if the format fits your limits.",
        },
      ],
    },
  },
  {
    id: "floating-dragon-demo",
    gameSlug: "floating-dragon",
    avatar: "/avatars/floating-dragon.webp",
    intentBand: "low-mid",
    titleRu: "Floating Dragon демо без регистрации — hold-and-win и фичи дракона",
    titleEn: "Floating Dragon Demo No Registration — Hold-and-win style and dragon features",
    subtitleRu: "Как открыть Floating Dragon демо без регистрации, понять hold-and-win и фичи дракона и отработать бесплатно",
    subtitleEn: "Open Floating Dragon demo with no signup, learn hold-and-win style and dragon features, and practice for free",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    keywordsRu: [
      "floating dragon демо без регистрации",
      "floating dragon играть бесплатно",
      "floating dragon демо без депозита",
      "floating dragon как играть",
      "floating dragon rtp волатильность",
    ],
    keywordsEn: [
      "floating dragon demo no registration",
      "floating dragon free play",
      "floating dragon demo no deposit",
      "how to play floating dragon demo",
      "floating dragon rtp volatility",
    ],
    descriptionRu: "Практический разбор: Floating Dragon демо без регистрации, hold-and-win и фичи дракона, RTP 96.71%. Играть бесплатно на 1weapp, 18+.",
    descriptionEn: "Practical guide: Floating Dragon demo no registration, hold-and-win style and dragon features, RTP 96.71%. Play free on 1weapp, 18+.",
    titleSeoRu: "Floating Dragon демо без регистрации — гайд и бесплатная игра | 1weapp",
    titleSeoEn: "Floating Dragon Demo No Registration — Free Play Guide | 1weapp",
    descriptionSeoRu: "Floating Dragon демо без регистрации: hold-and-win и фичи дракона, RTP 96.71%. Играйте бесплатно в браузере на 1weapp.",
    descriptionSeoEn: "Floating Dragon demo no registration: hold-and-win style and dragon features, RTP 96.71%. Play the free demo in your browser on 1weapp.",
    sections: {
      ru: [
        {
          heading: "Floating Dragon демо без регистрации — с чего начать",
          body: "Запрос «floating dragon демо без регистрации» обычно значит одно: открыть демо слота Pragmatic Play сразу в браузере, без аккаунта и депозита. На 1weapp карточка Floating Dragon запускает официальное демо с виртуальным балансом. Параллельный запрос — «floating dragon играть бесплатно»: та же цель.",
          callout: "Не судите слот по 20 спинам — дождитесь хотя бы попытки входа в фичу.",
          bullets: [
            "Откройте /ru/floating-dragon и нажмите «Запустить демо»",
            "Ставка в демо — учебная: держите один размер 40+ раундов подряд",
            "Регистрация и депозит для демо на 1weapp не нужны",
          ],
        },
        {
          heading: "Floating Dragon: hold-and-win и фичи дракона",
          body: "Floating Dragon — азиатский слот Pragmatic в духе hold-and-win: lock-символы и сбор в отдельном режиме. База может казаться спокойной, пока не соберётся вход в фичу.",
          body2: "Именно поэтому демо полезно: вы калибруете ожидания по темпу и частоте фич, а не ищете «сигнал», что игра «должна отдать». RNG не читает историю проигрышей.",
          bullets: [
            "Фокус механики: hold-and-win и фичи дракона",
            "База учит темпу; бонус — зона всплесков",
            "Демо не предсказывает следующий бонус",
          ],
        },
        {
          heading: "Floating Dragon: фичи и тактика в демо",
          body: "В демо изучите, как lock-символы ведут к фиче и что происходит на экране сбора. Hold-and-win учит другому ритму, чем tumble-кластеры.",
          strategies: [
            {
              title: "Учебная сессия в демо (низкий риск обучения)",
              bullets: [
                "Фиксированная ставка 50–100 раундов без смены размера",
                "Записывайте: сколько раундов до первой фичи, длина сухих серий",
                "Не включайте buy bonus, пока не поняли базовый темп",
              ],
            },
            {
              title: "После 1–3 фич / бонусов",
              bullets: [
                "Сравните ощущение банка: база vs фича на той же ставке",
                "Решите, подходит ли вам волатильность формата",
                "Только потом думайте о лимитах на деньги — если вообще нужно",
              ],
            },
          ],
          callout: "Демо не предсказывает следующую фичу. Оно показывает волатильность на вашей длине сессии.",
        },
        {
          heading: "RTP и волатильность Floating Dragon",
          body: "На карточке 1weapp для Floating Dragon указан ориентир RTP 96.71%. Это долгий средний показатель, а не обещание часа игры. Высокая или средняя волатильность значит: сухие серии на короткой выборке — норма, не «поломка» демо.",
          bullets: [
            "RTP 96.71% — долгий ориентир, не гарантия сессии",
            "Короткая выборка всегда врёт сильнее длинной",
            "В демо проверьте, выдерживает ли ваш план ставки 80–150 раундов",
          ],
        },
        {
          heading: "Чеклист перед игрой на деньги",
          bullets: [
            "Поняли, как в Floating Dragon устроены hold-and-win и фичи дракона",
            "Увидели хотя бы одну характерную фичу в демо",
            "Задали лимит сессии и депозита заранее",
            "Играете только 18+, без догона после сухой серии",
          ],
          callout: "Сначала «floating dragon играть бесплатно» в демо — потом осознанный переход на деньги, если формат вам подходит.",
        },
      ],
      en: [
        {
          heading: "Floating Dragon demo no registration — quick start",
          body: "People searching “floating dragon demo no registration” want the Pragmatic Play slot demo in the browser with virtual credits — no account wall. On 1weapp the Floating Dragon card launches the free demo build. “floating dragon free play” is the same intent.",
          callout: "Do not judge the slot on 20 spins — wait for at least a feature-entry attempt.",
          bullets: [
            "Open /en/floating-dragon and tap Launch Demo",
            "Keep one stake size for 40+ rounds",
            "No signup required for the 1weapp demo",
          ],
        },
        {
          heading: "Floating Dragon: hold-and-win style and dragon features",
          body: "Floating Dragon is an Asian-themed Pragmatic slot with hold-and-win energy: lock symbols and collection in a feature round. Base play can feel quiet until the feature entry builds.",
          body2: "Demo helps you calibrate pace and feature frequency — it does not prove the game “owes” a win after losses. RNG has no memory.",
          bullets: [
            "Mechanic focus: hold-and-win style and dragon features",
            "Base trains pace; features are spike zones",
            "Demo does not predict the next bonus",
          ],
        },
        {
          heading: "Floating Dragon free play tips",
          body: "In demo, study how lock symbols lead into the feature and what the collection screen does. Hold-and-win teaches a different rhythm than tumble clusters.",
          strategies: [
            {
              title: "Learning session (demo)",
              bullets: [
                "Fixed stake for 50–100 rounds",
                "Log rounds-to-feature and dry-streak length",
                "Skip bonus buy until base pace feels familiar",
              ],
            },
            {
              title: "After 1–3 features",
              bullets: [
                "Compare bankroll feel: base vs feature at the same stake",
                "Decide if the volatility profile fits you",
                "Only then set real-money limits — if you play cash at all",
              ],
            },
          ],
          callout: "Demo does not predict the next feature. It shows volatility on your session length.",
        },
        {
          heading: "RTP and volatility",
          body: "The 1weapp card lists Floating Dragon RTP around 96.71%. That is a long-run average, not an hourly promise. Medium/high volatility means dry stretches on short samples are normal — not a “broken” demo.",
          bullets: [
            "RTP 96.71% is a long-horizon guide",
            "Short samples lie more than long ones",
            "In demo, check whether your stake plan survives 80–150 rounds",
          ],
        },
        {
          heading: "Checklist before real-money play",
          bullets: [
            "You understand hold-and-win style and dragon features in Floating Dragon",
            "You have seen at least one signature feature in demo",
            "Session and deposit limits are set in advance",
            "18+ only — never chase a dry streak",
          ],
          callout: "Learn free in demo first. Move to real money only if the format fits your limits.",
        },
      ],
    },
  },
  {
    id: "fruit-party-demo",
    gameSlug: "fruit-party",
    avatar: "/avatars/fruit-party.webp",
    intentBand: "mid",
    titleRu: "Fruit Party демо без регистрации — кластеры фруктов и случайные множители",
    titleEn: "Fruit Party Demo No Registration — Fruit clusters and random multipliers",
    subtitleRu: "Как открыть Fruit Party демо без регистрации, понять кластеры фруктов и случайные множители и отработать бесплатно",
    subtitleEn: "Open Fruit Party demo with no signup, learn fruit clusters and random multipliers, and practice for free",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    keywordsRu: [
      "fruit party демо без регистрации",
      "fruit party играть бесплатно",
      "fruit party демо без депозита",
      "fruit party как играть",
      "fruit party rtp волатильность",
    ],
    keywordsEn: [
      "fruit party demo no registration",
      "fruit party free play",
      "fruit party demo no deposit",
      "how to play fruit party demo",
      "fruit party rtp volatility",
    ],
    descriptionRu: "Практический разбор: Fruit Party демо без регистрации, кластеры фруктов и случайные множители, RTP 96.47%. Играть бесплатно на 1weapp, 18+.",
    descriptionEn: "Practical guide: Fruit Party demo no registration, fruit clusters and random multipliers, RTP 96.47%. Play free on 1weapp, 18+.",
    titleSeoRu: "Fruit Party демо без регистрации — гайд и бесплатная игра | 1weapp",
    titleSeoEn: "Fruit Party Demo No Registration — Free Play Guide | 1weapp",
    descriptionSeoRu: "Fruit Party демо без регистрации: кластеры фруктов и случайные множители, RTP 96.47%. Играйте бесплатно в браузере на 1weapp.",
    descriptionSeoEn: "Fruit Party demo no registration: fruit clusters and random multipliers, RTP 96.47%. Play the free demo in your browser on 1weapp.",
    sections: {
      ru: [
        {
          heading: "Fruit Party демо без регистрации — с чего начать",
          body: "Запрос «fruit party демо без регистрации» обычно значит одно: открыть демо слота Pragmatic Play сразу в браузере, без аккаунта и депозита. На 1weapp карточка Fruit Party запускает официальное демо с виртуальным балансом. Параллельный запрос — «fruit party играть бесплатно»: та же цель.",
          callout: "Зафиксируйте ставку и сделайте 80+ спинов — так видны и мелкие кластеры, и редкие всплески.",
          bullets: [
            "Откройте /ru/fruit-party и нажмите «Запустить демо»",
            "Ставка в демо — учебная: держите один размер 40+ раундов подряд",
            "Регистрация и депозит для демо на 1weapp не нужны",
          ],
        },
        {
          heading: "Fruit Party: кластеры фруктов и случайные множители",
          body: "Fruit Party — фруктовый cluster-слот Pragmatic: выплаты за группы одинаковых символов, каскады и случайные множители на выигрышных кластерах. Визуально простой, по дисперсии — заметно «живой».",
          body2: "Именно поэтому демо полезно: вы калибруете ожидания по темпу и частоте фич, а не ищете «сигнал», что игра «должна отдать». RNG не читает историю проигрышей.",
          bullets: [
            "Фокус механики: кластеры фруктов и случайные множители",
            "База учит темпу; бонус — зона всплесков",
            "Демо не предсказывает следующий бонус",
          ],
        },
        {
          heading: "Fruit Party: фичи и тактика в демо",
          body: "В демо смотрите, как часто множители падают на кластеры и насколько они меняют итог каскада. Бонус обычно усиливает ту же механику.",
          strategies: [
            {
              title: "Учебная сессия в демо (низкий риск обучения)",
              bullets: [
                "Фиксированная ставка 50–100 раундов без смены размера",
                "Записывайте: сколько раундов до первой фичи, длина сухих серий",
                "Не включайте buy bonus, пока не поняли базовый темп",
              ],
            },
            {
              title: "После 1–3 фич / бонусов",
              bullets: [
                "Сравните ощущение банка: база vs фича на той же ставке",
                "Решите, подходит ли вам волатильность формата",
                "Только потом думайте о лимитах на деньги — если вообще нужно",
              ],
            },
          ],
          callout: "Демо не предсказывает следующую фичу. Оно показывает волатильность на вашей длине сессии.",
        },
        {
          heading: "RTP и волатильность Fruit Party",
          body: "На карточке 1weapp для Fruit Party указан ориентир RTP 96.47%. Это долгий средний показатель, а не обещание часа игры. Высокая или средняя волатильность значит: сухие серии на короткой выборке — норма, не «поломка» демо.",
          bullets: [
            "RTP 96.47% — долгий ориентир, не гарантия сессии",
            "Короткая выборка всегда врёт сильнее длинной",
            "В демо проверьте, выдерживает ли ваш план ставки 80–150 раундов",
          ],
        },
        {
          heading: "Чеклист перед игрой на деньги",
          bullets: [
            "Поняли, как в Fruit Party устроены кластеры фруктов и случайные множители",
            "Увидели хотя бы одну характерную фичу в демо",
            "Задали лимит сессии и депозита заранее",
            "Играете только 18+, без догона после сухой серии",
          ],
          callout: "Сначала «fruit party играть бесплатно» в демо — потом осознанный переход на деньги, если формат вам подходит.",
        },
      ],
      en: [
        {
          heading: "Fruit Party demo no registration — quick start",
          body: "People searching “fruit party demo no registration” want the Pragmatic Play slot demo in the browser with virtual credits — no account wall. On 1weapp the Fruit Party card launches the free demo build. “fruit party free play” is the same intent.",
          callout: "Fix the stake and run 80+ spins — you will see both small clusters and rare spikes.",
          bullets: [
            "Open /en/fruit-party and tap Launch Demo",
            "Keep one stake size for 40+ rounds",
            "No signup required for the 1weapp demo",
          ],
        },
        {
          heading: "Fruit Party: fruit clusters and random multipliers",
          body: "Fruit Party is a Pragmatic fruit cluster slot: group pays, cascades, and random multipliers on winning clusters. Visually simple, with lively variance.",
          body2: "Demo helps you calibrate pace and feature frequency — it does not prove the game “owes” a win after losses. RNG has no memory.",
          bullets: [
            "Mechanic focus: fruit clusters and random multipliers",
            "Base trains pace; features are spike zones",
            "Demo does not predict the next bonus",
          ],
        },
        {
          heading: "Fruit Party free play tips",
          body: "In demo, watch how often multipliers land on clusters and how much they change the cascade result. The bonus usually amplifies the same mechanic.",
          strategies: [
            {
              title: "Learning session (demo)",
              bullets: [
                "Fixed stake for 50–100 rounds",
                "Log rounds-to-feature and dry-streak length",
                "Skip bonus buy until base pace feels familiar",
              ],
            },
            {
              title: "After 1–3 features",
              bullets: [
                "Compare bankroll feel: base vs feature at the same stake",
                "Decide if the volatility profile fits you",
                "Only then set real-money limits — if you play cash at all",
              ],
            },
          ],
          callout: "Demo does not predict the next feature. It shows volatility on your session length.",
        },
        {
          heading: "RTP and volatility",
          body: "The 1weapp card lists Fruit Party RTP around 96.47%. That is a long-run average, not an hourly promise. Medium/high volatility means dry stretches on short samples are normal — not a “broken” demo.",
          bullets: [
            "RTP 96.47% is a long-horizon guide",
            "Short samples lie more than long ones",
            "In demo, check whether your stake plan survives 80–150 rounds",
          ],
        },
        {
          heading: "Checklist before real-money play",
          bullets: [
            "You understand fruit clusters and random multipliers in Fruit Party",
            "You have seen at least one signature feature in demo",
            "Session and deposit limits are set in advance",
            "18+ only — never chase a dry streak",
          ],
          callout: "Learn free in demo first. Move to real money only if the format fits your limits.",
        },
      ],
    },
  },
  {
    id: "zeus-vs-hades-gods-of-war-demo",
    gameSlug: "zeus-vs-hades-gods-of-war",
    avatar: "/avatars/zeus-vs-hades-gods-of-war.webp",
    intentBand: "mid",
    titleRu: "Zeus vs Hades: Gods of War демо без регистрации — режимы Зевс/Аид и бонусные раунды",
    titleEn: "Zeus vs Hades: Gods of War Demo No Registration — Zeus/Hades modes and bonus rounds",
    subtitleRu: "Как открыть Zeus vs Hades: Gods of War демо без регистрации, понять режимы Зевс/Аид и бонусные раунды и отработать бесплатно",
    subtitleEn: "Open Zeus vs Hades: Gods of War demo with no signup, learn Zeus/Hades modes and bonus rounds, and practice for free",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    keywordsRu: [
      "zeus vs hades: gods of war демо без регистрации",
      "zeus vs hades: gods of war играть бесплатно",
      "zeus vs hades: gods of war демо без депозита",
      "zeus vs hades: gods of war как играть",
      "zeus vs hades: gods of war rtp волатильность",
    ],
    keywordsEn: [
      "zeus vs hades: gods of war demo no registration",
      "zeus vs hades: gods of war free play",
      "zeus vs hades: gods of war demo no deposit",
      "how to play zeus vs hades: gods of war demo",
      "zeus vs hades: gods of war rtp volatility",
    ],
    descriptionRu: "Практический разбор: Zeus vs Hades: Gods of War демо без регистрации, режимы Зевс/Аид и бонусные раунды, RTP 96.05%. Играть бесплатно на 1weapp, 18+.",
    descriptionEn: "Practical guide: Zeus vs Hades: Gods of War demo no registration, Zeus/Hades modes and bonus rounds, RTP 96.05%. Play free on 1weapp, 18+.",
    titleSeoRu: "Zeus vs Hades: Gods of War демо без регистрации — гайд и бесплатная игра | 1weapp",
    titleSeoEn: "Zeus vs Hades: Gods of War Demo No Registration — Free Play Guide | 1weapp",
    descriptionSeoRu: "Zeus vs Hades: Gods of War демо без регистрации: режимы Зевс/Аид и бонусные раунды, RTP 96.05%. Играйте бесплатно в браузере на 1weapp.",
    descriptionSeoEn: "Zeus vs Hades: Gods of War demo no registration: Zeus/Hades modes and bonus rounds, RTP 96.05%. Play the free demo in your browser on 1weapp.",
    sections: {
      ru: [
        {
          heading: "Zeus vs Hades: Gods of War демо без регистрации — с чего начать",
          body: "Запрос «zeus vs hades: gods of war демо без регистрации» обычно значит одно: открыть демо слота Pragmatic Play сразу в браузере, без аккаунта и депозита. На 1weapp карточка Zeus vs Hades: Gods of War запускает официальное демо с виртуальным балансом. Параллельный запрос — «zeus vs hades: gods of war играть бесплатно»: та же цель.",
          callout: "Потратьте по 40–50 спинов на каждый режим, прежде чем выбирать любимый.",
          bullets: [
            "Откройте /ru/zeus-vs-hades-gods-of-war и нажмите «Запустить демо»",
            "Ставка в демо — учебная: держите один размер 40+ раундов подряд",
            "Регистрация и депозит для демо на 1weapp не нужны",
          ],
        },
        {
          heading: "Zeus vs Hades: Gods of War: режимы Зевс/Аид и бонусные раунды",
          body: "Zeus vs Hades: Gods of War — dual-mode слот Pragmatic: ощущение игры меняется в зависимости от «стороны» богов. Это не просто смена скина — бонусные правила и тон сессии отличаются.",
          body2: "Именно поэтому демо полезно: вы калибруете ожидания по темпу и частоте фич, а не ищете «сигнал», что игра «должна отдать». RNG не читает историю проигрышей.",
          bullets: [
            "Фокус механики: режимы Зевс/Аид и бонусные раунды",
            "База учит темпу; бонус — зона всплесков",
            "Демо не предсказывает следующий бонус",
          ],
        },
        {
          heading: "Zeus vs Hades: Gods of War: фичи и тактика в демо",
          body: "В демо сравните оба режима: темп базы, вход в бонус и то, как читаются множители. Dual-mode легко перегрузить новичка — free play снимает давление «угадать правильную сторону».",
          strategies: [
            {
              title: "Учебная сессия в демо (низкий риск обучения)",
              bullets: [
                "Фиксированная ставка 50–100 раундов без смены размера",
                "Записывайте: сколько раундов до первой фичи, длина сухих серий",
                "Не включайте buy bonus, пока не поняли базовый темп",
              ],
            },
            {
              title: "После 1–3 фич / бонусов",
              bullets: [
                "Сравните ощущение банка: база vs фича на той же ставке",
                "Решите, подходит ли вам волатильность формата",
                "Только потом думайте о лимитах на деньги — если вообще нужно",
              ],
            },
          ],
          callout: "Демо не предсказывает следующую фичу. Оно показывает волатильность на вашей длине сессии.",
        },
        {
          heading: "RTP и волатильность Zeus vs Hades: Gods of War",
          body: "На карточке 1weapp для Zeus vs Hades: Gods of War указан ориентир RTP 96.05%. Это долгий средний показатель, а не обещание часа игры. Высокая или средняя волатильность значит: сухие серии на короткой выборке — норма, не «поломка» демо.",
          bullets: [
            "RTP 96.05% — долгий ориентир, не гарантия сессии",
            "Короткая выборка всегда врёт сильнее длинной",
            "В демо проверьте, выдерживает ли ваш план ставки 80–150 раундов",
          ],
        },
        {
          heading: "Чеклист перед игрой на деньги",
          bullets: [
            "Поняли, как в Zeus vs Hades: Gods of War устроены режимы Зевс/Аид и бонусные раунды",
            "Увидели хотя бы одну характерную фичу в демо",
            "Задали лимит сессии и депозита заранее",
            "Играете только 18+, без догона после сухой серии",
          ],
          callout: "Сначала «zeus vs hades: gods of war играть бесплатно» в демо — потом осознанный переход на деньги, если формат вам подходит.",
        },
      ],
      en: [
        {
          heading: "Zeus vs Hades: Gods of War demo no registration — quick start",
          body: "People searching “zeus vs hades: gods of war demo no registration” want the Pragmatic Play slot demo in the browser with virtual credits — no account wall. On 1weapp the Zeus vs Hades: Gods of War card launches the free demo build. “zeus vs hades: gods of war free play” is the same intent.",
          callout: "Spend 40–50 spins in each mode before picking a favourite.",
          bullets: [
            "Open /en/zeus-vs-hades-gods-of-war and tap Launch Demo",
            "Keep one stake size for 40+ rounds",
            "No signup required for the 1weapp demo",
          ],
        },
        {
          heading: "Zeus vs Hades: Gods of War: Zeus/Hades modes and bonus rounds",
          body: "Zeus vs Hades: Gods of War is a Pragmatic dual-mode slot: the feel changes with each god side. It is not only a skin swap — bonus rules and session tone differ.",
          body2: "Demo helps you calibrate pace and feature frequency — it does not prove the game “owes” a win after losses. RNG has no memory.",
          bullets: [
            "Mechanic focus: Zeus/Hades modes and bonus rounds",
            "Base trains pace; features are spike zones",
            "Demo does not predict the next bonus",
          ],
        },
        {
          heading: "Zeus vs Hades: Gods of War free play tips",
          body: "In demo, compare both modes: base pace, bonus entry, and how multipliers read. Dual-mode can overwhelm newcomers — free play removes pressure to “pick the right side” with cash.",
          strategies: [
            {
              title: "Learning session (demo)",
              bullets: [
                "Fixed stake for 50–100 rounds",
                "Log rounds-to-feature and dry-streak length",
                "Skip bonus buy until base pace feels familiar",
              ],
            },
            {
              title: "After 1–3 features",
              bullets: [
                "Compare bankroll feel: base vs feature at the same stake",
                "Decide if the volatility profile fits you",
                "Only then set real-money limits — if you play cash at all",
              ],
            },
          ],
          callout: "Demo does not predict the next feature. It shows volatility on your session length.",
        },
        {
          heading: "RTP and volatility",
          body: "The 1weapp card lists Zeus vs Hades: Gods of War RTP around 96.05%. That is a long-run average, not an hourly promise. Medium/high volatility means dry stretches on short samples are normal — not a “broken” demo.",
          bullets: [
            "RTP 96.05% is a long-horizon guide",
            "Short samples lie more than long ones",
            "In demo, check whether your stake plan survives 80–150 rounds",
          ],
        },
        {
          heading: "Checklist before real-money play",
          bullets: [
            "You understand Zeus/Hades modes and bonus rounds in Zeus vs Hades: Gods of War",
            "You have seen at least one signature feature in demo",
            "Session and deposit limits are set in advance",
            "18+ only — never chase a dry streak",
          ],
          callout: "Learn free in demo first. Move to real money only if the format fits your limits.",
        },
      ],
    },
  },
  {
    id: "buffalo-king-megaways-demo",
    gameSlug: "buffalo-king-megaways",
    avatar: "/avatars/buffalo-king-megaways.webp",
    intentBand: "low-mid",
    titleRu: "Buffalo King Megaways демо без регистрации — переменные ways Megaways и фриспины",
    titleEn: "Buffalo King Megaways Demo No Registration — Variable Megaways ways and free spins",
    subtitleRu: "Как открыть Buffalo King Megaways демо без регистрации, понять переменные ways Megaways и фриспины и отработать бесплатно",
    subtitleEn: "Open Buffalo King Megaways demo with no signup, learn variable Megaways ways and free spins, and practice for free",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    keywordsRu: [
      "buffalo king megaways демо без регистрации",
      "buffalo king megaways играть бесплатно",
      "buffalo king megaways демо без депозита",
      "buffalo king megaways как играть",
      "buffalo king megaways rtp волатильность",
    ],
    keywordsEn: [
      "buffalo king megaways demo no registration",
      "buffalo king megaways free play",
      "buffalo king megaways demo no deposit",
      "how to play buffalo king megaways demo",
      "buffalo king megaways rtp volatility",
    ],
    descriptionRu: "Практический разбор: Buffalo King Megaways демо без регистрации, переменные ways Megaways и фриспины, RTP 96.52%. Играть бесплатно на 1weapp, 18+.",
    descriptionEn: "Practical guide: Buffalo King Megaways demo no registration, variable Megaways ways and free spins, RTP 96.52%. Play free on 1weapp, 18+.",
    titleSeoRu: "Buffalo King Megaways демо без регистрации — гайд и бесплатная игра | 1weapp",
    titleSeoEn: "Buffalo King Megaways Demo No Registration — Free Play Guide | 1weapp",
    descriptionSeoRu: "Buffalo King Megaways демо без регистрации: переменные ways Megaways и фриспины, RTP 96.52%. Играйте бесплатно в браузере на 1weapp.",
    descriptionSeoEn: "Buffalo King Megaways demo no registration: variable Megaways ways and free spins, RTP 96.52%. Play the free demo in your browser on 1weapp.",
    sections: {
      ru: [
        {
          heading: "Buffalo King Megaways демо без регистрации — с чего начать",
          body: "Запрос «buffalo king megaways демо без регистрации» обычно значит одно: открыть демо слота Pragmatic Play сразу в браузере, без аккаунта и депозита. На 1weapp карточка Buffalo King Megaways запускает официальное демо с виртуальным балансом. Параллельный запрос — «buffalo king megaways играть бесплатно»: та же цель.",
          callout: "Начните с минимальной демо-ставки, пока не привыкните читать ways на экране.",
          bullets: [
            "Откройте /ru/buffalo-king-megaways и нажмите «Запустить демо»",
            "Ставка в демо — учебная: держите один размер 40+ раундов подряд",
            "Регистрация и депозит для демо на 1weapp не нужны",
          ],
        },
        {
          heading: "Buffalo King Megaways: переменные ways Megaways и фриспины",
          body: "Buffalo King Megaways — Megaways-слот Pragmatic: число ways меняется от спина к спину за счёт разной высоты барабанов. Бизонья тема, акцент на ways-to-win и бонусных множителях.",
          body2: "Именно поэтому демо полезно: вы калибруете ожидания по темпу и частоте фич, а не ищете «сигнал», что игра «должна отдать». RNG не читает историю проигрышей.",
          bullets: [
            "Фокус механики: переменные ways Megaways и фриспины",
            "База учит темпу; бонус — зона всплесков",
            "Демо не предсказывает следующий бонус",
          ],
        },
        {
          heading: "Buffalo King Megaways: фичи и тактика в демо",
          body: "В демо наблюдайте, как высота барабанов меняет ways, и сравните ощущение базы с фриспинами. Megaways визуально «шумный» — free play помогает не торопиться со ставкой.",
          strategies: [
            {
              title: "Учебная сессия в демо (низкий риск обучения)",
              bullets: [
                "Фиксированная ставка 50–100 раундов без смены размера",
                "Записывайте: сколько раундов до первой фичи, длина сухих серий",
                "Не включайте buy bonus, пока не поняли базовый темп",
              ],
            },
            {
              title: "После 1–3 фич / бонусов",
              bullets: [
                "Сравните ощущение банка: база vs фича на той же ставке",
                "Решите, подходит ли вам волатильность формата",
                "Только потом думайте о лимитах на деньги — если вообще нужно",
              ],
            },
          ],
          callout: "Демо не предсказывает следующую фичу. Оно показывает волатильность на вашей длине сессии.",
        },
        {
          heading: "RTP и волатильность Buffalo King Megaways",
          body: "На карточке 1weapp для Buffalo King Megaways указан ориентир RTP 96.52%. Это долгий средний показатель, а не обещание часа игры. Высокая или средняя волатильность значит: сухие серии на короткой выборке — норма, не «поломка» демо.",
          bullets: [
            "RTP 96.52% — долгий ориентир, не гарантия сессии",
            "Короткая выборка всегда врёт сильнее длинной",
            "В демо проверьте, выдерживает ли ваш план ставки 80–150 раундов",
          ],
        },
        {
          heading: "Чеклист перед игрой на деньги",
          bullets: [
            "Поняли, как в Buffalo King Megaways устроены переменные ways Megaways и фриспины",
            "Увидели хотя бы одну характерную фичу в демо",
            "Задали лимит сессии и депозита заранее",
            "Играете только 18+, без догона после сухой серии",
          ],
          callout: "Сначала «buffalo king megaways играть бесплатно» в демо — потом осознанный переход на деньги, если формат вам подходит.",
        },
      ],
      en: [
        {
          heading: "Buffalo King Megaways demo no registration — quick start",
          body: "People searching “buffalo king megaways demo no registration” want the Pragmatic Play slot demo in the browser with virtual credits — no account wall. On 1weapp the Buffalo King Megaways card launches the free demo build. “buffalo king megaways free play” is the same intent.",
          callout: "Start at the lowest demo stake until you can read ways on screen comfortably.",
          bullets: [
            "Open /en/buffalo-king-megaways and tap Launch Demo",
            "Keep one stake size for 40+ rounds",
            "No signup required for the 1weapp demo",
          ],
        },
        {
          heading: "Buffalo King Megaways: variable Megaways ways and free spins",
          body: "Buffalo King Megaways is a Pragmatic Megaways slot: ways change spin to spin with reel height. Buffalo theme, focus on ways-to-win and bonus multipliers.",
          body2: "Demo helps you calibrate pace and feature frequency — it does not prove the game “owes” a win after losses. RNG has no memory.",
          bullets: [
            "Mechanic focus: variable Megaways ways and free spins",
            "Base trains pace; features are spike zones",
            "Demo does not predict the next bonus",
          ],
        },
        {
          heading: "Buffalo King Megaways free play tips",
          body: "In demo, watch how reel height changes ways and compare base feel to free spins. Megaways looks busy — free play helps you avoid rushing the stake.",
          strategies: [
            {
              title: "Learning session (demo)",
              bullets: [
                "Fixed stake for 50–100 rounds",
                "Log rounds-to-feature and dry-streak length",
                "Skip bonus buy until base pace feels familiar",
              ],
            },
            {
              title: "After 1–3 features",
              bullets: [
                "Compare bankroll feel: base vs feature at the same stake",
                "Decide if the volatility profile fits you",
                "Only then set real-money limits — if you play cash at all",
              ],
            },
          ],
          callout: "Demo does not predict the next feature. It shows volatility on your session length.",
        },
        {
          heading: "RTP and volatility",
          body: "The 1weapp card lists Buffalo King Megaways RTP around 96.52%. That is a long-run average, not an hourly promise. Medium/high volatility means dry stretches on short samples are normal — not a “broken” demo.",
          bullets: [
            "RTP 96.52% is a long-horizon guide",
            "Short samples lie more than long ones",
            "In demo, check whether your stake plan survives 80–150 rounds",
          ],
        },
        {
          heading: "Checklist before real-money play",
          bullets: [
            "You understand variable Megaways ways and free spins in Buffalo King Megaways",
            "You have seen at least one signature feature in demo",
            "Session and deposit limits are set in advance",
            "18+ only — never chase a dry streak",
          ],
          callout: "Learn free in demo first. Move to real money only if the format fits your limits.",
        },
      ],
    },
  },
  {
    id: "madame-destiny-megaways-demo",
    gameSlug: "madame-destiny-megaways",
    avatar: "/avatars/madame-destiny-megaways.webp",
    intentBand: "low-mid",
    titleRu: "Madame Destiny Megaways демо без регистрации — Megaways и фриспины гадалки",
    titleEn: "Madame Destiny Megaways Demo No Registration — Megaways and Destiny free spins",
    subtitleRu: "Как открыть Madame Destiny Megaways демо без регистрации, понять Megaways и фриспины гадалки и отработать бесплатно",
    subtitleEn: "Open Madame Destiny Megaways demo with no signup, learn Megaways and Destiny free spins, and practice for free",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    keywordsRu: [
      "madame destiny megaways демо без регистрации",
      "madame destiny megaways играть бесплатно",
      "madame destiny megaways демо без депозита",
      "madame destiny megaways как играть",
      "madame destiny megaways rtp волатильность",
    ],
    keywordsEn: [
      "madame destiny megaways demo no registration",
      "madame destiny megaways free play",
      "madame destiny megaways demo no deposit",
      "how to play madame destiny megaways demo",
      "madame destiny megaways rtp volatility",
    ],
    descriptionRu: "Практический разбор: Madame Destiny Megaways демо без регистрации, Megaways и фриспины гадалки, RTP 96.56%. Играть бесплатно на 1weapp, 18+.",
    descriptionEn: "Practical guide: Madame Destiny Megaways demo no registration, Megaways and Destiny free spins, RTP 96.56%. Play free on 1weapp, 18+.",
    titleSeoRu: "Madame Destiny Megaways демо без регистрации — гайд и бесплатная игра | 1weapp",
    titleSeoEn: "Madame Destiny Megaways Demo No Registration — Free Play Guide | 1weapp",
    descriptionSeoRu: "Madame Destiny Megaways демо без регистрации: Megaways и фриспины гадалки, RTP 96.56%. Играйте бесплатно в браузере на 1weapp.",
    descriptionSeoEn: "Madame Destiny Megaways demo no registration: Megaways and Destiny free spins, RTP 96.56%. Play the free demo in your browser on 1weapp.",
    sections: {
      ru: [
        {
          heading: "Madame Destiny Megaways демо без регистрации — с чего начать",
          body: "Запрос «madame destiny megaways демо без регистрации» обычно значит одно: открыть демо слота Pragmatic Play сразу в браузере, без аккаунта и депозита. На 1weapp карточка Madame Destiny Megaways запускает официальное демо с виртуальным балансом. Параллельный запрос — «madame destiny megaways играть бесплатно»: та же цель.",
          callout: "50–90 демо-спинов достаточно, чтобы понять, ваш ли это визуальный и темповый профиль.",
          bullets: [
            "Откройте /ru/madame-destiny-megaways и нажмите «Запустить демо»",
            "Ставка в демо — учебная: держите один размер 40+ раундов подряд",
            "Регистрация и депозит для демо на 1weapp не нужны",
          ],
        },
        {
          heading: "Madame Destiny Megaways: Megaways и фриспины гадалки",
          body: "Madame Destiny Megaways — таро/гадание в формате Megaways от Pragmatic: переменные ways, атмосфера карт и бонусный раунд с характером «судьбы». Темп ближе к ways-слотам, чем к tumble-кластерам.",
          body2: "Именно поэтому демо полезно: вы калибруете ожидания по темпу и частоте фич, а не ищете «сигнал», что игра «должна отдать». RNG не читает историю проигрышей.",
          bullets: [
            "Фокус механики: Megaways и фриспины гадалки",
            "База учит темпу; бонус — зона всплесков",
            "Демо не предсказывает следующий бонус",
          ],
        },
        {
          heading: "Madame Destiny Megaways: фичи и тактика в демо",
          body: "В демо разберите вход в бонус и как показываются множители/особенности раунда. Не путайте «тематическую удачу» карт с математикой RNG.",
          strategies: [
            {
              title: "Учебная сессия в демо (низкий риск обучения)",
              bullets: [
                "Фиксированная ставка 50–100 раундов без смены размера",
                "Записывайте: сколько раундов до первой фичи, длина сухих серий",
                "Не включайте buy bonus, пока не поняли базовый темп",
              ],
            },
            {
              title: "После 1–3 фич / бонусов",
              bullets: [
                "Сравните ощущение банка: база vs фича на той же ставке",
                "Решите, подходит ли вам волатильность формата",
                "Только потом думайте о лимитах на деньги — если вообще нужно",
              ],
            },
          ],
          callout: "Демо не предсказывает следующую фичу. Оно показывает волатильность на вашей длине сессии.",
        },
        {
          heading: "RTP и волатильность Madame Destiny Megaways",
          body: "На карточке 1weapp для Madame Destiny Megaways указан ориентир RTP 96.56%. Это долгий средний показатель, а не обещание часа игры. Высокая или средняя волатильность значит: сухие серии на короткой выборке — норма, не «поломка» демо.",
          bullets: [
            "RTP 96.56% — долгий ориентир, не гарантия сессии",
            "Короткая выборка всегда врёт сильнее длинной",
            "В демо проверьте, выдерживает ли ваш план ставки 80–150 раундов",
          ],
        },
        {
          heading: "Чеклист перед игрой на деньги",
          bullets: [
            "Поняли, как в Madame Destiny Megaways устроены Megaways и фриспины гадалки",
            "Увидели хотя бы одну характерную фичу в демо",
            "Задали лимит сессии и депозита заранее",
            "Играете только 18+, без догона после сухой серии",
          ],
          callout: "Сначала «madame destiny megaways играть бесплатно» в демо — потом осознанный переход на деньги, если формат вам подходит.",
        },
      ],
      en: [
        {
          heading: "Madame Destiny Megaways demo no registration — quick start",
          body: "People searching “madame destiny megaways demo no registration” want the Pragmatic Play slot demo in the browser with virtual credits — no account wall. On 1weapp the Madame Destiny Megaways card launches the free demo build. “madame destiny megaways free play” is the same intent.",
          callout: "50–90 demo spins are enough to know if the look and pace fit you.",
          bullets: [
            "Open /en/madame-destiny-megaways and tap Launch Demo",
            "Keep one stake size for 40+ rounds",
            "No signup required for the 1weapp demo",
          ],
        },
        {
          heading: "Madame Destiny Megaways: Megaways and Destiny free spins",
          body: "Madame Destiny Megaways is Pragmatic tarot/fortune energy in Megaways form: variable ways, card atmosphere, and a destiny-flavoured bonus. Pace sits closer to ways slots than tumble clusters.",
          body2: "Demo helps you calibrate pace and feature frequency — it does not prove the game “owes” a win after losses. RNG has no memory.",
          bullets: [
            "Mechanic focus: Megaways and Destiny free spins",
            "Base trains pace; features are spike zones",
            "Demo does not predict the next bonus",
          ],
        },
        {
          heading: "Madame Destiny Megaways free play tips",
          body: "In demo, learn bonus entry and how multipliers/features present in the round. Do not confuse tarot theme “luck” with RNG math.",
          strategies: [
            {
              title: "Learning session (demo)",
              bullets: [
                "Fixed stake for 50–100 rounds",
                "Log rounds-to-feature and dry-streak length",
                "Skip bonus buy until base pace feels familiar",
              ],
            },
            {
              title: "After 1–3 features",
              bullets: [
                "Compare bankroll feel: base vs feature at the same stake",
                "Decide if the volatility profile fits you",
                "Only then set real-money limits — if you play cash at all",
              ],
            },
          ],
          callout: "Demo does not predict the next feature. It shows volatility on your session length.",
        },
        {
          heading: "RTP and volatility",
          body: "The 1weapp card lists Madame Destiny Megaways RTP around 96.56%. That is a long-run average, not an hourly promise. Medium/high volatility means dry stretches on short samples are normal — not a “broken” demo.",
          bullets: [
            "RTP 96.56% is a long-horizon guide",
            "Short samples lie more than long ones",
            "In demo, check whether your stake plan survives 80–150 rounds",
          ],
        },
        {
          heading: "Checklist before real-money play",
          bullets: [
            "You understand Megaways and Destiny free spins in Madame Destiny Megaways",
            "You have seen at least one signature feature in demo",
            "Session and deposit limits are set in advance",
            "18+ only — never chase a dry streak",
          ],
          callout: "Learn free in demo first. Move to real money only if the format fits your limits.",
        },
      ],
    },
  },
  {
    id: "mustang-gold-demo",
    gameSlug: "mustang-gold",
    avatar: "/avatars/mustang-gold.webp",
    intentBand: "mid",
    titleRu: "Mustang Gold демо без регистрации — money respin и сбор jackpot-символов",
    titleEn: "Mustang Gold Demo No Registration — Money respin and jackpot-symbol collection",
    subtitleRu: "Как открыть Mustang Gold демо без регистрации, понять money respin и сбор jackpot-символов и отработать бесплатно",
    subtitleEn: "Open Mustang Gold demo with no signup, learn money respin and jackpot-symbol collection, and practice for free",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    keywordsRu: [
      "mustang gold демо без регистрации",
      "mustang gold играть бесплатно",
      "mustang gold демо без депозита",
      "mustang gold как играть",
      "mustang gold rtp волатильность",
    ],
    keywordsEn: [
      "mustang gold demo no registration",
      "mustang gold free play",
      "mustang gold demo no deposit",
      "how to play mustang gold demo",
      "mustang gold rtp volatility",
    ],
    descriptionRu: "Практический разбор: Mustang Gold демо без регистрации, money respin и сбор jackpot-символов, RTP 96.53%. Играть бесплатно на 1weapp, 18+.",
    descriptionEn: "Practical guide: Mustang Gold demo no registration, money respin and jackpot-symbol collection, RTP 96.53%. Play free on 1weapp, 18+.",
    titleSeoRu: "Mustang Gold демо без регистрации — гайд и бесплатная игра | 1weapp",
    titleSeoEn: "Mustang Gold Demo No Registration — Free Play Guide | 1weapp",
    descriptionSeoRu: "Mustang Gold демо без регистрации: money respin и сбор jackpot-символов, RTP 96.53%. Играйте бесплатно в браузере на 1weapp.",
    descriptionSeoEn: "Mustang Gold demo no registration: money respin and jackpot-symbol collection, RTP 96.53%. Play the free demo in your browser on 1weapp.",
    sections: {
      ru: [
        {
          heading: "Mustang Gold демо без регистрации — с чего начать",
          body: "Запрос «mustang gold демо без регистрации» обычно значит одно: открыть демо слота Pragmatic Play сразу в браузере, без аккаунта и депозита. На 1weapp карточка Mustang Gold запускает официальное демо с виртуальным балансом. Параллельный запрос — «mustang gold играть бесплатно»: та же цель.",
          callout: "Не повышайте ставку сразу после «почти» в money-режиме — догон здесь классика.",
          bullets: [
            "Откройте /ru/mustang-gold и нажмите «Запустить демо»",
            "Ставка в демо — учебная: держите один размер 40+ раундов подряд",
            "Регистрация и депозит для демо на 1weapp не нужны",
          ],
        },
        {
          heading: "Mustang Gold: money respin и сбор jackpot-символов",
          body: "Mustang Gold — вестерн Pragmatic с money-respin: денежные символы и сбор в спецрежиме, плюс потенциал крупных фиксированных призов. База проще tumble-хитов, всплески — в money-экранах.",
          body2: "Именно поэтому демо полезно: вы калибруете ожидания по темпу и частоте фич, а не ищете «сигнал», что игра «должна отдать». RNG не читает историю проигрышей.",
          bullets: [
            "Фокус механики: money respin и сбор jackpot-символов",
            "База учит темпу; бонус — зона всплесков",
            "Демо не предсказывает следующий бонус",
          ],
        },
        {
          heading: "Mustang Gold: фичи и тактика в демо",
          body: "В демо научитесь быстро читать money-экран, пока он на поле. Это снижает импульс «дожать» ставку после почти собранного экрана.",
          strategies: [
            {
              title: "Учебная сессия в демо (низкий риск обучения)",
              bullets: [
                "Фиксированная ставка 50–100 раундов без смены размера",
                "Записывайте: сколько раундов до первой фичи, длина сухих серий",
                "Не включайте buy bonus, пока не поняли базовый темп",
              ],
            },
            {
              title: "После 1–3 фич / бонусов",
              bullets: [
                "Сравните ощущение банка: база vs фича на той же ставке",
                "Решите, подходит ли вам волатильность формата",
                "Только потом думайте о лимитах на деньги — если вообще нужно",
              ],
            },
          ],
          callout: "Демо не предсказывает следующую фичу. Оно показывает волатильность на вашей длине сессии.",
        },
        {
          heading: "RTP и волатильность Mustang Gold",
          body: "На карточке 1weapp для Mustang Gold указан ориентир RTP 96.53%. Это долгий средний показатель, а не обещание часа игры. Высокая или средняя волатильность значит: сухие серии на короткой выборке — норма, не «поломка» демо.",
          bullets: [
            "RTP 96.53% — долгий ориентир, не гарантия сессии",
            "Короткая выборка всегда врёт сильнее длинной",
            "В демо проверьте, выдерживает ли ваш план ставки 80–150 раундов",
          ],
        },
        {
          heading: "Чеклист перед игрой на деньги",
          bullets: [
            "Поняли, как в Mustang Gold устроены money respin и сбор jackpot-символов",
            "Увидели хотя бы одну характерную фичу в демо",
            "Задали лимит сессии и депозита заранее",
            "Играете только 18+, без догона после сухой серии",
          ],
          callout: "Сначала «mustang gold играть бесплатно» в демо — потом осознанный переход на деньги, если формат вам подходит.",
        },
      ],
      en: [
        {
          heading: "Mustang Gold demo no registration — quick start",
          body: "People searching “mustang gold demo no registration” want the Pragmatic Play slot demo in the browser with virtual credits — no account wall. On 1weapp the Mustang Gold card launches the free demo build. “mustang gold free play” is the same intent.",
          callout: "Do not raise stake right after a near-miss in money mode — classic chase trigger.",
          bullets: [
            "Open /en/mustang-gold and tap Launch Demo",
            "Keep one stake size for 40+ rounds",
            "No signup required for the 1weapp demo",
          ],
        },
        {
          heading: "Mustang Gold: money respin and jackpot-symbol collection",
          body: "Mustang Gold is a Pragmatic western with money-respin energy: money symbols and collection in a special mode, plus fixed prize potential. Base is simpler than tumble hits; spikes live in money screens.",
          body2: "Demo helps you calibrate pace and feature frequency — it does not prove the game “owes” a win after losses. RNG has no memory.",
          bullets: [
            "Mechanic focus: money respin and jackpot-symbol collection",
            "Base trains pace; features are spike zones",
            "Demo does not predict the next bonus",
          ],
        },
        {
          heading: "Mustang Gold free play tips",
          body: "In demo, practice reading the money screen while it is on the reels. That reduces the urge to bump stakes after a near-complete collection.",
          strategies: [
            {
              title: "Learning session (demo)",
              bullets: [
                "Fixed stake for 50–100 rounds",
                "Log rounds-to-feature and dry-streak length",
                "Skip bonus buy until base pace feels familiar",
              ],
            },
            {
              title: "After 1–3 features",
              bullets: [
                "Compare bankroll feel: base vs feature at the same stake",
                "Decide if the volatility profile fits you",
                "Only then set real-money limits — if you play cash at all",
              ],
            },
          ],
          callout: "Demo does not predict the next feature. It shows volatility on your session length.",
        },
        {
          heading: "RTP and volatility",
          body: "The 1weapp card lists Mustang Gold RTP around 96.53%. That is a long-run average, not an hourly promise. Medium/high volatility means dry stretches on short samples are normal — not a “broken” demo.",
          bullets: [
            "RTP 96.53% is a long-horizon guide",
            "Short samples lie more than long ones",
            "In demo, check whether your stake plan survives 80–150 rounds",
          ],
        },
        {
          heading: "Checklist before real-money play",
          bullets: [
            "You understand money respin and jackpot-symbol collection in Mustang Gold",
            "You have seen at least one signature feature in demo",
            "Session and deposit limits are set in advance",
            "18+ only — never chase a dry streak",
          ],
          callout: "Learn free in demo first. Move to real money only if the format fits your limits.",
        },
      ],
    },
  },
  {
    id: "wild-west-gold-demo",
    gameSlug: "wild-west-gold",
    avatar: "/avatars/wild-west-gold.webp",
    intentBand: "mid",
    titleRu: "Wild West Gold демо без регистрации — липкие вайлды с множителями во фриспинах",
    titleEn: "Wild West Gold Demo No Registration — Sticky wild multipliers in free spins",
    subtitleRu: "Как открыть Wild West Gold демо без регистрации, понять липкие вайлды с множителями во фриспинах и отработать бесплатно",
    subtitleEn: "Open Wild West Gold demo with no signup, learn sticky wild multipliers in free spins, and practice for free",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    keywordsRu: [
      "wild west gold демо без регистрации",
      "wild west gold играть бесплатно",
      "wild west gold демо без депозита",
      "wild west gold как играть",
      "wild west gold rtp волатильность",
    ],
    keywordsEn: [
      "wild west gold demo no registration",
      "wild west gold free play",
      "wild west gold demo no deposit",
      "how to play wild west gold demo",
      "wild west gold rtp volatility",
    ],
    descriptionRu: "Практический разбор: Wild West Gold демо без регистрации, липкие вайлды с множителями во фриспинах, RTP 96.51%. Играть бесплатно на 1weapp, 18+.",
    descriptionEn: "Practical guide: Wild West Gold demo no registration, sticky wild multipliers in free spins, RTP 96.51%. Play free on 1weapp, 18+.",
    titleSeoRu: "Wild West Gold демо без регистрации — гайд и бесплатная игра | 1weapp",
    titleSeoEn: "Wild West Gold Demo No Registration — Free Play Guide | 1weapp",
    descriptionSeoRu: "Wild West Gold демо без регистрации: липкие вайлды с множителями во фриспинах, RTP 96.51%. Играйте бесплатно в браузере на 1weapp.",
    descriptionSeoEn: "Wild West Gold demo no registration: sticky wild multipliers in free spins, RTP 96.51%. Play the free demo in your browser on 1weapp.",
    sections: {
      ru: [
        {
          heading: "Wild West Gold демо без регистрации — с чего начать",
          body: "Запрос «wild west gold демо без регистрации» обычно значит одно: открыть демо слота Pragmatic Play сразу в браузере, без аккаунта и депозита. На 1weapp карточка Wild West Gold запускает официальное демо с виртуальным балансом. Параллельный запрос — «wild west gold играть бесплатно»: та же цель.",
          callout: "Дождитесь одного полного бонуса в демо, прежде чем решать про лимиты на деньги.",
          bullets: [
            "Откройте /ru/wild-west-gold и нажмите «Запустить демо»",
            "Ставка в демо — учебная: держите один размер 40+ раундов подряд",
            "Регистрация и депозит для демо на 1weapp не нужны",
          ],
        },
        {
          heading: "Wild West Gold: липкие вайлды с множителями во фриспинах",
          body: "Wild West Gold — вестерн Pragmatic, где характер слота раскрывается во фриспинах: липкие вайлды с множителями остаются на барабанах и усиливают последующие спины бонуса.",
          body2: "Именно поэтому демо полезно: вы калибруете ожидания по темпу и частоте фич, а не ищете «сигнал», что игра «должна отдать». RNG не читает историю проигрышей.",
          bullets: [
            "Фокус механики: липкие вайлды с множителями во фриспинах",
            "База учит темпу; бонус — зона всплесков",
            "Демо не предсказывает следующий бонус",
          ],
        },
        {
          heading: "Wild West Gold: фичи и тактика в демо",
          body: "В демо отслеживайте позиции липких вайлдов на протяжении фриспинов — от этого зависит ощущение «разгона» бонуса. База нужна, чтобы понять цену ожидания фичи.",
          strategies: [
            {
              title: "Учебная сессия в демо (низкий риск обучения)",
              bullets: [
                "Фиксированная ставка 50–100 раундов без смены размера",
                "Записывайте: сколько раундов до первой фичи, длина сухих серий",
                "Не включайте buy bonus, пока не поняли базовый темп",
              ],
            },
            {
              title: "После 1–3 фич / бонусов",
              bullets: [
                "Сравните ощущение банка: база vs фича на той же ставке",
                "Решите, подходит ли вам волатильность формата",
                "Только потом думайте о лимитах на деньги — если вообще нужно",
              ],
            },
          ],
          callout: "Демо не предсказывает следующую фичу. Оно показывает волатильность на вашей длине сессии.",
        },
        {
          heading: "RTP и волатильность Wild West Gold",
          body: "На карточке 1weapp для Wild West Gold указан ориентир RTP 96.51%. Это долгий средний показатель, а не обещание часа игры. Высокая или средняя волатильность значит: сухие серии на короткой выборке — норма, не «поломка» демо.",
          bullets: [
            "RTP 96.51% — долгий ориентир, не гарантия сессии",
            "Короткая выборка всегда врёт сильнее длинной",
            "В демо проверьте, выдерживает ли ваш план ставки 80–150 раундов",
          ],
        },
        {
          heading: "Чеклист перед игрой на деньги",
          bullets: [
            "Поняли, как в Wild West Gold устроены липкие вайлды с множителями во фриспинах",
            "Увидели хотя бы одну характерную фичу в демо",
            "Задали лимит сессии и депозита заранее",
            "Играете только 18+, без догона после сухой серии",
          ],
          callout: "Сначала «wild west gold играть бесплатно» в демо — потом осознанный переход на деньги, если формат вам подходит.",
        },
      ],
      en: [
        {
          heading: "Wild West Gold demo no registration — quick start",
          body: "People searching “wild west gold demo no registration” want the Pragmatic Play slot demo in the browser with virtual credits — no account wall. On 1weapp the Wild West Gold card launches the free demo build. “wild west gold free play” is the same intent.",
          callout: "See one full bonus in demo before setting any real-money limits plan.",
          bullets: [
            "Open /en/wild-west-gold and tap Launch Demo",
            "Keep one stake size for 40+ rounds",
            "No signup required for the 1weapp demo",
          ],
        },
        {
          heading: "Wild West Gold: sticky wild multipliers in free spins",
          body: "Wild West Gold is a Pragmatic western whose character shows in free spins: sticky wilds with multipliers stay on the reels and boost later bonus spins.",
          body2: "Demo helps you calibrate pace and feature frequency — it does not prove the game “owes” a win after losses. RNG has no memory.",
          bullets: [
            "Mechanic focus: sticky wild multipliers in free spins",
            "Base trains pace; features are spike zones",
            "Demo does not predict the next bonus",
          ],
        },
        {
          heading: "Wild West Gold free play tips",
          body: "In demo, track sticky wild positions across free spins — that drives the bonus “ramp” feel. Base play teaches the cost of waiting for the feature.",
          strategies: [
            {
              title: "Learning session (demo)",
              bullets: [
                "Fixed stake for 50–100 rounds",
                "Log rounds-to-feature and dry-streak length",
                "Skip bonus buy until base pace feels familiar",
              ],
            },
            {
              title: "After 1–3 features",
              bullets: [
                "Compare bankroll feel: base vs feature at the same stake",
                "Decide if the volatility profile fits you",
                "Only then set real-money limits — if you play cash at all",
              ],
            },
          ],
          callout: "Demo does not predict the next feature. It shows volatility on your session length.",
        },
        {
          heading: "RTP and volatility",
          body: "The 1weapp card lists Wild West Gold RTP around 96.51%. That is a long-run average, not an hourly promise. Medium/high volatility means dry stretches on short samples are normal — not a “broken” demo.",
          bullets: [
            "RTP 96.51% is a long-horizon guide",
            "Short samples lie more than long ones",
            "In demo, check whether your stake plan survives 80–150 rounds",
          ],
        },
        {
          heading: "Checklist before real-money play",
          bullets: [
            "You understand sticky wild multipliers in free spins in Wild West Gold",
            "You have seen at least one signature feature in demo",
            "Session and deposit limits are set in advance",
            "18+ only — never chase a dry streak",
          ],
          callout: "Learn free in demo first. Move to real money only if the format fits your limits.",
        },
      ],
    },
  },
]

export function getGameGuide(id: string): GameGuide | undefined {
  return GAME_GUIDES.find((g) => g.id === id)
}

export function getGameGuideByGameSlug(gameSlug: string): GameGuide | undefined {
  return GAME_GUIDES.find((g) => g.gameSlug === gameSlug)
}
