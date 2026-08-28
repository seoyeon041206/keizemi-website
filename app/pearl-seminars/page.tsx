import type { Metadata } from 'next';
import pearlJson from '@/content/pearl-seminars.json';
import siteIndex from '@/content/site-index.json';
import type { PearlSeminar } from '@/app/content-types';
import { PearlSeminarDirectory, type PearlDirectorySeminar } from '@/app/pearl-seminars/PearlSeminarDirectory';

const pearlSeminars = pearlJson as PearlSeminar[];
const japaneseSeminars = siteIndex.seminars;
const japaneseById = new Map(japaneseSeminars.map((seminar) => [seminar.id, seminar]));

const directorySeminars: PearlDirectorySeminar[] = pearlSeminars.map((seminar) => {
  const japanese = japaneseById.get(seminar.relatedJapaneseId);
  const hasJapaneseText = /[ぁ-んァ-ヶ一-龯]/.test(seminar.excerpt);
  return {
    id: seminar.id,
    slug: seminar.slug,
    name: seminar.name,
    field: seminar.field,
    excerpt: hasJapaneseText ? 'Explore this seminar’s research focus, activities, and admissions information.' : seminar.excerpt,
    status: japanese?.status === '募集停止' ? 'Recruitment closed' : japanese?.status === '新規募集' ? 'Newly recruiting' : 'Recruiting',
    pearl: japanese?.pearl ?? /[（(]P[）)]/.test(seminar.name),
    dd: japanese?.dd ?? /[（(]DD[）)]/.test(seminar.name),
  };
});

export const metadata: Metadata = {
  title: 'Seminars for PEARL / DD | KEIZEMI',
  description: 'Find English-friendly economics seminars by field, recruitment status, and programme.',
  openGraph: { images: [] },
  twitter: { images: [] },
};

export default function PearlSeminarArchive() {
  return <PearlSeminarDirectory seminars={directorySeminars} />;
}
