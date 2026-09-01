import recruitmentJson from '@/content/recruitment.json';
import { ArchiveFooter } from '@/app/components/ContentChrome';
import { SiteHeader } from '@/app/components/SiteHeader';
import { siteHref } from '@/app/site-path';

type RecruitmentContent = {
  overline: string;
  title: string;
  heroLead: string;
  year: string;
  introduction: string[];
  overview: Array<{ label: string; value: string; note: string }>;
  feature: { overline: string; title: string; description: string };
  roles: Array<{ number: string; name: string; count: string; description: string }>;
  qualities: string[];
  steps: Array<{ number: string; title: string; description: string }>;
  links: {
    guideLabel: string;
    guideUrl: string;
    entryLabel: string;
    entryHref: string;
    contactEmail: string;
  };
  closing: string;
};

const recruitment = recruitmentJson as RecruitmentContent;

export function RecruitmentPage() {
  return (
    <main className="archive-shell recruitment-page">
      <SiteHeader />

      <section className="recruitment-hero">
        <div>
          <p>{recruitment.overline}</p>
          <h1>{recruitment.title}</h1>
          <span>{recruitment.heroLead}</span>
        </div>
        <aside>
          <small>RECRUITMENT</small>
          <strong>{recruitment.year}</strong>
          <span>KEIZEMI EXECUTIVE COMMITTEE</span>
        </aside>
      </section>

      <nav className="directory-breadcrumb" aria-label="パンくずリスト">
        <a href={siteHref('/')} aria-label="ホーム">⌂</a><span aria-hidden="true">›</span><a href={siteHref('/pages/71')}>委員会について</a><span aria-hidden="true">›</span><strong>{recruitment.title}</strong>
      </nav>

      <section className="recruitment-intro">
        <header>
          <small>01 · AT A GLANCE</small>
          <h2>研究会を越えて、<br />一年を動かす。</h2>
        </header>
        <div>
          {recruitment.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="recruitment-primary-actions">
            <a href={siteHref(recruitment.links.entryHref)}>{recruitment.links.entryLabel}<span aria-hidden="true">→</span></a>
            <a href={recruitment.links.guideUrl} target="_blank" rel="noreferrer">{recruitment.links.guideLabel}<span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="recruitment-overview" aria-labelledby="overview-title">
        <header className="recruitment-section-heading">
          <div><small>02 · OVERVIEW</small><h2 id="overview-title">募集概要</h2></div>
          <p>応募前に、対象・人数・活動期間をご確認ください。</p>
        </header>
        <div>
          {recruitment.overview.map((item, index) => (
            <article key={item.label}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <small>{item.label}</small>
              <h3>{item.value}</h3>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="recruitment-feature">
        <div><small>{recruitment.feature.overline}</small><h2>{recruitment.feature.title}</h2></div>
        <p>{recruitment.feature.description}</p>
      </section>

      <section className="recruitment-roles" aria-labelledby="roles-title">
        <header className="recruitment-section-heading">
          <div><small>03 · ROLES</small><h2 id="roles-title">募集役職</h2></div>
          <p>それぞれの担当が専門性を持ちながら、委員会全体で協力して活動します。</p>
        </header>
        <div className="recruitment-role-grid">
          {recruitment.roles.map((role) => (
            <article key={role.number}>
              <header><span>{role.number}</span><strong>{role.count}</strong></header>
              <h3>{role.name}</h3>
              <p>{role.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="recruitment-qualities" aria-labelledby="qualities-title">
        <header><small>04 · WHO WE ARE LOOKING FOR</small><h2 id="qualities-title">求める人物像</h2></header>
        <ol>
          {recruitment.qualities.map((quality, index) => <li key={quality}><span>{String(index + 1).padStart(2, '0')}</span><p>{quality}</p></li>)}
        </ol>
      </section>

      <section className="recruitment-steps" aria-labelledby="steps-title">
        <header className="recruitment-section-heading">
          <div><small>05 · ENTRY FLOW</small><h2 id="steps-title">応募から加入まで</h2></div>
          <p>詳しい日程やエントリーシートの設問は、エントリーページでご案内します。</p>
        </header>
        <ol>
          {recruitment.steps.map((step) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}
        </ol>
        <a className="recruitment-entry-link" href={siteHref(recruitment.links.entryHref)}>{recruitment.links.entryLabel}<span aria-hidden="true">→</span></a>
      </section>

      <section className="recruitment-contact">
        <div><small>CONTACT</small><h2>興味を持ったら、<br />まずはご相談ください。</h2></div>
        <p>{recruitment.closing}</p>
        <a href={`mailto:${recruitment.links.contactEmail}`}>{recruitment.links.contactEmail}<span aria-hidden="true">↗</span></a>
      </section>

      <ArchiveFooter />
    </main>
  );
}
