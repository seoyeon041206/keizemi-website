'use client';

import { useMemo, useState } from 'react';
import siteIndex from '@/content/generated/site-index.json';
import { ArchiveFooter } from '@/app/components/ContentChrome';
import { SiteHeader } from '@/app/components/SiteHeader';
import { siteHref } from '@/app/site-path';

type Seminar = {
  id: number;
  slug: string;
  name: string;
  field: string;
  status: string;
  pearl: boolean;
  dd: boolean;
  excerpt: string;
};

type StatusTab = 'すべて' | '新規募集' | '募集停止';

const seminars = siteIndex.seminars as Seminar[];
const fieldOrder = [
  { code: 'A', label: '経済理論' },
  { code: 'B', label: '計量・統計' },
  { code: 'C', label: '学史・思想史' },
  { code: 'D', label: '経済史' },
  { code: 'E', label: '産業・労働' },
  { code: 'F', label: '制度・政策' },
  { code: 'G', label: '現代経済' },
  { code: 'H', label: '国際経済' },
  { code: 'I', label: '環境関連' },
  { code: 'J', label: '社会関連' },
  { code: 'OTHERS', label: 'その他' },
] as const;
const fields = fieldOrder.map((item) => item.label);
const tabs: Array<{ value: StatusTab; label: string }> = [
  { value: 'すべて', label: '研究会一覧' },
  { value: '新規募集', label: '新規募集' },
  { value: '募集停止', label: '募集停止' },
];

export function SeminarDirectory() {
  const [query, setQuery] = useState('');
  const [field, setField] = useState('すべて');
  const [status, setStatus] = useState<StatusTab>('すべて');
  const [pearlOnly, setPearlOnly] = useState(false);

  const visibleSeminars = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('ja');
    return seminars.filter((seminar) => {
      const matchesQuery = !normalizedQuery || `${seminar.name} ${seminar.field} ${seminar.excerpt}`.toLocaleLowerCase('ja').includes(normalizedQuery);
      const matchesField = field === 'すべて' || seminar.field === field;
      const matchesStatus = status === 'すべて' || seminar.status === status;
      return matchesQuery && matchesField && matchesStatus && (!pearlOnly || seminar.pearl);
    });
  }, [field, pearlOnly, query, status]);

  const groupedSeminars = fieldOrder
    .map((fieldItem) => ({ ...fieldItem, seminars: visibleSeminars.filter((seminar) => seminar.field === fieldItem.label) }))
    .filter((group) => group.seminars.length > 0);

  return (
    <main className="archive-shell seminar-directory-page">
      <SiteHeader />

      <section className="seminar-directory-hero">
        <div>
          <p>SEMINAR DIRECTORY</p>
          <h1>研究会一覧</h1>
          <span>自分の関心に合う研究会を、分野や募集状況から探せます。</span>
        </div>
        <b aria-hidden="true">研</b>
      </section>

      <nav className="directory-breadcrumb" aria-label="パンくずリスト">
        <a href={siteHref('/')} aria-label="ホーム">⌂</a>
        <span aria-hidden="true">›</span>
        <strong>研究会一覧</strong>
      </nav>

      <section className="directory-controls" aria-label="研究会の絞り込み">
        <div className="directory-tabs" role="tablist" aria-label="募集状況">
          {tabs.map((tab) => (
            <button
              type="button"
              role="tab"
              aria-selected={status === tab.value}
              className={status === tab.value ? 'is-active' : ''}
              onClick={() => setStatus(tab.value)}
              key={tab.value}
            >
              <span>{tab.label}</span>
              <small>{tab.value === 'すべて' ? seminars.length : seminars.filter((seminar) => seminar.status === tab.value).length}</small>
            </button>
          ))}
        </div>

        <div className="directory-filter-panel">
          <label className="directory-search">
            <span>教員名・キーワード</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="例：国際経済、佐藤" />
          </label>
          <label className="directory-field-select">
            <span>研究分野</span>
            <select value={field} onChange={(event) => setField(event.target.value)}>
              <option>すべて</option>
              {fields.map((fieldName) => <option key={fieldName}>{fieldName}</option>)}
            </select>
          </label>
          <label className="directory-pearl-filter">
            <input type="checkbox" checked={pearlOnly} onChange={(event) => setPearlOnly(event.target.checked)} />
            <span aria-hidden="true" />
            PEARL生受け入れあり
          </label>
        </div>

        <div className="directory-result-summary">
          <p><strong>{visibleSeminars.length}</strong> 件の研究会</p>
          <p><b>（P）</b> PEARL生受け入れあり　<b>（DD）</b> Double Degree生受け入れあり</p>
        </div>
      </section>

      <section className="field-directory" aria-live="polite">
        {groupedSeminars.map((group) => (
          <section className="field-group" key={group.label}>
            <header>
              <div><small>{group.code === 'OTHERS' ? 'OTHERS · PCP / IRP' : `FIELD ${group.code}`}</small><h2>{group.label}</h2></div>
              <span>{group.seminars.length} 件</span>
            </header>
            <div className="field-seminar-grid">
              {group.seminars.map((seminar) => (
                <a className={`directory-seminar-card ${seminar.status === '募集停止' ? 'is-paused' : ''}`} href={siteHref(`/seminars/${seminar.slug}`)} key={seminar.id}>
                  <div className="directory-card-topline">
                    <span>{seminar.status}</span>
                    <small>{seminar.pearl && 'P'}{seminar.pearl && seminar.dd && ' · '}{seminar.dd && 'DD'}{!seminar.pearl && !seminar.dd && 'JP'}</small>
                  </div>
                  <div className="directory-card-mark" aria-hidden="true">{seminar.name.slice(0, 1)}</div>
                  <h3>{seminar.name}</h3>
                  <p>{seminar.excerpt || `${group.label}分野の研究会です。`}</p>
                  <div className="directory-card-footer"><span>詳細を見る</span><b aria-hidden="true">→</b></div>
                </a>
              ))}
            </div>
          </section>
        ))}
        {visibleSeminars.length === 0 && (
          <div className="directory-empty">
            <strong>該当する研究会がありません</strong>
            <p>キーワードや絞り込み条件を変えてお試しください。</p>
            <button type="button" onClick={() => { setQuery(''); setField('すべて'); setStatus('すべて'); setPearlOnly(false); }}>条件をリセット</button>
          </div>
        )}
      </section>

      <ArchiveFooter />
    </main>
  );
}
