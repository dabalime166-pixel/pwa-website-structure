import GuidesPage from '@/components/guides-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gaming Guides - Learn Strategy & Tips | iGaming Guides',
  description: 'Comprehensive guides on Plinko, Mines, and Crash games. Master gaming strategies, probability theory, and bankroll management.',
  keywords: 'plinko guide, mines strategy, crash game tips, gaming guides, bankroll management',
};

export default function Page() {
  return <GuidesPage lang="en" />;
}
