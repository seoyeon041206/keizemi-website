import type { BaseContent } from '@/app/content-types';
import { ContentChrome, ImportedBody } from '@/app/components/ContentChrome';
import { RecruitmentNavigation } from '@/app/components/RecruitmentNavigation';

export function RecruitmentEntryPage({ page }: { page: BaseContent }) {
  return (
    <ContentChrome
      overline="JOIN THE COMMITTEE · ENTRY"
      title={page.title}
      backHref="/pages/707"
      backLabel="新規委員募集"
    >
      <RecruitmentNavigation active="entry" />
      <ImportedBody html={page.contentHtml} fallback={page.excerpt} />
    </ContentChrome>
  );
}
