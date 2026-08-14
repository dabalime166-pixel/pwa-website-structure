'use client'

import { useEffect, useState } from 'react'
import { ctaAnchorProps } from '@/lib/continue'

export interface FaqItem {
  question: string
  answer: string
  /** Optional CTA under the answer (e.g. play for real money) */
  cta?: {
    href: string
    label: string
  }
}

interface FaqAccordionProps {
  items: FaqItem[]
  title: string
  /** Prefix for aria ids when multiple FAQs exist on one page */
  idPrefix?: string
  responsibleHref?: string
  responsibleLabel?: string
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64)
}

export function FaqAccordion({
  items,
  title,
  idPrefix = 'faq',
  responsibleHref = '/en/responsible-gaming',
  responsibleLabel = 'Responsible gaming',
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash.replace(/^#/, '')
    if (!hash.startsWith(`${idPrefix}-`)) return
    const idx = items.findIndex((item, i) => `${idPrefix}-${slugify(item.question) || i}` === hash)
    if (idx >= 0) setOpenIndex(idx)
  }, [idPrefix, items])

  return (
    <section className="faq" aria-label={title} id={idPrefix}>
      <h2 className="faq__title">{title}</h2>
      <div className="faq__list">
        {items.map((item, index) => {
          const isOpen = openIndex === index
          const anchor = `${idPrefix}-${slugify(item.question) || index}`
          const panelId = `${idPrefix}-panel-${index}`
          const buttonId = `${idPrefix}-button-${index}`

          return (
            <div key={item.question} id={anchor} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
              <h3 className="faq__question">
                <button
                  id={buttonId}
                  type="button"
                  className="faq__trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => {
                    setOpenIndex(isOpen ? null : index)
                    if (typeof window !== 'undefined') {
                      history.replaceState(null, '', `#${anchor}`)
                    }
                  }}
                >
                  <span>{item.question}</span>
                  <span className="faq__icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="faq__panel"
                hidden={!isOpen}
              >
                <p className="faq__answer">{item.answer}</p>
                {item.cta && (
                  <div className="faq__cta-wrap">
                    <a
                      {...ctaAnchorProps(item.cta.href)}
                      className="btn-cta faq__cta"
                      aria-label={item.cta.label}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      {item.cta.label}
                    </a>
                    <p className="rg-note">
                      18+ ·{' '}
                      <a href={responsibleHref} className="rg-note__link">
                        {responsibleLabel}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
