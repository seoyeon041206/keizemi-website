import type { Metadata } from 'next';
import { SeminarDirectory } from '@/app/seminars/SeminarDirectory';

export const metadata: Metadata = {
  title: '研究会一覧 | KEIZEMI',
  description: '慶應義塾大学経済学部の研究会を、分野・募集状況・PEARL対応から探せる一覧ページです。',
  openGraph: { images: [] },
  twitter: { images: [] },
};

export default function SeminarArchive() {
  return <SeminarDirectory />;
}
