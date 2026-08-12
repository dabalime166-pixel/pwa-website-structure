import { RootDocument } from '@/components/root-document'
import { fontClassName } from '@/lib/fonts'

export default function RuLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="ru" fontClassName={fontClassName}>{children}</RootDocument>
}
