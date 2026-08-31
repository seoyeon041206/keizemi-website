import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import seminarsJson from '@/content/generated/seminars.json';
import type { Seminar } from '@/app/content-types';
import { ContentChrome } from '@/app/components/ContentChrome';
import { SeminarDetailSections, type SeminarDetailLink } from '@/app/components/SeminarDetailSections';

const seminars = seminarsJson as Seminar[];
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://keizemi-keio.sykim140400.chatgpt.site').replace(/\/$/, '');

export const dynamicParams = false;

export function generateStaticParams() {
  return seminars.map((seminar) => ({ slug: seminar.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const seminar = seminars.find((item) => item.slug === slug);
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

export default async function SeminarDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const seminar = seminars.find((item) => item.slug === slug);
  if (!seminar) notFound();
  const links = [
    { label: '研究会サイト', href: seminar.url || seminar.website, external: true },
    { label: 'X', href: seminar.twitter, external: true },
    { label: 'Instagram', href: seminar.instagram, external: true },
    { label: 'Facebook', href: seminar.facebook, external: true },
  ].filter((entry) => entry.href) as SeminarDetailLink[];

  return (
    <ContentChrome
      overline="SEMINAR DIRECTORY"
      title={seminar.name}
      meta={<><span>{seminar.field}</span><span>{seminar.status}</span>{seminar.languages?.map((language) => <span key={language}>{language}</span>)}{seminar.pearl && <span>PEARL</span>}{seminar.dd && <span>DD</span>}</>}
      backHref="/seminars"
      backLabel="研究会一覧"
    >
      <SeminarDetailSections
        language="ja"
        seminarName={seminar.name}
        introductionHtml={seminar.contentHtml}
        introductionFallback={seminar.excerpt}
        seminarImage={seminar.seminarImage}
        seminarImageAlt={seminar.seminarImageAlt}
        professorName={seminar.professorName}
        professorNameSecondary={seminar.professorNameAlpha}
        professorImage={seminar.professorImage}
        professorImageAlt={seminar.professorImageAlt}
        professorMessage={seminar.professorMessage}
        professorLink={seminar.professorLink}
        links={links}
      />
    </ContentChrome>
  );
}
