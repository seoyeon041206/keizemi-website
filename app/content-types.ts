export type BaseContent = {
  id: number;
  slug: string;
  title: string;
  date: string;
  modified: string;
  excerpt: string;
  contentHtml: string;
};

export type NewsPost = BaseContent & {
  categories: string[];
};

export type Seminar = BaseContent & {
  name: string;
  field: string;
  status: string;
  professorName: string;
  professorNameAlpha: string;
  professorMessage: string;
  professorImage: string;
  professorImageAlt: string;
  professorLink: string;
  seminarImage: string;
  seminarImageAlt: string;
  website: string;
  twitter: string;
  instagram: string;
  facebook: string;
  pearl: boolean;
  dd: boolean;
  languages: string[];
  description: string;
  url: string;
  order?: number;
};

export type PearlSeminar = BaseContent & {
  name: string;
  field: string;
  relatedJapaneseId: number;
  professorName: string;
  professorNameLocal: string;
  professorMessage: string;
  professorImage: string;
  professorImageAlt: string;
  professorLink: string;
  seminarImage: string;
  seminarImageAlt: string;
  website: string;
  twitter: string;
  instagram: string;
  facebook: string;
  sourceYear: number;
  pearl: boolean;
  dd: boolean;
  pearlStatus: string;
  ddStatus: string;
  language: string;
  recruitmentStatus: string;
};
