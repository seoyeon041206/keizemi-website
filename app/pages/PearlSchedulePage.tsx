import schedule from '@/content/admissions/pearl-schedule.json';
import { ArchiveFooter } from '@/app/components/ContentChrome';
import { SiteHeader } from '@/app/components/SiteHeader';
import { siteHref } from '@/app/site-path';

export function PearlSchedulePage() {
  return (
    <main className="archive-shell admissions-page pearl-admissions-page">
      <SiteHeader />

      <section className="admissions-hero admissions-hero-en">
        <div><p>{schedule.overline}</p><h1>{schedule.title}</h1><span>{schedule.heroLead}</span></div>
        <b aria-hidden="true">S</b>
      </section>

      <nav className="directory-breadcrumb" aria-label="Breadcrumb">
        <a href={siteHref('/')} aria-label="Home">⌂</a><span aria-hidden="true">›</span><a href={siteHref('/pages/79')}>PEARL / DD</a><span aria-hidden="true">›</span><strong>Schedule</strong>
      </nav>

      <section className="admissions-intro">
        <div><p>ADMISSION JOURNEY</p><h2>{schedule.introTitle}</h2><span>{schedule.introduction}</span></div>
        <aside><small>PLEASE NOTE</small><p>{schedule.notice}</p></aside>
      </section>

      <ol className="admissions-timeline">
        {schedule.steps.map((step) => (
          <li key={step.number}>
            <span>{step.number}</span>
            <time>{step.date}</time>
            <div><small>SEMINAR ADMISSIONS</small><h2>{step.title}</h2><p>{step.description}</p></div>
          </li>
        ))}
      </ol>

      <nav className="admissions-next-links" aria-label="Related PEARL and Double Degree pages">
        {schedule.links.map((link, index) => <a href={siteHref(link.href)} key={link.href}><span>{String(index + 1).padStart(2, '0')}</span><strong>{link.label}</strong><b aria-hidden="true">→</b></a>)}
      </nav>

      <ArchiveFooter homeLabel="Back to home ↑" />
    </main>
  );
}
