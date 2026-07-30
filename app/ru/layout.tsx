import { HtmlLang } from '@/components/html-lang'

export default function RuLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HtmlLang lang="ru" />
      {children}
    </>
  )
}
