/** @deprecated Game guides migrated to lib/reviews-data.ts (/reviews). */
/**
 * Generate SEO game guides for all Popular (FEATURED) titles.
 * Output matches lib/game-guides-data.ts GameGuide shape (+ avatar).
 * Run: node scripts/generate-popular-game-guides.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const FEATURED = [
  "lucky-jet",
  "gates-of-olympus",
  "sweet-bonanza",
  "rocket-queen",
  "sugar-rush",
  "starlight-princess",
  "big-bass-bonanza",
  "the-dog-house",
  "wolf-gold",
  "floating-dragon",
  "fruit-party",
  "zeus-vs-hades-gods-of-war",
  "buffalo-king-megaways",
  "madame-destiny-megaways",
  "mustang-gold",
  "wild-west-gold",
];

/** Per-game SEO + mechanic copy (EN/RU). */
const EXTRA = {
  "lucky-jet": {
    intentBand: "mid",
    tagRu: "Crash · 1weapp",
    tagEn: "Crash · 1weapp",
    focusRu: "кэшаут до улёта джета",
    focusEn: "cash-out before the jet flies away",
    mechRu:
      "Lucky Jet — crash-игра: множитель растёт, пока джет в воздухе. Ваша задача — забрать ставку до краша. В демо баланс виртуальный, поэтому можно спокойно сравнить ранний выход и погоню за высоким x.",
    mechEn:
      "Lucky Jet is a crash title: the multiplier climbs while the jet is airborne. Cash out before it crashes. Demo uses virtual credits so you can compare early exits vs chasing a high x.",
    featureRu:
      "В демо отработайте три сценария: авто-кэшаут на 1.5x–2x, ручной выход «на глаз» и осознанный риск выше 5x на малой доле банкролла. Смотрите длину «сухих» полётов — crash не обязан «отдать» после серии ранних крашей.",
    featureEn:
      "In demo, practice three plans: auto cash-out at 1.5x–2x, manual gut-feel exits, and rare high-x attempts on a small bankroll slice. Note dry flight stretches — crash RNG does not “owe” a big multiplier after early busts.",
    tipRu: "Сначала 40–60 демо-раундов с одной целью кэшаута — так виден темп, а не эмоция.",
    tipEn: "Run 40–60 demo rounds with one cash-out target so you learn pace, not impulse.",
  },
  "gates-of-olympus": {
    intentBand: "mid",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    focusRu: "tumble и множители Зевса",
    focusEn: "tumbles and Zeus multipliers",
    mechRu:
      "Gates of Olympus — слот Pragmatic Play на сетке 6×5 Pay Anywhere: 8+ одинаковых символов в любом месте дают выплату, затем каскад (tumble). Зевс может бросать сферы-множители от 2x до 500x на текущий каскад. В базе множители не копятся между спинами.",
    mechEn:
      "Gates of Olympus is a Pragmatic Play 6×5 Pay Anywhere slot: 8+ matching symbols anywhere pay, then tumble. Zeus can throw multiplier orbs from 2x to 500x on the current cascade. Base-game multipliers do not carry between spins.",
    featureRu:
      "Во фриспинах множители часто складываются в Total Multiplier и не сбрасываются между фриспинами — профиль сессии резко меняется. Демо идеально, чтобы увидеть 1–2 бонуса без депозита и сравнить «тихую» базу с всплесками бонуса.",
    featureEn:
      "In free spins, multipliers often stack into a Total Multiplier that persists inside the feature — session feel changes a lot. Demo is ideal to see 1–2 bonuses with no deposit and compare quiet base play to bonus spikes.",
    tipRu: "Сначала 80–120 спинов на фиксированной ставке — так вы увидите сухие серии до любого депозита.",
    tipEn: "Run 80–120 fixed-stake demo spins first so you feel dry stretches before any deposit.",
  },
  "sweet-bonanza": {
    intentBand: "mid",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    focusRu: "кластеры конфет и множители во фриспинах",
    focusEn: "candy clusters and free-spins multipliers",
    mechRu:
      "Sweet Bonanza — флагманский candy-слот Pragmatic с выплатами за кластеры (scatter pays), а не за линии. Выигрышные символы исчезают, сверху падают новые. Темп сессии задают каскады и редкие входы в бонус.",
    mechEn:
      "Sweet Bonanza is Pragmatic’s flagship candy slot with cluster (scatter pays) wins instead of paylines. Winning symbols tumble away for new drops. Cascades and rare bonus entries set the session pace.",
    featureRu:
      "В бесплатных спинах на поле могут появляться множители, которые усиливают кластерные выплаты. В демо посчитайте, как часто выходит бонус на вашей длине сессии — не ищите «сигнал», что слот «должен» отдать.",
    featureEn:
      "Free spins can drop multipliers that boost cluster wins. In demo, track how often the bonus appears on your session length — do not treat dry stretches as a signal the slot “owes” a feature.",
    tipRu: "Держите одну ставку 60–100 спинов и запишите число бонусов — так видна волатильность.",
    tipEn: "Keep one stake for 60–100 spins and log bonus count — that shows volatility better than one lucky hit.",
  },
  "rocket-queen": {
    intentBand: "mid",
    tagRu: "Crash · 1weapp",
    tagEn: "Crash · 1weapp",
    focusRu: "рост множителя и авто/ручной кэшаут",
    focusEn: "rising multiplier and auto/manual cash-out",
    mechRu:
      "Rocket Queen — crash-демо с ракетной темой: множитель растёт, пока ракета в полёте. Вы забираете виртуальный выигрыш кэшаутом или теряете раунд при краше. Правила те же, что в режиме на деньги, баланс — учебный.",
    mechEn:
      "Rocket Queen is a rocket-themed crash demo: the multiplier climbs while the rocket flies. Cash out for a virtual win or lose the round on a crash. Same rules as cash mode; balance is for practice only.",
    featureRu:
      "Сравните авто-кэшаут на фиксированной цели с ручным выходом. Crash-игры быстро «съедают» дисциплину — демо как раз место, где можно ошибиться без депозита.",
    featureEn:
      "Compare fixed auto cash-out targets with manual exits. Crash titles burn discipline fast — demo is where mistakes should stay free.",
    tipRu: "Не повышайте цель после серии ранних крашей — это классический догон.",
    tipEn: "Do not raise your cash-out target after a streak of early crashes — that is classic chase behaviour.",
  },
  "sugar-rush": {
    intentBand: "mid",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    focusRu: "кластеры и множители на клетках сетки",
    focusEn: "clusters and sticky grid multipliers",
    mechRu:
      "Sugar Rush — конфетный слот Pragmatic с кластерными выплатами на сетке. Особые клетки могут получать множители, которые усиливают последующие выигрыши на этих позициях — отсюда «липкое» ощущение поля.",
    mechEn:
      "Sugar Rush is a Pragmatic candy slot with cluster pays on a grid. Special cells can gain multipliers that boost later wins on those spots — that sticky-grid feel is the core hook.",
    featureRu:
      "В демо следите, какие клетки «загораются» множителями после каскадов и как это меняет размер следующих кластеров. Бонусный режим обычно усиливает ту же идею.",
    featureEn:
      "In demo, watch which cells light up with multipliers after cascades and how that changes the next cluster size. The bonus usually amplifies the same idea.",
    tipRu: "Сделайте 70–100 демо-спинов на одной ставке, прежде чем судить о «везении» сетки.",
    tipEn: "Run 70–100 fixed-stake demo spins before judging whether the grid “feels hot”.",
  },
  "starlight-princess": {
    intentBand: "mid",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    focusRu: "tumble и множители принцессы",
    focusEn: "tumbles and princess multipliers",
    mechRu:
      "Starlight Princess — аниме-слот Pragmatic в духе tumble/pay-anywhere: выплаты за группу символов, каскады и символы-множители. По ощущению близка к Gates of Olympus, но со своей темой и темпом анимаций.",
    mechEn:
      "Starlight Princess is a Pragmatic anime tumble/pay-anywhere style slot: group pays, cascades, and multiplier symbols. It feels related to Gates of Olympus, with its own theme and animation pace.",
    featureRu:
      "Во фриспинах множители часто работают агрессивнее, чем в базе. В демо сравните «тихие» серии базы с ощущением банка после бонуса — без депозита это безопасный стресс-тест волатильности.",
    featureEn:
      "Free spins often make multipliers more aggressive than base play. In demo, compare quiet base stretches with bankroll feel after a bonus — a safe volatility stress test with no deposit.",
    tipRu: "Не покупайте бонус в демо, пока не поняли базовый темп tumble.",
    tipEn: "Skip bonus buy in demo until base tumble pace feels familiar.",
  },
  "big-bass-bonanza": {
    intentBand: "mid",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    focusRu: "рыбак собирает стоимость рыб во фриспинах",
    focusEn: "fisherman collecting fish values in free spins",
    mechRu:
      "Big Bass Bonanza — классика Pragmatic: в базе спокойные линии, главный интерес — бесплатные спины, где рыбак собирает money-символы (рыб) с денежными значениями. Без рыбака рыбы часто «молчат».",
    mechEn:
      "Big Bass Bonanza is a Pragmatic classic: calmer line play in base, with the real hook in free spins where the fisherman collects money-symbol fish values. Without the fisherman, fish often do nothing.",
    featureRu:
      "В демо дождитесь хотя бы одного бонуса и посмотрите, как суммируются рыбы при появлении рыбака. Это учит терпению к сухим сериям базы лучше любых «таблиц сигналов».",
    featureEn:
      "In demo, wait for at least one bonus and watch how fish values add when the fisherman lands. That teaches base-game patience better than any “signal” chart.",
    tipRu: "Фиксируйте спины до бонуса — так вы калибруете ожидания по частоте фичи.",
    tipEn: "Log spins-to-bonus so you calibrate feature frequency expectations.",
  },
  "the-dog-house": {
    intentBand: "mid",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    focusRu: "липкие вайлды во фриспинах",
    focusEn: "sticky wilds in free spins",
    mechRu:
      "The Dog House — слот Pragmatic про питомник: база про линии и вайлды, а характер слота раскрывается во фриспинах с липкими вайлдами, которые остаются на барабанах на несколько спинов.",
    mechEn:
      "The Dog House is a Pragmatic kennel slot: base play is lines and wilds, while the real character shows in free spins with sticky wilds that stay on the reels for several spins.",
    featureRu:
      "В демо отследите, куда «прилипают» вайлды и как меняется картина выплат на следующих фриспинах. Липкие позиции — ключ к пониманию, почему бонус ощущается иначе, чем база.",
    featureEn:
      "In demo, track where sticky wilds lock and how the pay picture changes on the next free spins. Sticky positions explain why the bonus feels different from base.",
    tipRu: "Сделайте учебную сессию без смены ставки — так проще сравнить базу и бонус.",
    tipEn: "Keep a fixed stake in the learning session so base vs bonus is easier to compare.",
  },
  "wolf-gold": {
    intentBand: "low-mid",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    focusRu: "money respin и jackpot-моменты",
    focusEn: "money respin and jackpot-style moments",
    mechRu:
      "Wolf Gold — пустынный слот Pragmatic с классическими линиями и особым money/respin-режимом, когда на барабанах собираются денежные символы. Темп спокойнее многих tumble-хитов, но всплески приходят пакетами.",
    mechEn:
      "Wolf Gold is a Pragmatic desert slot with classic lines plus a money/respin-style collection when money symbols land. Pace is calmer than many tumble hits, with spikes arriving in bursts.",
    featureRu:
      "В демо разберите, когда money-символы запускают спецрежим и как читается экран сбора. Не путайте учебный баланс с «прогревом» к депозиту.",
    featureEn:
      "In demo, learn when money symbols start the special mode and how to read the collection screen. Do not confuse practice credits with a reason to deposit.",
    tipRu: "40–80 демо-спинов достаточно, чтобы понять, ваш ли это темп.",
    tipEn: "40–80 demo spins are enough to decide if the pace fits you.",
  },
  "floating-dragon": {
    intentBand: "low-mid",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    focusRu: "hold-and-win и фичи дракона",
    focusEn: "hold-and-win style and dragon features",
    mechRu:
      "Floating Dragon — азиатский слот Pragmatic в духе hold-and-win: lock-символы и сбор в отдельном режиме. База может казаться спокойной, пока не соберётся вход в фичу.",
    mechEn:
      "Floating Dragon is an Asian-themed Pragmatic slot with hold-and-win energy: lock symbols and collection in a feature round. Base play can feel quiet until the feature entry builds.",
    featureRu:
      "В демо изучите, как lock-символы ведут к фиче и что происходит на экране сбора. Hold-and-win учит другому ритму, чем tumble-кластеры.",
    featureEn:
      "In demo, study how lock symbols lead into the feature and what the collection screen does. Hold-and-win teaches a different rhythm than tumble clusters.",
    tipRu: "Не судите слот по 20 спинам — дождитесь хотя бы попытки входа в фичу.",
    tipEn: "Do not judge the slot on 20 spins — wait for at least a feature-entry attempt.",
  },
  "fruit-party": {
    intentBand: "mid",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    focusRu: "кластеры фруктов и случайные множители",
    focusEn: "fruit clusters and random multipliers",
    mechRu:
      "Fruit Party — фруктовый cluster-слот Pragmatic: выплаты за группы одинаковых символов, каскады и случайные множители на выигрышных кластерах. Визуально простой, по дисперсии — заметно «живой».",
    mechEn:
      "Fruit Party is a Pragmatic fruit cluster slot: group pays, cascades, and random multipliers on winning clusters. Visually simple, with lively variance.",
    featureRu:
      "В демо смотрите, как часто множители падают на кластеры и насколько они меняют итог каскада. Бонус обычно усиливает ту же механику.",
    featureEn:
      "In demo, watch how often multipliers land on clusters and how much they change the cascade result. The bonus usually amplifies the same mechanic.",
    tipRu: "Зафиксируйте ставку и сделайте 80+ спинов — так видны и мелкие кластеры, и редкие всплески.",
    tipEn: "Fix the stake and run 80+ spins — you will see both small clusters and rare spikes.",
  },
  "zeus-vs-hades-gods-of-war": {
    intentBand: "mid",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    focusRu: "режимы Зевс/Аид и бонусные раунды",
    focusEn: "Zeus/Hades modes and bonus rounds",
    mechRu:
      "Zeus vs Hades: Gods of War — dual-mode слот Pragmatic: ощущение игры меняется в зависимости от «стороны» богов. Это не просто смена скина — бонусные правила и тон сессии отличаются.",
    mechEn:
      "Zeus vs Hades: Gods of War is a Pragmatic dual-mode slot: the feel changes with each god side. It is not only a skin swap — bonus rules and session tone differ.",
    featureRu:
      "В демо сравните оба режима: темп базы, вход в бонус и то, как читаются множители. Dual-mode легко перегрузить новичка — free play снимает давление «угадать правильную сторону».",
    featureEn:
      "In demo, compare both modes: base pace, bonus entry, and how multipliers read. Dual-mode can overwhelm newcomers — free play removes pressure to “pick the right side” with cash.",
    tipRu: "Потратьте по 40–50 спинов на каждый режим, прежде чем выбирать любимый.",
    tipEn: "Spend 40–50 spins in each mode before picking a favourite.",
  },
  "buffalo-king-megaways": {
    intentBand: "low-mid",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    focusRu: "переменные ways Megaways и фриспины",
    focusEn: "variable Megaways ways and free spins",
    mechRu:
      "Buffalo King Megaways — Megaways-слот Pragmatic: число ways меняется от спина к спину за счёт разной высоты барабанов. Бизонья тема, акцент на ways-to-win и бонусных множителях.",
    mechEn:
      "Buffalo King Megaways is a Pragmatic Megaways slot: ways change spin to spin with reel height. Buffalo theme, focus on ways-to-win and bonus multipliers.",
    featureRu:
      "В демо наблюдайте, как высота барабанов меняет ways, и сравните ощущение базы с фриспинами. Megaways визуально «шумный» — free play помогает не торопиться со ставкой.",
    featureEn:
      "In demo, watch how reel height changes ways and compare base feel to free spins. Megaways looks busy — free play helps you avoid rushing the stake.",
    tipRu: "Начните с минимальной демо-ставки, пока не привыкните читать ways на экране.",
    tipEn: "Start at the lowest demo stake until you can read ways on screen comfortably.",
  },
  "madame-destiny-megaways": {
    intentBand: "low-mid",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    focusRu: "Megaways и фриспины гадалки",
    focusEn: "Megaways and Destiny free spins",
    mechRu:
      "Madame Destiny Megaways — таро/гадание в формате Megaways от Pragmatic: переменные ways, атмосфера карт и бонусный раунд с характером «судьбы». Темп ближе к ways-слотам, чем к tumble-кластерам.",
    mechEn:
      "Madame Destiny Megaways is Pragmatic tarot/fortune energy in Megaways form: variable ways, card atmosphere, and a destiny-flavoured bonus. Pace sits closer to ways slots than tumble clusters.",
    featureRu:
      "В демо разберите вход в бонус и как показываются множители/особенности раунда. Не путайте «тематическую удачу» карт с математикой RNG.",
    featureEn:
      "In demo, learn bonus entry and how multipliers/features present in the round. Do not confuse tarot theme “luck” with RNG math.",
    tipRu: "50–90 демо-спинов достаточно, чтобы понять, ваш ли это визуальный и темповый профиль.",
    tipEn: "50–90 demo spins are enough to know if the look and pace fit you.",
  },
  "mustang-gold": {
    intentBand: "mid",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    focusRu: "money respin и сбор jackpot-символов",
    focusEn: "money respin and jackpot-symbol collection",
    mechRu:
      "Mustang Gold — вестерн Pragmatic с money-respin: денежные символы и сбор в спецрежиме, плюс потенциал крупных фиксированных призов. База проще tumble-хитов, всплески — в money-экранах.",
    mechEn:
      "Mustang Gold is a Pragmatic western with money-respin energy: money symbols and collection in a special mode, plus fixed prize potential. Base is simpler than tumble hits; spikes live in money screens.",
    featureRu:
      "В демо научитесь быстро читать money-экран, пока он на поле. Это снижает импульс «дожать» ставку после почти собранного экрана.",
    featureEn:
      "In demo, practice reading the money screen while it is on the reels. That reduces the urge to bump stakes after a near-complete collection.",
    tipRu: "Не повышайте ставку сразу после «почти» в money-режиме — догон здесь классика.",
    tipEn: "Do not raise stake right after a near-miss in money mode — classic chase trigger.",
  },
  "wild-west-gold": {
    intentBand: "mid",
    tagRu: "Слот · Pragmatic",
    tagEn: "Slot · Pragmatic",
    focusRu: "липкие вайлды с множителями во фриспинах",
    focusEn: "sticky wild multipliers in free spins",
    mechRu:
      "Wild West Gold — вестерн Pragmatic, где характер слота раскрывается во фриспинах: липкие вайлды с множителями остаются на барабанах и усиливают последующие спины бонуса.",
    mechEn:
      "Wild West Gold is a Pragmatic western whose character shows in free spins: sticky wilds with multipliers stay on the reels and boost later bonus spins.",
    featureRu:
      "В демо отслеживайте позиции липких вайлдов на протяжении фриспинов — от этого зависит ощущение «разгона» бонуса. База нужна, чтобы понять цену ожидания фичи.",
    featureEn:
      "In demo, track sticky wild positions across free spins — that drives the bonus “ramp” feel. Base play teaches the cost of waiting for the feature.",
    tipRu: "Дождитесь одного полного бонуса в демо, прежде чем решать про лимиты на деньги.",
    tipEn: "See one full bonus in demo before setting any real-money limits plan.",
  },
};

function esc(s) {
  return JSON.stringify(s);
}

function buildGuide(game) {
  const slug = game.slug;
  const name = game.name;
  const provider = game.provider;
  const avatar = game.avatar;
  const rtp = game.rtp || "~96%";
  const isCrash = (game.gameType || "").toLowerCase().includes("crash");
  const x = EXTRA[slug];
  if (!x) throw new Error("Missing EXTRA for " + slug);

  const id = `${slug}-demo`;
  const typeRu = isCrash ? "crash-демо" : "демо слота";
  const typeEn = isCrash ? "crash demo" : "slot demo";

  const kwRu = [
    `${name.toLowerCase()} демо без регистрации`,
    `${name.toLowerCase()} играть бесплатно`,
    `${name.toLowerCase()} демо без депозита`,
    `${name.toLowerCase()} как играть`,
    `${name.toLowerCase()} rtp волатильность`,
  ];
  const kwEn = [
    `${name.toLowerCase()} demo no registration`,
    `${name.toLowerCase()} free play`,
    `${name.toLowerCase()} demo no deposit`,
    `how to play ${name.toLowerCase()} demo`,
    `${name.toLowerCase()} rtp volatility`,
  ];

  // Special keyword polish for Gates (keep proven mid intents)
  if (slug === "gates-of-olympus") {
    kwRu.splice(0, kwRu.length,
      "gates of olympus демо без регистрации",
      "врата олимпа играть бесплатно",
      "gates of olympus как работают множители",
      "gates of olympus фриспины тактика",
      "gates of olympus rtp волатильность",
    );
    kwEn.splice(0, kwEn.length,
      "gates of olympus demo no registration",
      "how gates of olympus multipliers work",
      "gates of olympus free spins demo tips",
      "gates of olympus rtp volatility",
    );
  }

  const sectionsRu = [
    {
      heading: `${name} демо без регистрации — с чего начать`,
      body: `Запрос «${name.toLowerCase()} демо без регистрации» обычно значит одно: открыть ${typeRu} ${provider} сразу в браузере, без аккаунта и депозита. На 1weapp карточка ${name} запускает официальное демо с виртуальным балансом. Параллельный запрос — «${name.toLowerCase()} играть бесплатно»: та же цель.`,
      callout: x.tipRu,
      bullets: [
        `Откройте /ru/${slug} и нажмите «Запустить демо»`,
        "Ставка в демо — учебная: держите один размер 40+ раундов подряд",
        "Регистрация и депозит для демо на 1weapp не нужны",
      ],
    },
    {
      heading: `${name}: ${x.focusRu}`,
      body: x.mechRu,
      body2:
        "Именно поэтому демо полезно: вы калибруете ожидания по темпу и частоте фич, а не ищете «сигнал», что игра «должна отдать». RNG не читает историю проигрышей.",
      bullets: isCrash
        ? [
            "Множитель растёт до кэшаута или краша",
            "Авто-кэшаут помогает держать план",
            "Демо не предсказывает следующий полёт",
          ]
        : [
            `Фокус механики: ${x.focusRu}`,
            "База учит темпу; бонус — зона всплесков",
            "Демо не предсказывает следующий бонус",
          ],
    },
    {
      heading: `${name}: фичи и тактика в демо`,
      body: x.featureRu,
      strategies: [
        {
          title: "Учебная сессия в демо (низкий риск обучения)",
          bullets: [
            "Фиксированная ставка 50–100 раундов без смены размера",
            "Записывайте: сколько раундов до первой фичи, длина сухих серий",
            isCrash
              ? "Не поднимайте цель кэшаута после серии ранних крашей"
              : "Не включайте buy bonus, пока не поняли базовый темп",
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
      callout:
        "Демо не предсказывает следующую фичу. Оно показывает волатильность на вашей длине сессии.",
    },
    {
      heading: `RTP и волатильность ${name}`,
      body: `На карточке 1weapp для ${name} указан ориентир RTP ${rtp}. Это долгий средний показатель, а не обещание часа игры. Высокая или средняя волатильность значит: сухие серии на короткой выборке — норма, не «поломка» демо.`,
      bullets: [
        `RTP ${rtp} — долгий ориентир, не гарантия сессии`,
        "Короткая выборка всегда врёт сильнее длинной",
        "В демо проверьте, выдерживает ли ваш план ставки 80–150 раундов",
      ],
    },
    {
      heading: "Чеклист перед игрой на деньги",
      bullets: [
        `Поняли, как в ${name} устроены ${x.focusRu}`,
        "Увидели хотя бы одну характерную фичу в демо",
        "Задали лимит сессии и депозита заранее",
        "Играете только 18+, без догона после сухой серии",
      ],
      callout: `Сначала «${name.toLowerCase()} играть бесплатно» в демо — потом осознанный переход на деньги, если формат вам подходит.`,
    },
  ];

  const sectionsEn = [
    {
      heading: `${name} demo no registration — quick start`,
      body: `People searching “${name.toLowerCase()} demo no registration” want the ${provider} ${typeEn} in the browser with virtual credits — no account wall. On 1weapp the ${name} card launches the free demo build. “${name.toLowerCase()} free play” is the same intent.`,
      callout: x.tipEn,
      bullets: [
        `Open /en/${slug} and tap Launch Demo`,
        "Keep one stake size for 40+ rounds",
        "No signup required for the 1weapp demo",
      ],
    },
    {
      heading: `${name}: ${x.focusEn}`,
      body: x.mechEn,
      body2:
        "Demo helps you calibrate pace and feature frequency — it does not prove the game “owes” a win after losses. RNG has no memory.",
      bullets: isCrash
        ? [
            "Multiplier climbs until cash-out or crash",
            "Auto cash-out helps keep a plan",
            "Demo does not predict the next flight",
          ]
        : [
            `Mechanic focus: ${x.focusEn}`,
            "Base trains pace; features are spike zones",
            "Demo does not predict the next bonus",
          ],
    },
    {
      heading: `${name} free play tips`,
      body: x.featureEn,
      strategies: [
        {
          title: "Learning session (demo)",
          bullets: [
            "Fixed stake for 50–100 rounds",
            "Log rounds-to-feature and dry-streak length",
            isCrash
              ? "Do not raise cash-out targets after early crash streaks"
              : "Skip bonus buy until base pace feels familiar",
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
      callout:
        "Demo does not predict the next feature. It shows volatility on your session length.",
    },
    {
      heading: "RTP and volatility",
      body: `The 1weapp card lists ${name} RTP around ${rtp}. That is a long-run average, not an hourly promise. Medium/high volatility means dry stretches on short samples are normal — not a “broken” demo.`,
      bullets: [
        `RTP ${rtp} is a long-horizon guide`,
        "Short samples lie more than long ones",
        "In demo, check whether your stake plan survives 80–150 rounds",
      ],
    },
    {
      heading: "Checklist before real-money play",
      bullets: [
        `You understand ${x.focusEn} in ${name}`,
        "You have seen at least one signature feature in demo",
        "Session and deposit limits are set in advance",
        "18+ only — never chase a dry streak",
      ],
      callout:
        "Learn free in demo first. Move to real money only if the format fits your limits.",
    },
  ];

  return {
    id,
    gameSlug: slug,
    avatar,
    intentBand: x.intentBand,
    titleRu: `${name} демо без регистрации — ${x.focusRu}`,
    titleEn: `${name} Demo No Registration — ${capitalize(x.focusEn)}`,
    subtitleRu: `Как открыть ${name} демо без регистрации, понять ${x.focusRu} и отработать бесплатно`,
    subtitleEn: `Open ${name} demo with no signup, learn ${x.focusEn}, and practice for free`,
    tagRu: x.tagRu,
    tagEn: x.tagEn,
    keywordsRu: kwRu,
    keywordsEn: kwEn,
    descriptionRu: `Практический разбор: ${name} демо без регистрации, ${x.focusRu}, RTP ${rtp}. Играть бесплатно на 1weapp, 18+.`,
    descriptionEn: `Practical guide: ${name} demo no registration, ${x.focusEn}, RTP ${rtp}. Play free on 1weapp, 18+.`,
    titleSeoRu: `${name} демо без регистрации — гайд и бесплатная игра | 1weapp`,
    titleSeoEn: `${name} Demo No Registration — Free Play Guide | 1weapp`,
    descriptionSeoRu: `${name} демо без регистрации: ${x.focusRu}, RTP ${rtp}. Играйте бесплатно в браузере на 1weapp.`,
    descriptionSeoEn: `${name} demo no registration: ${x.focusEn}, RTP ${rtp}. Play the free demo in your browser on 1weapp.`,
    sections: { ru: sectionsRu, en: sectionsEn },
  };
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function dumpValue(v, indent) {
  const pad = "  ".repeat(indent);
  const pad1 = "  ".repeat(indent + 1);
  if (v === null || typeof v !== "object") return esc(v);
  if (Array.isArray(v)) {
    if (v.length === 0) return "[]";
    if (typeof v[0] === "string") {
      return `[\n${v.map((x) => `${pad1}${esc(x)},`).join("\n")}\n${pad}]`;
    }
    return `[\n${v.map((x) => `${pad1}${dumpValue(x, indent + 1)},`).join("\n")}\n${pad}]`;
  }
  const keys = Object.keys(v);
  return `{\n${keys
    .map((k) => {
      const val = v[k];
      // omit undefined
      if (val === undefined) return null;
      return `${pad1}${k}: ${dumpValue(val, indent + 1)},`;
    })
    .filter(Boolean)
    .join("\n")}\n${pad}}`;
}

const games = JSON.parse(
  fs.readFileSync(path.join(root, "lib/games-data.json"), "utf8")
);

const guides = [];
for (const slug of FEATURED) {
  const g = games.find((x) => x.slug === slug);
  if (!g) {
    console.error("Missing game", slug);
    process.exit(1);
  }
  if (!g.avatar) {
    console.error("Missing avatar", slug);
    process.exit(1);
  }
  guides.push(
    buildGuide({
      slug: g.slug,
      name: g.name,
      provider: g.provider,
      avatar: g.avatar,
      rtp: g.rtp,
      gameType: g.gameType,
    })
  );
  console.log("OK", slug, "→", g.avatar);
}

const header = `/**
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

export const GAME_GUIDES: GameGuide[] = ${dumpValue(guides, 0)}

export function getGameGuide(id: string): GameGuide | undefined {
  return GAME_GUIDES.find((g) => g.id === id)
}

export function getGameGuideByGameSlug(gameSlug: string): GameGuide | undefined {
  return GAME_GUIDES.find((g) => g.gameSlug === gameSlug)
}
`;

fs.writeFileSync(path.join(root, "lib/game-guides-data.ts"), header);
console.log("Wrote", guides.length, "guides → lib/game-guides-data.ts");
