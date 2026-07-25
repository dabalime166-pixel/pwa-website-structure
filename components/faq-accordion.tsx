'use client'

import { useState } from 'react'

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
}

export function FaqAccordion({ items, title, idPrefix = 'faq' }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="faq" aria-label={title}>
      <h2 className="faq__title">{title}</h2>
      <div className="faq__list">
        {items.map((item, index) => {
          const isOpen = openIndex === index
          const panelId = `${idPrefix}-panel-${index}`
          const buttonId = `${idPrefix}-button-${index}`

          return (
            <div key={item.question} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
              <h3 className="faq__question">
                <button
                  id={buttonId}
                  type="button"
                  className="faq__trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
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
                  <a
                    href={item.cta.href}
                    rel="noopener noreferrer nofollow sponsored"
                    target="_blank"
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
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
