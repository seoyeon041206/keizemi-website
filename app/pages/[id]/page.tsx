import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import pagesJson from '@/content/pages.json';
import type { BaseContent } from '@/app/content-types';
import { ContentChrome, ImportedBody } from '@/app/components/ContentChrome';
import { HandoutPage } from '@/app/pages/HandoutPage';
import { CommitteePage } from '@/app/pages/CommitteePage';
import { AboutPage } from '@/app/pages/AboutPage';
import { PearlSchedulePage } from '@/app/pages/PearlSchedulePage';
import { PreviousResultsPage } from '@/app/pages/PreviousResultsPage';

const pages = pagesJson as BaseContent[];

export const dynamicParams = false;

export function generateStaticParams() {
  return pages.map((page) => ({ id: String(page.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const page = pages.find((item) => item.id === Number(id));
  if (!page) return {};
  return {
    title: `${page.title} | KEIZEMI`,
    description: page.excerpt,
    openGraph: { images: [] },
    twitter: { images: [] },
  };
}

export default async function InformationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = pages.find((item) => item.id === Number(id));
  if (!page) notFound();
  if (page.id === 71) return <AboutPage />;
  if (page.id === 139) return <HandoutPage />;
  if (page.id === 584) return <CommitteePage />;
  if (page.id === 1598) return <PearlSchedulePage />;
  if (page.id === 1150) return <PreviousResultsPage language="ja" />;
  if (page.id === 1216) return <PreviousResultsPage language="en" />;
  return (
    <ContentChrome overline="INFORMATION" title={page.title} backHref="/" backLabel="ホーム">
      <ImportedBody html={page.contentHtml} fallback={page.excerpt} />
    </ContentChrome>
  );
}
