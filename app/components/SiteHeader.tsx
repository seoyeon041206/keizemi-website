'use client';

import { useEffect, useState } from 'react';
import { siteHref } from '@/app/site-path';

type MenuGroup = {
  key: string;
  label: string;
  labelEn: string;
  links: Array<{ label: string; href: string; note?: string }>;
};

const menuGroups: MenuGroup[] = [
  {
    key: 'committee',
    label: '委員会',
    labelEn: 'COMMITTEE',
    links: [
      { label: '委員会について', href: '/pages/71', note: '活動内容と組織について' },
      { label: '常任委員紹介', href: '/pages/584', note: '運営メンバー' },
      { label: '新規委員募集', href: '/pages/707', note: '委員会への参加案内' },
      { label: '財務報告資料', href: '/pages/77', note: '会計・財務情報' },
      { label: '関連リンク', href: '/pages/1862' },
    ],
  },
  {
    key: 'seminars',
    label: '研究会',
    labelEn: 'SEMINARS',
    links: [
      { label: '研究会を探す', href: '/#seminars', note: '教員名・分野から検索' },
      { label: '研究会（ゼミ）とは？', href: '/pages/133', note: '研究会活動の概要' },
      { label: '日本語研究会一覧', href: '/#seminars' },
      { label: 'PEARL / DD 研究会一覧', href: '/pearl-seminars' },
    ],
  },
  {
    key: 'admissions',
    label: '入ゼミ・試験',
    labelEn: 'ADMISSIONS',
    links: [
      { label: '入ゼミスケジュール・行事の流れ', href: '/pages/1058', note: '説明会から試験まで' },
      { label: '入ゼミ行事開催情報', href: '/pages/1491', note: '説明会・オープンゼミ' },
      { label: '試験情報', href: '/pages/1259', note: 'A・B・C日程' },
      { label: '配布資料', href: '/pages/139' },
      { label: '参考：過去の試験情報', href: '/pages/1150' },
    ],
  },
  {
    key: 'activities',
    label: 'ゼミ活動',
    labelEn: 'ACTIVITIES',
    links: [
      { label: '春季・秋季イベント交流会', href: '/pages/1544', note: '研究会を越えた交流' },
      { label: '三田祭論文', href: '/pages/1524', note: '論文コンクール・研究発表' },
      { label: '講演会', href: '/pages/1573', note: '学内外の講演イベント' },
    ],
  },
  {
    key: 'pearl',
    label: 'PEARL / DD',
    labelEn: 'ENGLISH',
    links: [
      { label: 'About PEARL / DD', href: '/pages/79' },
      { label: 'Seminars', href: '/pearl-seminars', note: 'English-friendly seminars' },
      { label: 'Schedule', href: '/pages/1598' },
      { label: 'Examination', href: '/pages/1611' },
      { label: 'Handout', href: '/pages/1214' },
    ],
  },
];

export function SiteHeader() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const activeGroup = menuGroups.find((group) => group.key === activeKey);

  useEffect(() => {
    if (!activeKey) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveKey(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [activeKey]);

  return (
    <header className="site-header">
      <div className="site-header-main">
        <a className="brand" href={siteHref('/')} aria-label="KEIZEMI ホーム">
          <span className="brand-mark">K</span>
          <span><strong>KEIZEMI</strong><small>慶應義塾大学 経済学部ゼミナール委員会</small></span>
        </a>
        <div className="site-header-utilities">
          <a href={siteHref('/news')}>新着情報</a>
          <a className="header-cta" href={siteHref('/pages/81')}>お問い合わせ</a>
        </div>
      </div>

      <nav className="category-nav" aria-label="主要カテゴリー">
        {menuGroups.map((group) => {
          const isActive = group.key === activeKey;
          return (
            <button
              type="button"
              className={isActive ? 'is-active' : ''}
              aria-expanded={isActive}
              aria-controls="category-panel"
              onClick={() => setActiveKey(isActive ? null : group.key)}
              key={group.key}
            >
              <span>{group.label}</span>
              <small>{group.labelEn}</small>
            </button>
          );
        })}
      </nav>

      {activeGroup && (
        <>
          <button className="category-scrim" type="button" aria-label="メニューを閉じる" onClick={() => setActiveKey(null)} />
          <section className="category-panel" id="category-panel" aria-label={`${activeGroup.label}のページ`}>
            <header>
              <div><small>{activeGroup.labelEn}</small><h2>{activeGroup.label}</h2></div>
              <button type="button" onClick={() => setActiveKey(null)} aria-label="サブメニューを閉じる">閉じる</button>
            </header>
            <div className="category-panel-links">
              {activeGroup.links.map((link) => (
                <a href={siteHref(link.href)} onClick={() => setActiveKey(null)} key={`${activeGroup.key}-${link.label}`}>
                  <span><strong>{link.label}</strong>{link.note && <small>{link.note}</small>}</span>
                  <b aria-hidden="true">→</b>
                </a>
              ))}
            </div>
          </section>
        </>
      )}
    </header>
  );
}
