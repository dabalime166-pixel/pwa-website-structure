import { HtmlLang } from '@/components/html-lang'

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HtmlLang lang="en" />
      {children}
    </>
  )
}
