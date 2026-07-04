import GuidesPage from '@/components/guides-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Гайды по играм - Стратегия и советы | iGaming Гайды',
  description: 'Полные гайды по играм Плинко, Мины и Краш. Овладейте стратегией, теорией вероятностей и управлением банкроллом.',
  keywords: 'гайд плинко, стратегия мины, краш игры, управление банкроллом, теория вероятностей',
};

export default function Page() {
  return <GuidesPage lang="ru" />;
}
