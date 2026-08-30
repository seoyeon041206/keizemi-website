import type { Metadata } from 'next';
import postsJson from '@/content/generated/posts.json';
import type { NewsPost } from '@/app/content-types';
import { ArchiveFooter, ArchiveHeader } from '@/app/components/ContentChrome';
import { siteHref } from '@/app/site-path';

const posts = postsJson as NewsPost[];

export const metadata: Metadata = {
  title: '新着情報 | KEIZEMI',
  description: '経済学部ゼミナール委員会からのお知らせ、入ゼミ情報、試験情報。',
  openGraph: { images: [] },
  twitter: { images: [] },
};

export default function NewsArchive() {
  return (
    <main className="archive-shell">
      <ArchiveHeader />
      <section className="archive-hero">
        <p>NEWS &amp; UPDATES</p>
        <h1>新着情報</h1>
        <span>{posts.length} articles</span>
      </section>
      <section className="archive-list" aria-label="新着情報一覧">
        {posts.map((post) => (
          <a className="archive-row" href={siteHref(`/news/${post.id}`)} key={post.id}>
            <time>{post.date.replaceAll('-', '.')}</time>
            <span>{post.categories[0] ?? 'お知らせ'}</span>
            <div><h2>{post.title}</h2><p>{post.excerpt}</p></div>
            <b aria-hidden="true">→</b>
          </a>
        ))}
      </section>
      <ArchiveFooter />
    </main>
  );
}
