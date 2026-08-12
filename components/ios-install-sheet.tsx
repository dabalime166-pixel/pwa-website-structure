'use client'

interface IosInstallSheetProps {
  open: boolean
  title: string
  body: string
  stepShare: string
  stepAdd: string
  stepOpen: string
  continueLabel: string
  shareHint: string
  onContinue: () => void
}

function ShareIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v12"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M8 7l4-4 4 4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IosInstallSheet({
  open,
  title,
  body,
  stepShare,
  stepAdd,
  stepOpen,
  continueLabel,
  shareHint,
  onContinue,
}: IosInstallSheetProps) {
  if (!open) return null

  const steps = [
    { n: '1', text: stepShare, icon: <ShareIcon /> },
    { n: '2', text: stepAdd },
    { n: '3', text: stepOpen },
  ]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ios-install-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.72)',
        padding: '1rem',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: 'linear-gradient(180deg, #1a1814 0%, #111113 100%)',
          border: '1px solid rgba(201,162,39,0.4)',
          borderRadius: 20,
          padding: '1.25rem 1.25rem 1.35rem',
          boxShadow: '0 24px 60px rgba(0,0,0,0.55)',
          animation: 'iosSheetIn 0.28s ease-out',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: 40,
            height: 4,
            borderRadius: 99,
            background: 'rgba(201,162,39,0.35)',
            margin: '0 auto 1rem',
          }}
        />

        <h2
          id="ios-install-title"
          style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '0.5rem',
            textAlign: 'center',
          }}
        >
          {title}
        </h2>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '0.875rem',
            lineHeight: 1.55,
            textAlign: 'center',
            marginBottom: '1.15rem',
          }}
        >
          {body}
        </p>

        <ol style={{ listStyle: 'none', display: 'grid', gap: '0.65rem', marginBottom: '1.25rem' }}>
          {steps.map((step) => (
            <li
              key={step.n}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                background: 'rgba(201,162,39,0.06)',
                border: '1px solid rgba(201,162,39,0.18)',
                borderRadius: 12,
                padding: '0.75rem 0.85rem',
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, var(--color-gold-light), var(--color-gold))',
                  color: '#0a0a0b',
                  fontWeight: 800,
                  fontSize: '0.8125rem',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                }}
              >
                {step.icon ?? step.n}
              </span>
              <span style={{ color: 'var(--color-text-primary)', fontSize: '0.875rem', lineHeight: 1.45, paddingTop: 3 }}>
                {step.text}
              </span>
            </li>
          ))}
        </ol>

        {/* Visual hint pointing to Safari share bar */}
        <div
          aria-hidden="true"
          style={{
            textAlign: 'center',
            color: 'var(--color-gold)',
            marginBottom: '1rem',
            fontSize: '0.75rem',
            letterSpacing: '0.04em',
          }}
        >
          {shareHint}
        </div>

        <button type="button" className="btn-cta" onClick={onContinue} style={{ width: '100%' }}>
          {continueLabel}
        </button>
      </div>

      <style>{`
        @keyframes iosSheetIn {
          from { transform: translateY(24px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
