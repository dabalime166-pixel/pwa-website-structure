'use client';

import { useState } from 'react';
import { guides } from '@/lib/guides-data';

export default function GuidesPage({ lang }: { lang: 'en' | 'ru' }) {
  const [selectedGuide, setSelectedGuide] = useState(0);
  const guide = guides[selectedGuide];
  const isEn = lang === 'en';
  const title = isEn ? guide.titleEn : guide.titleRu;
  const content = isEn ? guide.contentEn : guide.contentRu;

  return (
    <main
      style={{
        background: 'var(--color-bg-primary)',
        minHeight: '100vh',
        paddingTop: 'clamp(2rem, 5vw, 4rem)',
        paddingBottom: 'clamp(2rem, 5vw, 4rem)',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: 'clamp(1rem, 3vw, 2rem)',
          paddingRight: 'clamp(1rem, 3vw, 2rem)',
        }}
      >
        {/* Guide Selection Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(0.75rem, 2vw, 1.25rem)',
            marginBottom: 'clamp(2rem, 5vw, 3rem)',
            justifyContent: 'center',
          }}
        >
          {guides.map((g, idx) => (
            <button
              key={g.id}
              onClick={() => setSelectedGuide(idx)}
              style={{
                padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.25rem, 3vw, 1.75rem)',
                backgroundColor:
                  selectedGuide === idx
                    ? 'var(--color-accent-gold)'
                    : 'var(--color-bg-surface)',
                color:
                  selectedGuide === idx
                    ? 'var(--color-bg-primary)'
                    : 'var(--color-text-primary)',
                border: '2px solid var(--color-border-gold)',
                borderRadius: 'var(--radius-button)',
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                fontWeight: selectedGuide === idx ? '600' : '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (selectedGuide !== idx) {
                  e.currentTarget.style.backgroundColor = 'var(--color-border-gold)';
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedGuide !== idx) {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-surface)';
                }
              }}
            >
              {isEn ? g.titleEn : g.titleRu}
            </button>
          ))}
        </div>

        {/* Guide Content */}
        <article
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-gold)',
            borderRadius: 'var(--radius-card)',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          }}
        >
          <div
            className="guide-content"
            style={{
              color: 'var(--color-text-primary)',
              lineHeight: '1.8',
            }}
            dangerouslySetInnerHTML={{
              __html: content
                .split('\n')
                .map((line) => {
                  // Headers
                  if (line.startsWith('## ')) {
                    return `<h2 style="font-size: clamp(1.5rem, 4vw, 2rem); margin-top: 2rem; margin-bottom: 1.25rem; font-weight: 700; color: var(--color-accent-gold);">${line.slice(3)}</h2>`;
                  }
                  if (line.startsWith('### ')) {
                    return `<h3 style="font-size: clamp(1.25rem, 3vw, 1.5rem); margin-top: 1.75rem; margin-bottom: 1rem; font-weight: 600; color: var(--color-text-primary);">${line.slice(4)}</h3>`;
                  }
                  // Bold text
                  if (line.startsWith('- ')) {
                    return `<li style="margin-left: 1.5rem; margin-bottom: 0.75rem;">${line.slice(2)}</li>`;
                  }
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return `<p style="font-weight: 600; margin: 0.75rem 0; color: var(--color-accent-gold);">${line.slice(2, -2)}</p>`;
                  }
                  // Regular paragraphs
                  if (line.trim() === '') {
                    return '';
                  }
                  return `<p style="margin-bottom: 1rem;">${line}</p>`;
                })
                .join('')
                .replace(/<li/g, '<ul style="margin-bottom: 1rem;"><li')
                .replace(/li>/g, 'li></ul>'),
            }}
          />
        </article>

        {/* Back Button */}
        <div
          style={{
            marginTop: 'clamp(2rem, 5vw, 3rem)',
            textAlign: 'center',
          }}
        >
          <a
            href={isEn ? '/en' : '/ru'}
            style={{
              display: 'inline-block',
              padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
              backgroundColor: 'var(--color-bg-surface)',
              color: 'var(--color-accent-gold)',
              border: '2px solid var(--color-accent-gold)',
              borderRadius: 'var(--radius-button)',
              textDecoration: 'none',
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent-gold)';
              e.currentTarget.style.color = 'var(--color-bg-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-bg-surface)';
              e.currentTarget.style.color = 'var(--color-accent-gold)';
            }}
          >
            {isEn ? '← Back to Home' : '← Вернуться на главную'}
          </a>
        </div>
      </div>
    </main>
  );
}
