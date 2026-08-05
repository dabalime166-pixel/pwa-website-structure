import type { Metadata } from "next";
import { MatchDetailPage } from "@/components/sports/match-detail-page";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = "Футбольный матч · Live-счёт и составы | 1weapp";
  const description =
    "Live-счёт, события и составы матча через SportScore. Бесплатный трекер на 1weapp.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://1weapp.online/ru/sports/match/${slug}`,
      languages: {
        en: `https://1weapp.online/en/sports/match/${slug}`,
        ru: `https://1weapp.online/ru/sports/match/${slug}`,
        "x-default": `https://1weapp.online/en/sports/match/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://1weapp.online/ru/sports/match/${slug}`,
      siteName: "1weapp",
      locale: "ru_RU",
      type: "website",
    },
  };
}

export default async function RuSportsMatchPage({ params }: Props) {
  const { slug } = await params;
  return <MatchDetailPage lang="ru" slug={slug} />;
}
