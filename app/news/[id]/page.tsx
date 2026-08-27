import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import postsJson from '@/content/posts.json';
import type { NewsPost } from '@/app/content-types';
import { ContentChrome, ImportedBody } from '@/app/components/ContentChrome';

const posts = postsJson as NewsPost[];

export function generateStaticParams() {
  return posts.map((post) => ({ id: String(post.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = posts.find((item) => item.id === Number(id));
  if (!post) return {};
  return {
    title: `${post.title} | KEIZEMI`,
    description: post.excerpt,
    openGraph: { images: [] },
    twitter: { images: [] },
  };
}

export default async function NewsDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = posts.find((item) => item.id === Number(id));
  if (!post) notFound();
  return (
    <ContentChrome
      overline="NEWS & UPDATES"
      title={post.title}
      meta={<><time>{post.date.replaceAll('-', '.')}</time><span>{post.categories.join(' / ')}</span></>}
      backHref="/news"
      backLabel="新着情報一覧"
    >
      <ImportedBody html={post.contentHtml} fallback={post.excerpt} />
    </ContentChrome>
  );
}
