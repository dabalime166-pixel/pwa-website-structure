export function WinLogo({ className = '' }: { className?: string }) {
  return (
    <img
      src="/brands/win-logo.svg"
      alt="1win"
      width={1940}
      height={772}
      className={`win-logo ${className}`.trim()}
      decoding="async"
    />
  )
}
