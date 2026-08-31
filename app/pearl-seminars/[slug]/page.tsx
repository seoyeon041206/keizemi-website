import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import pearlJson from '@/content/generated/pearl-seminars.json';
import seminarsJson from '@/content/generated/seminars.json';
import type { PearlSeminar, Seminar } from '@/app/content-types';
import { ContentChrome } from '@/app/components/ContentChrome';
import { SeminarDetailSections, type SeminarDetailLink } from '@/app/components/SeminarDetailSections';

const pearlSeminars = pearlJson as PearlSeminar[];
const seminars = seminarsJson as Seminar[];
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://keizemi-keio.sykim140400.chatgpt.site').replace(/\/$/, '');

export const dynamicParams = false;

export function generateStaticParams() {
  return pearlSeminars.map((seminar) => ({ slug: seminar.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const seminar = pearlSeminars.find((item) => item.slug === slug);
  if (!seminar) return {};
  const socialImage = seminar.seminarImage ? `${siteUrl}${seminar.seminarImage}` : '';
  return {
    title: `${seminar.name} | KEIZEMI`,
    description: seminar.excerpt,
    openGraph: {
      images: socialImage ? [{ url: socialImage, alt: seminar.seminarImageAlt }] : [],
    },
    twitter: { images: socialImage ? [socialImage] : [] },
  };
}

export default async function PearlSeminarDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const seminar = pearlSeminars.find((item) => item.slug === slug);
  if (!seminar) notFound();
  const japanese = seminars.find((item) => item.id === seminar.relatedJapaneseId);
  const links = [
    { label: 'Official seminar website', href: seminar.website, external: true },
    { label: 'X', href: seminar.twitter, external: true },
    { label: 'Instagram', href: seminar.instagram, external: true },
    { label: 'Facebook', href: seminar.facebook, external: true },
    ...(japanese ? [{ label: 'Japanese seminar page', href: `/seminars/${japanese.slug}` }] : []),
  ].filter((entry) => entry.href) as SeminarDetailLink[];
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
      <SeminarDetailSections
        language="en"
        seminarName={seminar.name}
        introductionHtml={seminar.contentHtml}
        introductionFallback={seminar.excerpt}
        seminarImage={seminar.seminarImage}
        seminarImageAlt={seminar.seminarImageAlt}
        professorName={seminar.professorName}
        professorNameSecondary={seminar.professorNameLocal}
        professorImage={seminar.professorImage}
        professorImageAlt={seminar.professorImageAlt}
        professorMessage={seminar.professorMessage}
        professorLink={seminar.professorLink}
        links={links}
      />
    </ContentChrome>
  );
}
