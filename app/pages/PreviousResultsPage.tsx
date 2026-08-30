import japaneseResults from '@/content/admissions/previous-results-ja.json';
import englishResults from '@/content/admissions/previous-results-en.json';
import { ArchiveFooter } from '@/app/components/ContentChrome';
import { SiteHeader } from '@/app/components/SiteHeader';
import { siteHref } from '@/app/site-path';

type ResultsContent = typeof japaneseResults | typeof englishResults;

export function PreviousResultsPage({ language }: { language: 'ja' | 'en' }) {
  const content = (language === 'ja' ? japaneseResults : englishResults) as ResultsContent;
  const isEnglish = language === 'en';

  return (
    <main className={`archive-shell admissions-page results-page ${isEnglish ? 'results-page-en' : ''}`}>
      <SiteHeader />

      <section className={`admissions-hero ${isEnglish ? 'admissions-hero-en' : ''}`}>
        <div><p>{content.overline}</p><h1>{content.title}</h1><span>{content.heroLead}</span></div>
        <b aria-hidden="true">{isEnglish ? 'R' : '過'}</b>
      </section>

      <nav className="directory-breadcrumb" aria-label={isEnglish ? 'Breadcrumb' : 'パンくずリスト'}>
        <a href={siteHref('/')} aria-label={isEnglish ? 'Home' : 'ホーム'}>⌂</a><span aria-hidden="true">›</span><strong>{content.title}</strong>
      </nav>

      <section className="results-intro">
        <nav className="results-language-tabs" aria-label="Language">
          {content.tabs.map((tab) => <a className={tab.active ? 'is-active' : ''} aria-current={tab.active ? 'page' : undefined} href={siteHref(tab.href)} key={tab.href}>{tab.label}</a>)}
        </nav>
        <div className="results-intro-grid">
          <div><p>{content.overline}</p><h2>{content.introTitle}</h2><span>{content.introduction}</span></div>
          <aside><small>{isEnglish ? 'REFERENCE ONLY' : '参考資料について'}</small><p>{content.notice}</p></aside>
        </div>
      </section>

      <section className="results-resources" aria-label={isEnglish ? 'Previous result documents' : '過去の試験資料'}>
        {content.resources.map((resource) => (
          <a href={resource.href} target="_blank" rel="noreferrer" key={resource.number}>
            <span>{resource.number}</span>
            <div><small>{resource.eyebrow}</small><h2>{resource.title}</h2><p>{resource.description}</p></div>
            <b aria-hidden="true">↗</b>
          </a>
        ))}
      </section>

      <section className="results-current-link">
        <p>{isEnglish ? 'CURRENT ADMISSIONS' : 'CURRENT ADMISSIONS'}</p>
        <a href={siteHref(content.currentLink.href)}><strong>{content.currentLink.label}</strong><span aria-hidden="true">→</span></a>
      </section>

      <ArchiveFooter homeLabel={isEnglish ? 'Back to home ↑' : 'ホームへ戻る ↑'} />
    </main>
  );
}
