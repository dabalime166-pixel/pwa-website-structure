import type { Lang } from '@/lib/games'

export interface ExpertProfile {
  id: string
  name: string
  avatar: string
  credentialsEn: string
  credentialsRu: string
  titleEn: string
  titleRu: string
  bioEn: string
  bioRu: string
  experienceEn: string[]
  experienceRu: string[]
  focusEn: string[]
  focusRu: string[]
  reviewedLabelEn: string
  reviewedLabelRu: string
}

/** Editorial reviewer used for E-E-A-T author signals on educational pages */
export const EXPERT: ExpertProfile = {
  id: 'dr-henrik-adler',
  name: 'Dr. Henrik Adler',
  avatar: '/experts/dr-henrik-adler.png',
  credentialsEn: 'PhD, Applied Probability',
  credentialsRu: 'PhD, прикладная теория вероятностей',
  titleEn: 'Demo Mechanics & Responsible Play Reviewer',
  titleRu: 'Рецензент демо-механик и ответственной игры',
  bioEn:
    'Dr. Henrik Adler spent 14 years explaining stochastic game loops to non-specialists: first as a university lecturer in applied probability, then as an independent reviewer of demo catalogs and player-education copy. He focuses on RTP literacy, crash cashout discipline, mines combinatorics and clear responsible-play framing — never on “guaranteed systems.” On 1weapp he reviews guides and homepage explainers so readers can test mechanics in demo mode before any real-money decision.',
  bioRu:
    'Д-р Хенрик Адлер 14 лет объясняет стохастические игровые циклы людям без мат. бэкграунда: сначала как преподаватель прикладной теории вероятностей, затем как независимый рецензент демо-каталогов и образовательных текстов для игроков. Фокус — грамотность по RTP, дисциплина кэшаута в краше, комбинаторика mines и честные формулировки об ответственной игре, без «гарантированных схем». На 1weapp он вычитывает гайды и пояснения на главной, чтобы читатель мог проверить механику в демо до любых решений на деньги.',
  experienceEn: [
    'PhD in Applied Probability — stochastic processes & Bernoulli models',
    '9 years teaching probability labs for non-math majors',
    '5 years reviewing iGaming demo explainers and RTP disclosures',
    'Advisor notes on session limits, wagering literacy and tilt control',
  ],
  experienceRu: [
    'PhD по прикладной теории вероятностей — стохастические процессы и схемы Бернулли',
    '9 лет преподавания вероятностных практикумов для неспециалистов',
    '5 лет рецензирования демо-объяснений и раскрытия RTP в iGaming',
    'Методические заметки по лимитам сессии, вейджеру и контролю тильта',
  ],
  focusEn: ['RTP & volatility', 'Crash cashout', 'Mines odds', 'Responsible limits'],
  focusRu: ['RTP и волатильность', 'Кэшаут в краше', 'Шансы в Mines', 'Лимиты'],
  reviewedLabelEn: 'Editorial review',
  reviewedLabelRu: 'Редакторская проверка',
}

export function getExpertCopy(lang: Lang) {
  const isEn = lang === 'en'
  return {
    name: EXPERT.name,
    avatar: EXPERT.avatar,
    credentials: isEn ? EXPERT.credentialsEn : EXPERT.credentialsRu,
    title: isEn ? EXPERT.titleEn : EXPERT.titleRu,
    bio: isEn ? EXPERT.bioEn : EXPERT.bioRu,
    experience: isEn ? EXPERT.experienceEn : EXPERT.experienceRu,
    focus: isEn ? EXPERT.focusEn : EXPERT.focusRu,
    reviewedLabel: isEn ? EXPERT.reviewedLabelEn : EXPERT.reviewedLabelRu,
    eyebrow: isEn ? 'Reviewed by' : 'Проверено',
    experienceLabel: isEn ? 'Background' : 'Опыт',
    focusLabel: isEn ? 'Focus areas' : 'Зоны экспертизы',
    legal: isEn
      ? 'Educational content only · 18+ · Not financial advice'
      : 'Только образование · 18+ · Не финансовая рекомендация',
  }
}
