import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import seminarsJson from '@/content/seminars.json';
import type { Seminar } from '@/app/content-types';
import { ContentChrome, ImportedBody } from '@/app/components/ContentChrome';

const seminars = seminarsJson as Seminar[];

export const dynamicParams = false;

export function generateStaticParams() {
  return seminars.map((seminar) => ({ slug: seminar.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const seminar = seminars.find((item) => item.slug === slug);
  if (!seminar) return {};
  return {
    title: `${seminar.name} | KEIZEMI`,
    description: seminar.excerpt,
    openGraph: { images: [] },
    twitter: { images: [] },
  };
}

export default async function SeminarDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const seminar = seminars.find((item) => item.slug === slug);
  if (!seminar) notFound();
  const links = [
    ['研究会サイト', seminar.website],
    ['教員プロフィール', seminar.professorLink],
    ['X', seminar.twitter],
    ['Instagram', seminar.instagram],
    ['Facebook', seminar.facebook],
  ].filter((entry) => entry[1]);

  return (
    <ContentChrome
      overline="SEMINAR DIRECTORY"
      title={seminar.name}
      meta={<><span>{seminar.field}</span><span>{seminar.status}</span>{seminar.pearl && <span>PEARL</span>}{seminar.dd && <span>DD</span>}</>}
      backHref="/#seminars"
      backLabel="研究会一覧"
    >
      <section className="seminar-profile">
        {(seminar.professorName || seminar.professorNameAlpha) && (
          <div><small>PROFESSOR</small><h2>{seminar.professorName || seminar.name}</h2><p>{seminar.professorNameAlpha}</p></div>
        )}
        {links.length > 0 && <nav>{links.map(([label, href]) => <a href={href} target="_blank" rel="noreferrer" key={label}>{label} ↗</a>)}</nav>}
      </section>
      {seminar.professorDescription && <div className="imported-body professor-body" dangerouslySetInnerHTML={{ __html: seminar.professorDescription }} />}
      <ImportedBody html={seminar.contentHtml} fallback={seminar.excerpt} />
    </ContentChrome>
  );
}
