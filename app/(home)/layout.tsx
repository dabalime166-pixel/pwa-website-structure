import { RootDocument } from '@/components/root-document'
import { fontClassName } from '@/lib/fonts'

/** English document shell for `/` (route group does not affect the URL). */
export default function HomeGroupLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="en" fontClassName={fontClassName}>{children}</RootDocument>
}
