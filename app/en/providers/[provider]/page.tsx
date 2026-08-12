import type { Metadata } from 'next'
import {
  ProviderHubPage,
  providerMetadata,
  providerStaticParams,
} from '@/components/provider-hub-page'

type Props = {
  params: Promise<{ provider: string }>
  searchParams: Promise<{ page?: string }>
}

export function generateStaticParams() {
  return providerStaticParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { provider } = await params
  return providerMetadata('en', provider)
}

export default async function EnProviderPage({ params, searchParams }: Props) {
  const { provider } = await params
  const sp = await searchParams
  const page = Math.max(1, Number(sp.page) || 1)
  return <ProviderHubPage lang="en" providerSlug={provider} page={page} />
}
