import aboutJson from '@/content/about.json';
import faqsJson from '@/content/generated/faqs.json';
import { ArchiveFooter } from '@/app/components/ContentChrome';
import { SiteHeader } from '@/app/components/SiteHeader';
import { siteHref } from '@/app/site-path';

type AboutContent = {
  overline: string;
  title: string;
  heroLead: string;
  heroMarker: { value: string; label: string };
  introduction: string[];
  mission: string;
  composition: Array<{ label: string; value: string; description: string }>;
  activities: Array<{ number: string; title: string; description: string; href: string }>;
  significance: string[];
  culture: string[];
  rules: { title: string; description: string; url: string };
  finance: { title: string; amount: string; description: string; href: string };
};

type Faq = {
  id: string;
  order: number;
  category: string;
  question: string;
  answer: string;
};

const about = aboutJson as AboutContent;
const faqs = faqsJson as Faq[];

export function AboutPage() {
  return (
    <main className="archive-shell about-page">
      <SiteHeader />

      <section className="about-page-hero">
        <div>
          <p>{about.overline}</p>
          <h1>{about.title}</h1>
          <span>{about.heroLead}</span>
        </div>
        <aside aria-label="委員会の構成">
          <strong>{about.heroMarker.value}</strong>
          <span>{about.heroMarker.label}</span>
        </aside>
      </section>

      <nav className="directory-breadcrumb" aria-label="パンくずリスト">
        <a href={siteHref('/')} aria-label="ホーム">⌂</a><span aria-hidden="true">›</span><strong>{about.title}</strong>
      </nav>

      <section className="about-page-intro">
        <header><small>01 · WHO WE ARE</small><h2>研究会をつなぎ、<br />ゼミ生活を支える。</h2></header>
        <div>{about.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </section>

      <section className="about-mission" aria-labelledby="mission-title">
        <div><small>OUR MISSION</small><span>組織理念</span></div>
        <h2 id="mission-title">{about.mission}</h2>
      </section>

      <section className="about-composition" aria-labelledby="composition-title">
        <header className="about-section-heading">
          <div><small>02 · ORGANIZATION</small><h2 id="composition-title">委員会の構成</h2></div>
          <p>すべての研究会所属学生を基盤に、代表者委員会と常任委員会が連携して活動を進めます。</p>
        </header>
        <div className="about-composition-flow">
          <article className="is-president"><small>{about.composition[0].label}</small><h3>{about.composition[0].value}</h3><p>{about.composition[0].description}</p></article>
          <span className="about-flow-arrow" aria-hidden="true">↓</span>
          <div>
            {about.composition.slice(1).map((item, index) => (
              <article key={item.label}><span>{String(index + 1).padStart(2, '0')}</span><small>{item.label}</small><h3>{item.value}</h3><p>{item.description}</p></article>
            ))}
          </div>
        </div>
        <a className="about-inline-link" href={siteHref('/pages/584')}>2025年度 常任委員を見る <span aria-hidden="true">→</span></a>
      </section>

      <section className="about-activities" aria-labelledby="activities-title">
        <header className="about-section-heading is-light">
          <div><small>03 · WHAT WE DO</small><h2 id="activities-title">活動内容</h2></div>
          <p>入ゼミから研究発表、交流まで。研究会活動を支える4つの柱です。</p>
        </header>
        <div className="about-activity-grid">
          {about.activities.map((activity) => (
            <a href={siteHref(activity.href)} key={activity.number}>
              <span>{activity.number}</span><h3>{activity.title}</h3><p>{activity.description}</p><b aria-hidden="true">→</b>
            </a>
          ))}
        </div>
      </section>

      <section className="about-values">
        <article>
          <header><small>04 · PURPOSE</small><h2>委員会の意義</h2></header>
          <ol>{about.significance.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ol>
        </article>
        <article>
          <header><small>05 · CULTURE</small><h2>組織文化</h2></header>
          <div className="about-culture-list">{about.culture.map((item) => <span key={item}>{item}</span>)}</div>
        </article>
      </section>

      <section className="about-governance" aria-labelledby="governance-title">
        <header className="about-section-heading">
          <div><small>06 · GOVERNANCE</small><h2 id="governance-title">規約と財務</h2></div>
          <p>透明性のある運営のため、規約と財務報告を公開しています。</p>
        </header>
        <div>
          <a href={about.rules.url} target="_blank" rel="noreferrer"><small>RULES / PDF</small><h3>{about.rules.title}</h3><p>{about.rules.description}</p><b>PDFを開く ↗</b></a>
          <a href={siteHref(about.finance.href)}><small>FINANCIAL REPORT</small><h3>{about.finance.title}</h3><strong>{about.finance.amount}</strong><p>{about.finance.description}</p><b>財務報告資料を見る →</b></a>
        </div>
      </section>

      <section className="about-faq" aria-labelledby="faq-title">
        <header className="about-section-heading is-light">
          <div><small>07 · FAQ</small><h2 id="faq-title">よくある質問</h2></div>
          <p>委員会の構成、活動、財務、参加方法についてまとめています。</p>
        </header>
        <div>{faqs.map((faq, index) => <details key={faq.id}><summary><span>{String(index + 1).padStart(2, '0')}</span><strong>{faq.question}</strong><b aria-hidden="true">＋</b></summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <section className="about-next-links">
        <a href={siteHref('/pages/584')}><small>MEET THE TEAM</small><strong>常任委員紹介</strong><span>→</span></a>
        <a href={siteHref('/pages/707')}><small>JOIN THE COMMITTEE</small><strong>新規委員募集</strong><span>→</span></a>
      </section>

      <ArchiveFooter />
    </main>
  );
}
