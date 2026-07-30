'use client'

import { useEffect } from 'react'
import type { Lang } from '@/lib/games'

/** Root layout hardcodes html lang="en"; sync documentElement for RU pages. */
export function HtmlLang({ lang }: { lang: Lang }) {
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
  return null
}
