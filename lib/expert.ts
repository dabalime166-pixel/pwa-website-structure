import type { Lang } from '@/lib/games'
import expertJson from './expert.json'

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
export const EXPERT: ExpertProfile = expertJson as ExpertProfile

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
