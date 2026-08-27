import type { ReactNode } from 'react';
import { siteBasePath, siteHref } from '@/app/site-path';

export function ArchiveHeader() {
  return (
    <header className="archive-header">
      <a className="brand" href={siteHref('/')} aria-label="KEIZEMI ホーム">
        <span className="brand-mark">K</span>
        <span><strong>KEIZEMI</strong><small>慶應義塾大学 経済学部ゼミナール委員会</small></span>
      </a>
      <nav aria-label="サイトナビゲーション">
        <a href={siteHref('/news')}>新着情報</a>
        <a href={siteHref('/#seminars')}>研究会</a>
        <a href={siteHref('/pearl-seminars')}>PEARL / DD</a>
      </nav>
      <a className="archive-home" href={siteHref('/')}>ホームへ</a>
    </header>
  );
}

export function ArchiveFooter() {
  return (
    <footer className="archive-footer">
      <div><strong>KEIZEMI</strong><span>慶應義塾大学 経済学部ゼミナール委員会</span></div>
      <a href={siteHref('/')}>ホームへ戻る ↑</a>
    </footer>
  );
}

type ContentChromeProps = {
  overline: string;
  title: string;
  meta?: ReactNode;
  backHref: string;
  backLabel: string;
  children: ReactNode;
};

export function ContentChrome({ overline, title, meta, backHref, backLabel, children }: ContentChromeProps) {
  return (
    <main className="archive-shell">
      <ArchiveHeader />
      <article className="content-document">
        <a className="content-back" href={siteHref(backHref)}>← {backLabel}</a>
        <header className="content-title">
          <p>{overline}</p>
          <h1>{title}</h1>
          {meta && <div className="content-meta">{meta}</div>}
        </header>
        {children}
      </article>
      <ArchiveFooter />
    </main>
  );
}

export function ImportedBody({ html, fallback }: { html: string; fallback: string }) {
  const portableHtml = siteBasePath ? html.replaceAll('href="/', `href="${siteBasePath}/`) : html;
  if (portableHtml) return <div className="imported-body" dangerouslySetInnerHTML={{ __html: portableHtml }} />;
  return <div className="imported-body"><p>{fallback || '掲載内容を準備中です。'}</p></div>;
}
