import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="nf" role="main">
      <div className="nf__bg" aria-hidden="true" />

      <div className="nf__inner">
        <span className="badge-gold nf__badge">404 — Error</span>

        <p className="nf__code" aria-hidden="true">404</p>

        <h1 className="nf__title">Page not found</h1>

        <p className="nf__sub">
          The page you are looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back to the games.
        </p>

        <div className="nf__actions">
          <Link href="/en" className="btn-cta" aria-label="Go to homepage">
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
              <path d="M3 12l9-9 9 9" />
              <path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
            </svg>
            Back to home
          </Link>

          <Link href="/en#games" className="btn-ghost">
            Browse games
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  )
}
