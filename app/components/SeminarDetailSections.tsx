import Image from 'next/image';
import { ImportedBody } from '@/app/components/ContentChrome';
import { siteHref } from '@/app/site-path';

export type SeminarDetailLink = {
  label: string;
  href: string;
  external?: boolean;
};

type SeminarDetailSectionsProps = {
  language: 'ja' | 'en';
  seminarName: string;
  introductionHtml: string;
  introductionFallback: string;
  seminarImage: string;
  seminarImageAlt: string;
  professorName: string;
  professorNameSecondary?: string;
  professorImage: string;
  professorImageAlt: string;
  professorMessage: string;
  professorLink?: string;
  links: SeminarDetailLink[];
};

function MediaPanel({
  src,
  alt,
  name,
  kind,
  language,
}: {
  src: string;
  alt: string;
  name: string;
  kind: 'seminar' | 'professor';
  language: 'ja' | 'en';
}) {
  if (src) {
    return (
      <figure className={`seminar-detail-media is-${kind}`}>
        <Image
          src={siteHref(src)}
          alt={alt}
          fill
          sizes={kind === 'seminar' ? '(max-width: 920px) 100vw, 55vw' : '(max-width: 760px) 100vw, 330px'}
          loading={kind === 'seminar' ? 'eager' : 'lazy'}
          unoptimized
        />
      </figure>
    );
  }

  const label = language === 'ja'
    ? kind === 'seminar' ? '研究会写真 準備中' : '教員写真 準備中'
    : kind === 'seminar' ? 'Seminar photo coming soon' : 'Professor photo coming soon';

  return (
    <div className={`seminar-detail-media seminar-media-placeholder is-${kind}`} aria-label={label}>
      <span>{name.trim().charAt(0).toUpperCase() || 'K'}</span>
      <small>{label}</small>
    </div>
  );
}

export function SeminarDetailSections({
  language,
  seminarName,
  introductionHtml,
  introductionFallback,
  seminarImage,
  seminarImageAlt,
  professorName,
  professorNameSecondary,
  professorImage,
  professorImageAlt,
  professorMessage,
  professorLink,
  links,
}: SeminarDetailSectionsProps) {
  const isEnglish = language === 'en';
  const labels = isEnglish
    ? {
        introductionOverline: 'ABOUT THE SEMINAR',
        introduction: 'Introduction',
        professorOverline: "PROFESSOR'S MESSAGE",
        professor: 'Professor',
        profile: 'View professor profile',
        messageFallback: 'A message from the professor will be added soon.',
      }
    : {
        introductionOverline: 'SEMINAR INTRODUCTION',
        introduction: 'ゼミ紹介',
        professorOverline: 'MESSAGE FROM PROFESSOR',
        professor: '教員紹介',
        profile: '教員プロフィールを見る',
        messageFallback: '教授からのメッセージは現在準備中です。',
      };

  return (
    <div className={`seminar-detail-layout${isEnglish ? ' is-english' : ''}`}>
      <section className="seminar-detail-section seminar-introduction-section" aria-labelledby="seminar-introduction-title">
        <header className="seminar-detail-heading">
          <span>01</span>
          <div>
            <small>{labels.introductionOverline}</small>
            <h2 id="seminar-introduction-title">{labels.introduction}</h2>
          </div>
        </header>
        <div className="seminar-introduction-layout">
          <MediaPanel
            src={seminarImage}
            alt={seminarImageAlt}
            name={seminarName}
            kind="seminar"
            language={language}
          />
          <div className="seminar-detail-copy">
            <ImportedBody html={introductionHtml} fallback={introductionFallback} />
            {links.length > 0 && (
              <nav className="seminar-detail-links" aria-label={isEnglish ? 'Seminar links' : '研究会関連リンク'}>
                {links.map((link) => (
                  <a
                    href={link.external ? link.href : siteHref(link.href)}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    key={`${link.label}-${link.href}`}
                  >
                    <span>{link.label}</span><b>{link.external ? '↗' : '→'}</b>
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>
      </section>

      <section className="seminar-detail-section seminar-professor-section" aria-labelledby="seminar-professor-title">
        <header className="seminar-detail-heading">
          <span>02</span>
          <div>
            <small>{labels.professorOverline}</small>
            <h2 id="seminar-professor-title">{labels.professor}</h2>
          </div>
        </header>
        <div className="seminar-professor-layout">
          <MediaPanel
            src={professorImage}
            alt={professorImageAlt}
            name={professorName || seminarName}
            kind="professor"
            language={language}
          />
          <div className="seminar-professor-copy">
            <small>PROFESSOR</small>
            <h3>{professorName || (isEnglish ? 'Faculty information' : '担当教員')}</h3>
            {professorNameSecondary && <p className="seminar-professor-secondary">{professorNameSecondary}</p>}
            <blockquote className={!professorMessage ? 'is-empty' : undefined}>
              <span aria-hidden="true">“</span>
              <p>{professorMessage || labels.messageFallback}</p>
            </blockquote>
            {professorLink && (
              <a className="seminar-professor-link" href={professorLink} target="_blank" rel="noreferrer">
                {labels.profile} <span>↗</span>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
