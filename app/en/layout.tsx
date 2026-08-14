import { RootDocument } from '@/components/root-document'
import { fontClassName } from '@/lib/fonts'

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="en" fontClassName={fontClassName}>{children}</RootDocument>
}
