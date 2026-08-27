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
  professorDescription: string;
  professorLink: string;
  website: string;
  twitter: string;
  instagram: string;
  facebook: string;
  pearl: boolean;
  dd: boolean;
};

export type PearlSeminar = BaseContent & {
  name: string;
  field: string;
  relatedJapaneseId: number;
  professorDescription: string;
  professorLink: string;
};
