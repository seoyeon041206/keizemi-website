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
      meta={<><span>{seminar.field}</span><span>{seminar.sourceYear} availability</span></>}
      backHref="/pearl-seminars"
      backLabel="All PEARL / DD seminars"
      footerHomeLabel="Back to home ↑"
    >
      <section className="pearl-detail-availability" aria-labelledby="availability-title">
        <header><small>OFFICIAL 2026 LIST</small><h2 id="availability-title">Programme availability</h2><p>Acceptance and language information from the 2026 PEARL / DD seminar list.</p></header>
        <dl>
          <div><dt>PEARL</dt><dd>{seminar.pearlStatus}</dd></div>
          <div><dt>DOUBLE DEGREE</dt><dd>{seminar.ddStatus}</dd></div>
          <div><dt>LANGUAGE USED</dt><dd>{seminar.language}</dd></div>
        </dl>
        <p className="pearl-detail-note">“Allowed” may mean that you are expected to use Japanese in class or be comfortable studying in Japanese. Check all conditions before applying.</p>
      </section>
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
