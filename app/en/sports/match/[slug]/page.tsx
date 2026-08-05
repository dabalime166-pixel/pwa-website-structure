import type { Metadata } from "next";
import { MatchDetailPage } from "@/components/sports/match-detail-page";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = "Football Match · Live Score & Lineups | 1weapp";
  const description =
    "Live football score, incidents, and lineups powered by SportScore. Free match tracker on 1weapp.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://1weapp.online/en/sports/match/${slug}`,
      languages: {
        en: `https://1weapp.online/en/sports/match/${slug}`,
        ru: `https://1weapp.online/ru/sports/match/${slug}`,
        "x-default": `https://1weapp.online/en/sports/match/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://1weapp.online/en/sports/match/${slug}`,
      siteName: "1weapp",
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function EnSportsMatchPage({ params }: Props) {
  const { slug } = await params;
  return <MatchDetailPage lang="en" slug={slug} />;
}
