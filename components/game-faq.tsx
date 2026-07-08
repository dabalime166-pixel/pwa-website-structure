'use client'

import { useState } from 'react'

interface FAQItem {
  q: string
  a: string
}

interface GameFAQProps {
  items: FAQItem[]
  isEn: boolean
}

export function GameFAQ({ items, isEn }: GameFAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section
      className="game-faq"
      aria-labelledby="game-faq-heading"
      style={{
        background: 'var(--color-bg-surface)',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--color-border-gold)',
        padding: 'clamp(2rem, 5vw, 3rem)',
        marginBottom: '3rem',
      }}
    >
      <h2 id="game-faq-heading" style={{ color: 'var(--color-gold)', marginBottom: '2rem', fontSize: 'clamp(1rem, 2vw, 1.375rem)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
        {isEn ? '❓ Frequently Asked Questions' : '❓ Часто задаваемые вопросы'}
      </h2>
      <div className="faq-list">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            className={`faq-item ${openIdx === idx ? 'open' : ''}`}
          >
            <button 
              className="faq-question" 
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              aria-expanded={openIdx === idx}
            >
              <span>{item.q}</span>
            </button>
            <div className="faq-answer">
              {item.a}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
