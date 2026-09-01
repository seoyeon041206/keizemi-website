import { siteHref } from '@/app/site-path';

export function RecruitmentNavigation({ active }: { active: 'overview' | 'entry' }) {
  return (
    <nav className="recruitment-subnav" aria-label="新規委員募集メニュー">
      <a className={active === 'overview' ? 'is-active' : ''} href={siteHref('/pages/707')}>
        <span>01</span><strong>新規委員募集</strong><small>募集概要・役職</small>
      </a>
      <a className={active === 'entry' ? 'is-active' : ''} href={siteHref('/pages/843')}>
        <span>02</span><strong>新規委員エントリー</strong><small>応募の流れ・日程</small>
      </a>
    </nav>
  );
}
