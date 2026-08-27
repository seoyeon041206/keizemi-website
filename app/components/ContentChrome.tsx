import type { ReactNode } from 'react';

export function ArchiveHeader() {
  return (
    <header className="archive-header">
      <a className="brand" href="/" aria-label="KEIZEMI ホーム">
        <span className="brand-mark">K</span>
        <span><strong>KEIZEMI</strong><small>慶應義塾大学 経済学部ゼミナール委員会</small></span>
      </a>
      <nav aria-label="サイトナビゲーション">
        <a href="/news">新着情報</a>
        <a href="/#seminars">研究会</a>
        <a href="/pearl-seminars">PEARL / DD</a>
      </nav>
      <a className="archive-home" href="/">ホームへ</a>
    </header>
  );
}

export function ArchiveFooter() {
  return (
    <footer className="archive-footer">
      <div><strong>KEIZEMI</strong><span>慶應義塾大学 経済学部ゼミナール委員会</span></div>
      <a href="/">ホームへ戻る ↑</a>
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
        <a className="content-back" href={backHref}>← {backLabel}</a>
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
  if (html) return <div className="imported-body" dangerouslySetInnerHTML={{ __html: html }} />;
  return <div className="imported-body"><p>{fallback || '掲載内容を準備中です。'}</p></div>;
}
