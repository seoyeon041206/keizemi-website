import type { ReactNode } from 'react';
import { siteBasePath, siteHref } from '@/app/site-path';
import { SiteHeader } from '@/app/components/SiteHeader';

export function ArchiveHeader() {
  return <SiteHeader />;
}

export function ArchiveFooter({ homeLabel = 'ホームへ戻る ↑' }: { homeLabel?: string }) {
  return (
    <footer className="archive-footer">
      <div><strong>KEIZEMI</strong><span>慶應義塾大学 経済学部ゼミナール委員会</span></div>
      <a href={siteHref('/')}>{homeLabel}</a>
    </footer>
  );
}

type ContentChromeProps = {
  overline: string;
  title: string;
  meta?: ReactNode;
  backHref: string;
  backLabel: string;
  footerHomeLabel?: string;
  children: ReactNode;
};

export function ContentChrome({ overline, title, meta, backHref, backLabel, footerHomeLabel, children }: ContentChromeProps) {
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
      <ArchiveFooter homeLabel={footerHomeLabel} />
    </main>
  );
}

export function ImportedBody({ html, fallback }: { html: string; fallback: string }) {
  const portableHtml = siteBasePath ? html.replaceAll('href="/', `href="${siteBasePath}/`) : html;
  if (portableHtml) return <div className="imported-body" dangerouslySetInnerHTML={{ __html: portableHtml }} />;
  return <div className="imported-body"><p>{fallback || '掲載内容を準備中です。'}</p></div>;
}
