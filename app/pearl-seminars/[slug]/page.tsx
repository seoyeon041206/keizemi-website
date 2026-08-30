import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import pearlJson from '@/content/generated/pearl-seminars.json';
import seminarsJson from '@/content/generated/seminars.json';
import type { PearlSeminar, Seminar } from '@/app/content-types';
import { ContentChrome, ImportedBody } from '@/app/components/ContentChrome';
import { siteHref } from '@/app/site-path';

const pearlSeminars = pearlJson as PearlSeminar[];
const seminars = seminarsJson as Seminar[];

export const dynamicParams = false;

export function generateStaticParams() {
  return pearlSeminars.map((seminar) => ({ slug: seminar.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const seminar = pearlSeminars.find((item) => item.slug === slug);
  if (!seminar) return {};
  return {
    title: `${seminar.name} | KEIZEMI`,
    description: seminar.excerpt,
    openGraph: { images: [] },
    twitter: { images: [] },
  };
}

export default async function PearlSeminarDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const seminar = pearlSeminars.find((item) => item.slug === slug);
  if (!seminar) notFound();
  const japanese = seminars.find((item) => item.id === seminar.relatedJapaneseId);
  return (
    <ContentChrome
      overline="PEARL / DOUBLE DEGREE"
      title={seminar.name}
      meta={<span>{seminar.field}</span>}
      backHref="/pearl-seminars"
      backLabel="All PEARL / DD seminars"
      footerHomeLabel="Back to home ↑"
    >
      {(seminar.professorLink || japanese) && (
        <nav className="detail-links">
          {seminar.professorLink && <a href={seminar.professorLink} target="_blank" rel="noreferrer">Professor profile ↗</a>}
          {japanese && <a href={siteHref(`/seminars/${japanese.slug}`)}>Japanese seminar page →</a>}
        </nav>
      )}
      {seminar.professorDescription && <div className="imported-body professor-body" dangerouslySetInnerHTML={{ __html: seminar.professorDescription }} />}
      <ImportedBody html={seminar.contentHtml} fallback={seminar.excerpt} />
    </ContentChrome>
  );
}
