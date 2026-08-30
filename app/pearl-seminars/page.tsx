import type { Metadata } from 'next';
import pearlJson from '@/content/generated/pearl-seminars.json';
import type { PearlSeminar } from '@/app/content-types';
import { PearlSeminarDirectory, type PearlDirectorySeminar } from '@/app/pearl-seminars/PearlSeminarDirectory';

const pearlSeminars = pearlJson as PearlSeminar[];

const directorySeminars: PearlDirectorySeminar[] = pearlSeminars.map((seminar) => {
  return {
    id: seminar.id,
    slug: seminar.slug,
    name: seminar.name,
    field: seminar.field,
    excerpt: seminar.excerpt,
    status: seminar.recruitmentStatus === '募集停止' ? 'Recruitment closed' : seminar.recruitmentStatus === '新規募集' ? 'Newly recruiting' : 'Recruiting',
    pearl: seminar.pearl,
    dd: seminar.dd,
    pearlStatus: seminar.pearlStatus,
    ddStatus: seminar.ddStatus,
    language: seminar.language,
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
