import entryJson from '@/content/recruitment-entry.json';
import { ArchiveFooter } from '@/app/components/ContentChrome';
import { SiteHeader } from '@/app/components/SiteHeader';
import { siteHref } from '@/app/site-path';

type EntryContent = {
  overline: string;
  title: string;
  heroLead: string;
  year: string;
  status: string;
  introTitle: string;
  introduction: string;
  rounds: Array<{
    number: string;
    label: string;
    title: string;
    period: string;
    description: string;
    timeline: Array<{ date: string; title: string; note?: string }>;
    eligibility: string;
    briefing: string;
    notes: string[];
    formLabel: string;
    formUrl: string;
  }>;
  entrySheet: { title: string; description: string; questions: string[] };
  resources: Array<{ label: string; title: string; url: string }>;
  contactEmail: string;
};

const entry = entryJson as EntryContent;

export function RecruitmentEntryPage() {
  return (
    <main className="archive-shell entry-page">
      <SiteHeader />

      <section className="entry-hero">
        <div><p>{entry.overline}</p><h1>{entry.title}</h1><span>{entry.heroLead}</span></div>
        <aside><small>ENTRY GUIDE</small><strong>{entry.year}</strong><span>{entry.status}</span></aside>
      </section>

      <nav className="directory-breadcrumb" aria-label="パンくずリスト">
        <a href={siteHref('/')} aria-label="ホーム">⌂</a><span aria-hidden="true">›</span><a href={siteHref('/pages/707')}>新規委員募集</a><span aria-hidden="true">›</span><strong>{entry.title}</strong>
      </nav>

      <section className="entry-intro">
        <div><small>01 · ENTRY OVERVIEW</small><h2>{entry.introTitle}</h2></div>
        <p>{entry.introduction}</p>
      </section>

      <section className="entry-rounds" aria-label="募集日程">
        {entry.rounds.map((round) => (
          <article className="entry-round" key={round.number}>
            <header>
              <span>{round.number}</span>
              <div><small>{round.label}</small><h2>{round.title}</h2><p>{round.description}</p></div>
              <strong>{round.period}</strong>
            </header>
            <div className="entry-round-body">
              <ol className="entry-timeline">
                {round.timeline.map((item) => (
                  <li key={`${round.number}-${item.date}-${item.title}`}>
                    <time>{item.date}</time><div><h3>{item.title}</h3>{item.note && <p>{item.note}</p>}</div>
                  </li>
                ))}
              </ol>
              <aside className="entry-round-details">
                <div><small>対象者</small><p>{round.eligibility}</p></div>
                <div><small>説明会</small><p>{round.briefing}</p></div>
                <div><small>備考</small><ul>{round.notes.map((note) => <li key={note}>{note}</li>)}</ul></div>
                <a href={round.formUrl} target="_blank" rel="noreferrer">{round.formLabel}<span aria-hidden="true">↗</span></a>
              </aside>
            </div>
          </article>
        ))}
      </section>

      <section className="entry-sheet" aria-labelledby="entry-sheet-title">
        <header><small>02 · ENTRY SHEET</small><h2 id="entry-sheet-title">{entry.entrySheet.title}</h2><p>{entry.entrySheet.description}</p></header>
        <ol>{entry.entrySheet.questions.map((question, index) => <li key={question}><span>{String(index + 1).padStart(2, '0')}</span><p>{question}</p></li>)}</ol>
      </section>

      <section className="entry-resources" aria-labelledby="entry-resources-title">
        <header><small>03 · RESOURCES</small><h2 id="entry-resources-title">説明資料</h2></header>
        <div>{entry.resources.map((resource) => <a href={resource.url} target="_blank" rel="noreferrer" key={resource.url}><small>{resource.label}</small><strong>{resource.title}</strong><span aria-hidden="true">↗</span></a>)}</div>
      </section>

      <section className="entry-contact">
        <div><small>CONTACT</small><h2>応募についてのご質問</h2></div>
        <p>日程や応募方法について不明な点があれば、メールでお問い合わせください。</p>
        <a href={`mailto:${entry.contactEmail}`}>{entry.contactEmail}<span aria-hidden="true">↗</span></a>
      </section>

      <ArchiveFooter />
    </main>
  );
}
