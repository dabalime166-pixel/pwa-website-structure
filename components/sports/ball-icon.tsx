export function BallIcon({
  className,
  size = 16,
  title,
}: {
  className?: string
  size?: number
  title?: string
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 2.8c1.7 1.4 2.7 3.6 2.7 6.1S13.7 14.6 12 16c-1.7-1.4-2.7-3.6-2.7-6.1S10.3 4.2 12 2.8Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M4.2 8.2c2 .2 4 .9 5.6 2.1M19.8 8.2c-2 .2-4 .9-5.6 2.1M4.6 16.2c1.7-1.1 3.7-1.8 5.9-1.9M19.4 16.2c-1.7-1.1-3.7-1.8-5.9-1.9"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M9.4 11.1 12 9.6l2.6 1.5-.9 2.9H10.3l-.9-2.9Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  )
}
