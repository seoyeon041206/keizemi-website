import { ArchiveFooter } from '@/app/components/ContentChrome';
import { SiteHeader } from '@/app/components/SiteHeader';
import { siteHref } from '@/app/site-path';

type Member = {
  name: string;
  seminar?: string;
  message?: string;
};

type CommitteeGroup = {
  id: string;
  number: string;
  role: string;
  roleEn: string;
  description: string;
  members: Member[];
};

const leadership: CommitteeGroup[] = [
  {
    id: 'chairperson',
    number: '01',
    role: '委員長',
    roleEn: 'CHAIRPERSON',
    description: '委員会全体を統括し、各研究会とともにゼミ活動の発展を目指します。',
    members: [{ name: '中根 琉翔', seminar: '清田耕造研究会', message: '経済学部ゼミナール委員会委員長を務めさせていただきます、中根琉翔と申します。長である責任を当然果たしながらも、ゼミ生全員でゼミ活動をより発展させていきたいと思っておりますので、お力添えのほどよろしくお願いします。1年間よろしくお願いいたします。' }],
  },
  {
    id: 'vice-chairperson',
    number: '02',
    role: '副委員長',
    roleEn: 'VICE CHAIRPERSON',
    description: '委員長を支え、学生が納得できるゼミ選びと活動環境づくりに取り組みます。',
    members: [{ name: '中井 久美香', seminar: '小林慶一郎研究会', message: '他の委員の皆さんと協力しながら、学生の皆さんが納得のいくゼミ選びと充実したゼミ活動を行えるよう、環境づくりに尽力してまいります。1年間どうぞよろしくお願いいたします。' }],
  },
  {
    id: 'finance',
    number: '03',
    role: '財務',
    roleEn: 'FINANCE',
    description: '委員会と各研究会の活動が円滑に進むよう、財務面から運営を支えます。',
    members: [{ name: '中根 琉翔', seminar: '清田耕造研究会', message: 'ゼミ活動が滞りなく回るよう、一生懸命頑張ります。' }],
  },
];

const teams: CommitteeGroup[] = [
  {
    id: 'admissions',
    number: '04',
    role: '入ゼミ担当',
    roleEn: 'ADMISSIONS',
    description: '説明会・オープンゼミ・試験情報を通じて、後悔のないゼミ選びを支援します。',
    members: [
      { name: '田邉 志織', seminar: '白塚重典研究会', message: '2年生の皆さんが納得できるゼミ選びをできるよう頑張ります！' },
      { name: '渡邉 希美', seminar: '大平哲研究会', message: '皆さんの後悔のないゼミ選びをサポートします！' },
      { name: '吉澤 鴻', seminar: '小西祥文研究会', message: '2年生の皆さんがより良いゼミを見つけられるよう精一杯努めますので、どうぞよろしくお願いいたします。' },
    ],
  },
  {
    id: 'planning',
    number: '05',
    role: '三田祭・企画担当',
    roleEn: 'MITASAI & EVENTS',
    description: 'ゼミ対抗企画や三田祭を通じて、研究会を越えた交流と発表の機会をつくります。',
    members: [
      { name: '曽布川 大翔', seminar: '星野崇宏研究会', message: '経済学部生だけで集まるゼミというコミュニティが、楽しい活動でありますように。' },
      { name: '田村 優里', seminar: '土居丈朗研究会', message: '三田での学生生活が楽しいものになるよう、ゼミ対抗の大会や三田祭を通して積極的にサポートしていきます！' },
      { name: '小林 芽莉', seminar: '一上響研究会', message: '皆さんが楽しめる企画ができるように頑張ります！' },
      { name: '小赤澤 維吹', seminar: '河端瑞貴研究会', message: '研究会が一丸となって、全力で打ち込める企画を提供することを目標にしております。' },
    ],
  },
  {
    id: 'communications',
    number: '06',
    role: 'IT・広報担当',
    roleEn: 'IT & COMMUNICATIONS',
    description: 'WebサイトとSNSを通じて、必要な情報を分かりやすく迅速に届けます。',
    members: [
      { name: '小倉 にな', message: '2年生の皆様の三田での活動が少しでも楽しいものになるように、迅速な情報提供を心がけます！' },
      { name: '後藤 一斗' },
    ],
  },
  {
    id: 'pearl',
    number: '07',
    role: 'PEARL担当',
    roleEn: 'PEARL / DOUBLE DEGREE',
    description: 'PEARL生とDouble Degree生へ、ゼミ選びに必要な情報と参加機会を届けます。',
    members: [
      { name: 'キム・ソヨン', seminar: '笹原彰研究会', message: 'PEARL生が自分に合ったゼミを見つけて、楽しく参加できるよう頑張ります！' },
      { name: '中井 久美香', seminar: '小林慶一郎研究会', message: 'PEARL生およびダブルディグリー生の皆様にも、必要な情報が確実に届くよう、誠実に取り組んでまいります。1年間よろしくお願いいたします！' },
    ],
  },
];

const uniqueMembers = new Set([...leadership, ...teams].flatMap((group) => group.members.map((member) => member.name))).size;

function MemberCard({ member, featured = false }: { member: Member; featured?: boolean }) {
  return (
    <article className={`committee-member-card ${featured ? 'is-featured' : ''}`}>
      <div className="committee-member-mark" aria-hidden="true">{member.name.replaceAll(' ', '').slice(0, 1)}</div>
      <div className="committee-member-copy">
        <h3>{member.name}</h3>
        {member.seminar && <p>{member.seminar}</p>}
        {member.message && <blockquote>{member.message}</blockquote>}
      </div>
    </article>
  );
}

export function CommitteePage() {
  return (
    <main className="archive-shell committee-page">
      <SiteHeader />

      <section className="committee-hero">
        <div><p>EXECUTIVE COMMITTEE</p><h1>常任委員紹介</h1><span>経済学部のゼミ選びと研究会活動を支える、2025年度の運営メンバーです。</span></div>
        <b aria-hidden="true">委</b>
      </section>

      <nav className="directory-breadcrumb" aria-label="パンくずリスト">
        <a href={siteHref('/')} aria-label="ホーム">⌂</a><span aria-hidden="true">›</span><strong>常任委員紹介</strong>
      </nav>

      <section className="committee-intro">
        <div>
          <p>2025 EXECUTIVE COMMITTEE</p>
          <h2>ゼミ選びから、<br />充実したゼミ生活まで。</h2>
          <span>常任委員は、入ゼミ支援、三田祭・交流企画、情報発信、PEARL対応、財務など、委員会の実務を担当しています。</span>
        </div>
        <dl>
          <div><dt>{uniqueMembers}</dt><dd>MEMBERS</dd></div>
          <div><dt>{leadership.length + teams.length}</dt><dd>ROLES</dd></div>
          <div><dt>2025</dt><dd>ACADEMIC YEAR</dd></div>
        </dl>
      </section>

      <nav className="committee-toc" aria-label="担当一覧">
        {[...leadership, ...teams].map((group) => <a href={`#${group.id}`} key={group.id}><span>{group.number}</span>{group.role}</a>)}
      </nav>

      <section className="committee-leadership" aria-label="委員長・副委員長・財務">
        {leadership.map((group) => (
          <section id={group.id} key={group.id}>
            <header><small>{group.roleEn}</small><h2>{group.role}</h2><p>{group.description}</p></header>
            <MemberCard member={group.members[0]} featured />
          </section>
        ))}
      </section>

      <section className="committee-teams">
        {teams.map((group) => (
          <section className="committee-team" id={group.id} key={group.id}>
            <header>
              <span>{group.number}</span>
              <div><small>{group.roleEn}</small><h2>{group.role}</h2><p>{group.description}</p></div>
              <b>{group.members.length}名</b>
            </header>
            <div className="committee-member-grid">{group.members.map((member) => <MemberCard member={member} key={member.name} />)}</div>
          </section>
        ))}
      </section>

      <section className="committee-contact">
        <div><small>WORK WITH US</small><h2>常任委員として、<br />経ゼミを支える。</h2></div>
        <p>委員会の活動や新規委員募集については、募集案内をご確認ください。</p>
        <a href={siteHref('/pages/707')}>新規委員募集を見る <span aria-hidden="true">→</span></a>
      </section>

      <ArchiveFooter />
    </main>
  );
}
