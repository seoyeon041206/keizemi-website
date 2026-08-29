import { ArchiveFooter } from '@/app/components/ContentChrome';
import { SiteHeader } from '@/app/components/SiteHeader';
import { siteHref } from '@/app/site-path';

type Handout = {
  title: string;
  href: string;
  type: string;
  audience?: string;
  note?: string;
};

type HandoutSection = {
  id: string;
  number: string;
  title: string;
  description: string;
  items: Handout[];
};

const sections: HandoutSection[] = [
  {
    id: 'orientation-1',
    number: '01',
    title: '第1回入ゼミ説明会',
    description: '入ゼミの全体像と各研究会を知るための、最初の説明会資料です。',
    items: [
      { title: '第1回入ゼミ説明会冊子2024', href: 'https://keio.box.com/s/ajbze9i7xunsktaibhp8iz79yt75okrx', type: 'BOOKLET', audience: 'AB生向け' },
      { title: '【PEARL生向け】第1回入ゼミ説明会冊子2023', href: 'https://keio.box.com/s/oj7da9kmm44grpyphfiv946xcihg29i2', type: 'BOOKLET', audience: 'PEARL生向け', note: '昨年度版' },
      { title: '全体説明会動画', href: 'https://keio.box.com/s/7od8pavffbydzzw9mfdpy15pp9ee4j1d', type: 'VIDEO', audience: '全学生向け' },
    ],
  },
  {
    id: 'orientation-2',
    number: '02',
    title: '第2回入ゼミ説明会',
    description: '研究会選びを深め、試験や面接に向けた準備を始めるための資料です。',
    items: [
      { title: '全体説明会動画', href: 'https://keio.app.box.com/file/1337592776840?s=qimelzjcwhprb1q8gp154h4d7mnjbcmg', type: 'VIDEO', audience: '全学生向け' },
      { title: '第2回入ゼミ説明会冊子2024', href: 'https://keio.box.com/s/lkq0q7c4om5d6t4dgippjct8qktoxhqh', type: 'BOOKLET', audience: 'AB・PEARL生向け' },
    ],
  },
  {
    id: 'professor-session',
    number: '03',
    title: '教授説明会',
    description: '担当教授から研究テーマやゼミの方針を直接聞くための開催資料です。',
    items: [
      { title: '教授説明会資料', href: 'https://docs.google.com/spreadsheets/d/1pjGegmMIjMyX__z3MupQ3rlqq4qiSIEPw54KjOrYyqM/edit?gid=613328077#gid=613328077', type: 'SHEET', audience: '全学生向け' },
    ],
  },
  {
    id: 'open-seminar',
    number: '04',
    title: 'オープンゼミ',
    description: '実際の研究会を見学し、活動内容や雰囲気を知るための案内資料です。',
    items: [
      { title: 'オープンゼミ資料', href: 'https://docs.google.com/spreadsheets/d/1HXC-IFIuhexlpnHYJdqgxrBFHISjvgCFSCqtocdSxqg/edit?gid=0#gid=0', type: 'SHEET', audience: '全学生向け' },
    ],
  },
  {
    id: 'orientation-3',
    number: '05',
    title: '第3回入ゼミ説明会',
    description: '出願前に確定した日程や試験情報を最終確認するための資料です。',
    items: [
      { title: '第3回入ゼミ説明会冊子2024', href: 'https://keio.box.com/s/9c68a5jhvjnzi9fyskvc39g5vp1n6weq', type: 'BOOKLET', audience: 'AB生向け' },
      { title: 'Seminar Introduction Booklet AY 2024 — Vol. 3', href: 'https://keio.box.com/s/ss299bnipcdb8ybk8g93iwwzn6qtr2v2', type: 'BOOKLET', audience: 'PEARL生向け' },
    ],
  },
  {
    id: 'examination',
    number: '06',
    title: '入ゼミ試験',
    description: 'A・B日程のエントリーシート、各研究会の試験要項、概要スライドをまとめています。',
    items: [
      { title: '（2025）A日程 経ゼミ共通ES', href: 'https://docs.google.com/document/d/1DPC9feL8uEpHNhusnEAEzrVCTgzo-6Vy/edit?usp=sharing&ouid=115177941890052427820&rtpof=true&sd=true', type: 'DOCUMENT', audience: 'AB生向け' },
      { title: '（2025）A日程 経ゼミ共通ES', href: 'https://docs.google.com/document/d/1163bg-M2sEZriTJ4yFhh6_Bx8Bo5py2M/edit?usp=sharing&ouid=115177941890052427820&rtpof=true&sd=true', type: 'DOCUMENT', audience: 'PEARL生向け' },
      { title: '（2025）A日程 各ゼミ試験要項', href: 'https://docs.google.com/spreadsheets/d/197uzY2SK3JqQASkhfHckXwSI8wHJLQr2Yzi9UX_IXZw/edit?usp=sharing', type: 'SHEET', audience: 'AB・PEARL生向け' },
      { title: '（2025）入ゼミA日程 試験概要スライド', href: 'https://docs.google.com/presentation/d/1TX-Dy88Lq_j17Z53IwRgH3Xwd36wi6zOaAcDVdrbph8/edit?usp=sharing', type: 'SLIDES', audience: 'AB生向け' },
      { title: 'Seminar Entrance Exam A Details', href: 'https://docs.google.com/presentation/d/1Y175_45uyR2EMQ-zVpd1YCmFM4l-Suk-AxiX_wurcqQ/edit?usp=sharing', type: 'SLIDES', audience: 'PEARL生向け' },
      { title: '（2025）B日程 経ゼミ共通ES', href: 'https://docs.google.com/document/d/1kA2nHjerf2rL-KPHxTL9S5gVtM7OXBm5/edit?usp=sharing&ouid=117028825292232999654&rtpof=true&sd=true', type: 'DOCUMENT', audience: 'AB生向け' },
      { title: '（2025）B日程 経ゼミ共通ES', href: 'https://docs.google.com/document/d/1QSgBW4e6c2S3XpC68MfHOLkLv9JnRMhg/edit?usp=sharing&ouid=115177941890052427820&rtpof=true&sd=true', type: 'DOCUMENT', audience: 'PEARL生向け' },
      { title: '（2025）入ゼミB日程 試験概要スライド', href: 'https://docs.google.com/presentation/d/1TBFtNjlEnX1EEbB0ByQRQ7LZ6gJD9zCkDpTcTOsCSuo/edit?usp=sharing', type: 'SLIDES', audience: 'AB生向け' },
      { title: '（2025）B日程 各ゼミ試験要項', href: 'https://docs.google.com/spreadsheets/d/10EXTjPMuJEDOWtEml9WpDAFJ3mmSkqsYyKYSJ960AV8/edit?gid=1688324269#gid=1688324269', type: 'SHEET', audience: 'AB・PEARL生向け' },
      { title: 'Seminar Entrance Exam B Details', href: 'https://docs.google.com/presentation/d/1B4VmbssbexAjhvHDogn4ltbPpJUNeKsUS3qBz1a9M6E/edit?usp=sharing', type: 'SLIDES', audience: 'PEARL生向け' },
      { title: 'よくある質問（2024年度版）', href: 'https://docs.google.com/document/d/1DncthBhqYQyRwGNLfxHKFIA9DPD7MPysV-KPBTzLgCc/edit?usp=sharing', type: 'FAQ', audience: '全学生向け', note: '最新情報は委員会へお問い合わせください' },
    ],
  },
];

export function HandoutPage() {
  const total = sections.reduce((sum, section) => sum + section.items.length, 0);
  return (
    <main className="archive-shell handout-page">
      <SiteHeader />

      <section className="handout-hero">
        <div><p>ADMISSION MATERIALS</p><h1>配布資料</h1><span>入ゼミ説明会・試験に関する資料を、行事ごとにまとめています。</span></div>
        <b aria-hidden="true">資</b>
      </section>

      <nav className="directory-breadcrumb" aria-label="パンくずリスト">
        <a href={siteHref('/')} aria-label="ホーム">⌂</a><span aria-hidden="true">›</span><strong>配布資料</strong>
      </nav>

      <section className="handout-intro">
        <div>
          <p className="handout-overline">FOR THE CLASS OF 2027</p>
          <h2>27卒向け<br />入ゼミ関連配布資料</h2>
          <p>経済学部ゼミナール委員会による入ゼミ配布資料を紹介します。説明会冊子、動画、試験要項などを行事ごとに確認できます。</p>
          <div className="handout-count"><strong>{total}</strong><span>掲載資料</span></div>
        </div>
        <aside>
          <small>閲覧前にご確認ください</small>
          <h3>keio.jp認証について</h3>
          <p>一部資料はkeio.jpの認証が必要です。閲覧期限が過ぎている資料は開けない場合があります。</p>
          <span>資料は詳細が決まり次第、随時更新します。</span>
        </aside>
      </section>

      <nav className="handout-toc" aria-label="資料カテゴリー">
        <p>CONTENTS</p>
        <div>{sections.map((section) => <a href={`#${section.id}`} key={section.id}><span>{section.number}</span>{section.title}</a>)}</div>
      </nav>

      <section className="handout-sections">
        {sections.map((section) => (
          <section className="handout-section" id={section.id} key={section.id}>
            <header>
              <span>{section.number}</span>
              <div><small>ADMISSION HANDOUTS</small><h2>{section.title}</h2><p>{section.description}</p></div>
              <b>{section.items.length}点</b>
            </header>
            <div className="handout-grid">
              {section.items.map((item, index) => (
                <a className="handout-card" href={item.href} target="_blank" rel="noreferrer" key={`${section.id}-${index}`}>
                  <div className="handout-card-visual"><span>{item.type}</span><small>KEIZEMI<br />ADMISSIONS</small></div>
                  <div className="handout-card-body">
                    <div><span>{item.type}</span>{item.audience && <small>{item.audience}</small>}</div>
                    <h3>{item.title}</h3>
                    {item.note && <p>{item.note}</p>}
                    <footer><span>資料を開く</span><b aria-hidden="true">↗</b></footer>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </section>

      <ArchiveFooter />
    </main>
  );
}
