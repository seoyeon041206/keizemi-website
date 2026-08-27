import type { Metadata } from 'next';
import seminarsJson from '@/content/pearl-seminars.json';
import type { PearlSeminar } from '@/app/content-types';
import { ArchiveFooter, ArchiveHeader } from '@/app/components/ContentChrome';
import { siteHref } from '@/app/site-path';

const seminars = seminarsJson as PearlSeminar[];

export const metadata: Metadata = {
  title: 'Seminars for PEARL / DD | KEIZEMI',
  description: 'English-friendly economics seminars for PEARL and Double Degree students.',
  openGraph: { images: [] },
  twitter: { images: [] },
};

export default function PearlSeminarArchive() {
  return (
    <main className="archive-shell pearl-archive">
      <ArchiveHeader />
      <section className="archive-hero">
        <p>FOR PEARL / DOUBLE DEGREE STUDENTS</p>
        <h1>Seminars for PEARL / DD</h1>
        <span>{seminars.length} seminars</span>
      </section>
      <section className="directory-list" aria-label="PEARL and Double Degree seminars">
        {seminars.map((seminar) => (
          <a className="directory-row" href={siteHref(`/pearl-seminars/${seminar.slug}`)} key={seminar.id}>
            <span>{seminar.field}</span>
            <div><h2>{seminar.name}</h2><p>{seminar.excerpt}</p></div>
            <b aria-hidden="true">→</b>
          </a>
        ))}
      </section>
      <ArchiveFooter />
    </main>
  );
}
