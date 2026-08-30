import committeeJson from '@/content/committee.json';
import { ArchiveFooter } from '@/app/components/ContentChrome';
import { SiteHeader } from '@/app/components/SiteHeader';
import { siteHref } from '@/app/site-path';

type Member = { name: string; seminar?: string; message?: string };
type CommitteeGroup = {
  id: string;
  number: string;
  role: string;
  roleEn: string;
  description: string;
  featured: boolean;
  members: Member[];
};
type CommitteeContent = { year: number; introduction: string; groups: CommitteeGroup[] };

const committee = committeeJson as CommitteeContent;
const leadership = committee.groups.filter((group) => group.featured);
const teams = committee.groups.filter((group) => !group.featured);
const uniqueMembers = new Set(committee.groups.flatMap((group) => group.members.map((member) => member.name))).size;

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
        <div><p>EXECUTIVE COMMITTEE</p><h1>常任委員紹介</h1><span>経済学部のゼミ選びと研究会活動を支える、{committee.year}年度の運営メンバーです。</span></div>
        <b aria-hidden="true">委</b>
      </section>

      <nav className="directory-breadcrumb" aria-label="パンくずリスト">
        <a href={siteHref('/')} aria-label="ホーム">⌂</a><span aria-hidden="true">›</span><strong>常任委員紹介</strong>
      </nav>

      <section className="committee-intro">
        <div>
          <p>{committee.year} EXECUTIVE COMMITTEE</p>
          <h2>ゼミ選びから、<br />充実したゼミ生活まで。</h2>
          <span>{committee.introduction}</span>
        </div>
        <dl>
          <div><dt>{uniqueMembers}</dt><dd>MEMBERS</dd></div>
          <div><dt>{committee.groups.length}</dt><dd>ROLES</dd></div>
          <div><dt>{committee.year}</dt><dd>ACADEMIC YEAR</dd></div>
        </dl>
      </section>

      <nav className="committee-toc" aria-label="担当一覧">
        {committee.groups.map((group) => <a href={`#${group.id}`} key={group.id}><span>{group.number}</span>{group.role}</a>)}
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
