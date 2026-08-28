'use client';

import { useMemo, useState } from 'react';
import { ArchiveFooter } from '@/app/components/ContentChrome';
import { SiteHeader } from '@/app/components/SiteHeader';
import { siteHref } from '@/app/site-path';

export type PearlDirectorySeminar = {
  id: number;
  slug: string;
  name: string;
  field: string;
  excerpt: string;
  status: 'Recruiting' | 'Newly recruiting' | 'Recruitment closed';
  pearl: boolean;
  dd: boolean;
};

type StatusTab = 'All' | 'Newly recruiting' | 'Recruitment closed';
type Programme = 'All programmes' | 'PEARL' | 'Double Degree';

const fieldOrder = [
  { code: 'A', label: 'Economic Theory' },
  { code: 'B', label: 'Econometrics and Statistics' },
  { code: 'C', label: 'History of Economic Thought' },
  { code: 'D', label: 'Economic History' },
  { code: 'E', label: 'Labor and Industrial Economics' },
  { code: 'F', label: 'Economic Policy and Public Finance' },
  { code: 'G', label: 'Modern Economic Systems' },
  { code: 'H', label: 'International Economics' },
  { code: 'I', label: 'Environmental and Urban Economics' },
  { code: 'J', label: 'Economy and Society' },
  { code: 'OTHERS', label: 'Others' },
] as const;

const tabs: Array<{ value: StatusTab; label: string }> = [
  { value: 'All', label: 'All seminars' },
  { value: 'Newly recruiting', label: 'Newly recruiting' },
  { value: 'Recruitment closed', label: 'Recruitment closed' },
];

export function PearlSeminarDirectory({ seminars }: { seminars: PearlDirectorySeminar[] }) {
  const [query, setQuery] = useState('');
  const [field, setField] = useState('All fields');
  const [status, setStatus] = useState<StatusTab>('All');
  const [programme, setProgramme] = useState<Programme>('All programmes');

  const visibleSeminars = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('en');
    return seminars.filter((seminar) => {
      const matchesQuery = !normalizedQuery || `${seminar.name} ${seminar.field} ${seminar.excerpt}`.toLocaleLowerCase('en').includes(normalizedQuery);
      const matchesField = field === 'All fields' || seminar.field === field;
      const matchesStatus = status === 'All' || seminar.status === status;
      const matchesProgramme = programme === 'All programmes' || (programme === 'PEARL' ? seminar.pearl : seminar.dd);
      return matchesQuery && matchesField && matchesStatus && matchesProgramme;
    });
  }, [field, programme, query, seminars, status]);

  const groupedSeminars = fieldOrder
    .map((fieldItem) => ({ ...fieldItem, seminars: visibleSeminars.filter((seminar) => seminar.field === fieldItem.label) }))
    .filter((group) => group.seminars.length > 0);

  return (
    <main className="archive-shell seminar-directory-page pearl-directory-page">
      <SiteHeader />

      <section className="seminar-directory-hero pearl-directory-hero">
        <div>
          <p>FOR PEARL / DOUBLE DEGREE STUDENTS</p>
          <h1>Seminars for PEARL / DD</h1>
          <span>Find an English-friendly seminar by academic field, recruitment status, or programme.</span>
        </div>
        <b aria-hidden="true">P</b>
      </section>

      <nav className="directory-breadcrumb" aria-label="Breadcrumb">
        <a href={siteHref('/')} aria-label="Home">⌂</a>
        <span aria-hidden="true">›</span>
        <strong>Seminars for PEARL / DD</strong>
      </nav>

      <section className="directory-controls" aria-label="Seminar filters">
        <div className="directory-tabs pearl-directory-tabs" role="tablist" aria-label="Recruitment status">
          {tabs.map((tab) => (
            <button type="button" role="tab" aria-selected={status === tab.value} className={status === tab.value ? 'is-active' : ''} onClick={() => setStatus(tab.value)} key={tab.value}>
              <span>{tab.label}</span>
              <small>{tab.value === 'All' ? seminars.length : seminars.filter((seminar) => seminar.status === tab.value).length}</small>
            </button>
          ))}
        </div>

        <div className="directory-filter-panel">
          <label className="directory-search">
            <span>PROFESSOR OR KEYWORD</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. international economics" />
          </label>
          <label className="directory-field-select">
            <span>ACADEMIC FIELD</span>
            <select value={field} onChange={(event) => setField(event.target.value)}>
              <option>All fields</option>
              {fieldOrder.map((item) => <option key={item.code}>{item.label}</option>)}
            </select>
          </label>
          <label className="directory-field-select pearl-programme-select">
            <span>PROGRAMME</span>
            <select value={programme} onChange={(event) => setProgramme(event.target.value as Programme)}>
              <option>All programmes</option>
              <option>PEARL</option>
              <option>Double Degree</option>
            </select>
          </label>
        </div>

        <div className="directory-result-summary">
          <p><strong>{visibleSeminars.length}</strong> seminars</p>
          <p><b>(P)</b> PEARL students accepted　<b>(DD)</b> Double Degree students accepted</p>
        </div>
      </section>

      <section className="field-directory" aria-live="polite">
        {groupedSeminars.map((group) => (
          <section className="field-group" key={group.label}>
            <header>
              <div><small>{group.code === 'OTHERS' ? 'OTHERS · PCP / IRP' : `FIELD ${group.code}`}</small><h2>{group.label}</h2></div>
              <span>{group.seminars.length} seminars</span>
            </header>
            <div className="field-seminar-grid">
              {group.seminars.map((seminar) => (
                <a className={`directory-seminar-card ${seminar.status === 'Recruitment closed' ? 'is-paused' : ''}`} href={siteHref(`/pearl-seminars/${seminar.slug}`)} key={seminar.id}>
                  <div className="directory-card-topline"><span>{seminar.status}</span><small>{seminar.pearl && 'P'}{seminar.pearl && seminar.dd && ' · '}{seminar.dd && 'DD'}</small></div>
                  <div className="directory-card-mark" aria-hidden="true">{seminar.name.slice(0, 1)}</div>
                  <h3>{seminar.name}</h3>
                  <p>{seminar.excerpt || `An English-friendly seminar in ${group.label}.`}</p>
                  <div className="directory-card-footer"><span>View details</span><b aria-hidden="true">→</b></div>
                </a>
              ))}
            </div>
          </section>
        ))}
        {visibleSeminars.length === 0 && (
          <div className="directory-empty">
            <strong>No seminars match these filters</strong>
            <p>Try changing the keyword or one of the filter options.</p>
            <button type="button" onClick={() => { setQuery(''); setField('All fields'); setStatus('All'); setProgramme('All programmes'); }}>Reset filters</button>
          </div>
        )}
      </section>

      <ArchiveFooter homeLabel="Back to home ↑" />
    </main>
  );
}
