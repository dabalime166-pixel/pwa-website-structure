'use client'

import { useState } from 'react'

export interface FaqItem {
  question: string
  answer: string
}

interface FaqAccordionProps {
  items: FaqItem[]
  title: string
}

export function FaqAccordion({ items, title }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="faq" aria-label={title}>
      <h2 className="faq__title">{title}</h2>
      <div className="faq__list">
        {items.map((item, index) => {
          const isOpen = openIndex === index
          const panelId = `faq-panel-${index}`
          const buttonId = `faq-button-${index}`

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
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
