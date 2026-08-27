import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import pagesJson from '@/content/pages.json';
import type { BaseContent } from '@/app/content-types';
import { ContentChrome, ImportedBody } from '@/app/components/ContentChrome';

const pages = pagesJson as BaseContent[];

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
  return (
    <ContentChrome overline="INFORMATION" title={page.title} backHref="/" backLabel="ホーム">
      <ImportedBody html={page.contentHtml} fallback={page.excerpt} />
    </ContentChrome>
  );
}
