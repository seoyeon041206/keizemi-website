'use client';

import { useMemo, useState } from 'react';
import siteIndex from '@/content/site-index.json';
import { siteHref } from '@/app/site-path';
import { SiteHeader } from '@/app/components/SiteHeader';

type Seminar = {
  id: number;
  slug: string;
  name: string;
  field: string;
  pearl: boolean;
  dd: boolean;
  status: string;
  excerpt: string;
};

const seminars = siteIndex.seminars as Seminar[];
const notices = siteIndex.posts.slice(0, 4);

const timeline = [
  ['6月下旬', '第1回入ゼミ説明会', 'ゼミの全体像と年間スケジュールを把握'],
  ['10月ごろ', '第2回入ゼミ説明会', '試験・面接・成績など選考形式を確認'],
  ['11月中旬', '三田祭論文発表', '研究内容と各ゼミの雰囲気を知る'],
  ['11–12月', '教授説明会', '担当教授から研究テーマと方針を聞く'],
  ['11–12月', 'オープンゼミ', '三田で実際のゼミ活動を体験'],
  ['1月中旬', '第3回入ゼミ説明会', '確定した日程と試験情報を最終確認'],
  ['2月中旬', '日程本登録', '希望日程へ期限内に登録'],
  ['3月以降', '試験・結果発表', 'A・B・C日程の試験と結果発表'],
];

const fields = Array.from(new Set(seminars.map((seminar) => seminar.field)));

export default function Home() {
  const [query, setQuery] = useState('');
  const [field, setField] = useState('すべて');
  const [pearlOnly, setPearlOnly] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const visibleSeminars = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('ja');
    return seminars.filter((seminar) => {
      const matchesQuery = !normalized || `${seminar.name}${seminar.field}`.toLocaleLowerCase('ja').includes(normalized);
      const matchesField = field === 'すべて' || seminar.field === field;
      return matchesQuery && matchesField && (!pearlOnly || seminar.pearl);
    });
  }, [field, pearlOnly, query]);

  const displayedSeminars = showAll ? visibleSeminars : visibleSeminars.slice(0, 12);

  return (
    <main id="top">
      <SiteHeader />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">KEIO ECONOMICS SEMINAR COMMITTEE</p>
          <h1>ゼミ選びから、<br /><em>ゼミ生活のその先へ。</em></h1>
          <p className="hero-lead">経済学部の研究会情報、入ゼミ試験、説明会や交流イベントを、必要なときにすぐ見つけられる場所。</p>
          <div className="hero-actions"><a className="button primary" href="#seminars">研究会を探す</a><a className="button secondary" href="#schedule">入ゼミの流れを見る</a></div>
        </div>
        <aside className="hero-panel" aria-label="次の入ゼミステップ">
          <div className="panel-topline"><span>2026 ADMISSIONS</span><span className="status-dot">最新情報</span></div>
          <p className="panel-kicker">NEXT STEP</p><h2>第1回 入ゼミ説明会</h2>
          <p>ゼミの全体像と年間スケジュールを知る、最初のガイダンスです。</p>
          <a href={siteHref(`/news/${notices[0].id}`)}>開催情報を確認 <span aria-hidden="true">→</span></a><div className="panel-number">01</div>
        </aside>
      </section>

      <section className="news-strip" id="news" aria-labelledby="news-title">
        <div className="section-label"><p>NEWS &amp; UPDATES</p><h2 id="news-title">新着情報</h2><a className="text-link" href={siteHref('/news')}>一覧を見る →</a></div>
        <div className="notice-list">
          {notices.map((notice) => (
            <a className="notice" href={siteHref(`/news/${notice.id}`)} key={notice.id}>
              <time>{notice.date.replaceAll('-', '.')}</time><span className="notice-category">{notice.categories[0] ?? 'お知らせ'}</span><strong>{notice.title}</strong><span className="arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-lead">
          <div className="section-label light"><p>ABOUT THE COMMITTEE</p><h2>すべての研究会を、<br />ひとつにつなぐ。</h2></div>
          <p>経済学部ゼミナール委員会は、各研究会に所属する学生全員で構成される学生団体です。研究会間の親睦を図り、学生のゼミ選びと豊かな研究生活を支えます。</p>
          <a className="button outline-light" href={siteHref('/pages/71')}>委員会について詳しく</a>
        </div>
        <div className="about-grid">
          <article><span>01</span><h3>入ゼミ支援</h3><p>説明会、資料作成、オープンゼミ、試験運営</p></article>
          <article><span>02</span><h3>研究発信</h3><p>三田祭論文コンクールと研究発表の運営</p></article>
          <article><span>03</span><h3>講演会</h3><p>学内外の知見に触れる各種講演会の企画</p></article>
          <article><span>04</span><h3>ゼミ交流</h3><p>球技大会など、研究会を越えた交流機会</p></article>
        </div>
      </section>

      <section className="seminar-section" id="seminars" aria-labelledby="seminar-title">
        <div className="section-heading-row">
          <div className="section-label"><p>SEMINAR DIRECTORY</p><h2 id="seminar-title">研究会を探す</h2></div>
          <p>分野・教員名・PEARL対応から、現在掲載されている研究会を絞り込めます。</p>
        </div>
        <div className="seminar-toolbar">
          <label className="search-box"><span>教員名・分野</span><input value={query} onChange={(event) => { setQuery(event.target.value); setShowAll(false); }} placeholder="例：国際経済、笹原" /></label>
          <label className="field-select"><span>研究分野</span><select value={field} onChange={(event) => { setField(event.target.value); setShowAll(false); }}><option>すべて</option>{fields.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="check-filter"><input type="checkbox" checked={pearlOnly} onChange={(event) => { setPearlOnly(event.target.checked); setShowAll(false); }} /><span aria-hidden="true" />PEARL受入あり</label>
        </div>
        <div className="results-line"><strong>{visibleSeminars.length}</strong><span>件の研究会</span><span className="legend">P：PEARL対応　DD：Double Degree対応</span></div>
        <div className="seminar-grid">
          {displayedSeminars.map((seminar) => (
            <a className={`seminar-card ${seminar.status === '募集停止' ? 'is-paused' : ''}`} href={siteHref(`/seminars/${seminar.slug}`)} key={seminar.id}>
              <div className="card-meta"><span>{seminar.field}</span><span className={`recruit-status ${seminar.status === '新規募集' ? 'is-new' : ''}`}>{seminar.status}</span></div>
              <h3>{seminar.name.includes('：') ? seminar.name : `${seminar.name}研究会`}</h3>
              <div className="tag-row">{seminar.pearl && <span>P</span>}{seminar.dd && <span>DD</span>}{!seminar.pearl && !seminar.dd && <span>JP</span>}</div>
            </a>
          ))}
        </div>
        {visibleSeminars.length === 0 && <p className="empty-state">条件に合う研究会がありません。検索条件を変えてお試しください。</p>}
        {visibleSeminars.length > 12 && <button className="load-more" type="button" onClick={() => setShowAll(!showAll)}>{showAll ? '表示を少なくする' : `残り ${visibleSeminars.length - 12} 件を表示`}</button>}
      </section>

      <section className="schedule-section" id="schedule" aria-labelledby="schedule-title">
        <div className="schedule-intro">
          <div className="section-label light"><p>ADMISSION TIMELINE</p><h2 id="schedule-title">入ゼミまでの流れ</h2></div>
          <p>最初の説明会から試験・結果発表まで、およそ半年。節目ごとに情報を集め、自分に合う研究会を見つけましょう。</p>
          <div className="schedule-links"><a href={siteHref('/pages/1491')}>開催情報 →</a><a href={siteHref('/pages/139')}>配布資料 →</a><a href={siteHref('/pages/1259')}>試験情報 →</a></div>
        </div>
        <ol className="timeline">
          {timeline.map(([date, title, description], index) => <li key={title}><span className="timeline-index">{String(index + 1).padStart(2, '0')}</span><time>{date}</time><div><h3>{title}</h3><p>{description}</p></div></li>)}
        </ol>
      </section>

      <section className="pearl-section" id="pearl">
        <div className="pearl-monogram" aria-hidden="true">P</div>
        <div className="pearl-copy"><p className="eyebrow">FOR PEARL / DOUBLE DEGREE STUDENTS</p><h2>Discover your Zemi.</h2><p>A Zemi is a highly focused learning environment with close support from a professor specializing in a specific field. Find English-friendly seminars, schedules, examinations, and handouts in one place.</p><a className="button primary" href={siteHref('/pages/79')}>Explore PEARL / DD</a></div>
        <div className="pearl-links"><a href={siteHref('/pearl-seminars')}><span>01</span>Seminars for PEARL / DD <b>→</b></a><a href={siteHref('/pages/1598')}><span>02</span>Schedule <b>→</b></a><a href={siteHref('/pages/1611')}><span>03</span>Examination <b>→</b></a><a href={siteHref('/pages/1214')}><span>04</span>Handout <b>→</b></a></div>
      </section>

      <section className="contact-section" id="contact">
        <div><p className="eyebrow">CONTACT US</p><h2>迷ったときは、<br />気軽にご相談ください。</h2><p>委員会全体、入ゼミ、各種活動についての質問を受け付けています。お問い合わせフォームまたはメール、SNSからご連絡ください。</p></div>
        <div className="contact-actions"><a className="contact-main" href="https://docs.google.com/forms/d/e/1FAIpQLScdVh_QScZIG3SWpgjAp8FG7ieQEtivqDAQDGEv1oGKKs-LFg/viewform?usp=header" target="_blank" rel="noreferrer"><span>お問い合わせフォーム</span><b>↗</b></a><a href="mailto:keioeconomicscomittee@gmail.com"><small>委員会全体</small>keioeconomicscomittee@gmail.com</a><a href="mailto:keio.econ.nyuzemi@gmail.com"><small>入ゼミについて</small>keio.econ.nyuzemi@gmail.com</a></div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand"><span className="brand-mark">K</span><div><strong>KEIZEMI</strong><p>慶應義塾大学 経済学部ゼミナール委員会</p></div></div>
        <nav aria-label="フッターナビゲーション"><a href="#about">委員会</a><a href="#seminars">研究会</a><a href="#schedule">試験・行事</a><a href="#pearl">PEARL / DD</a></nav>
        <div className="social-links"><a href="https://x.com/keizemi_offical" target="_blank" rel="noreferrer">X ↗</a><a href="https://www.instagram.com/keizemi_official/" target="_blank" rel="noreferrer">Instagram ↗</a></div>
        <p className="copyright">© 慶應義塾大学 経済学部ゼミナール委員会</p><a className="back-top" href="#top">PAGE TOP ↑</a>
      </footer>
    </main>
  );
}
