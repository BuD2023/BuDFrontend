export interface NewsProps {
  id: number;
  registeredAt: string;
  title: string;
  link: string;
  content: string;
  summaryContent: string;
  mainImgUrl: string;
  company: string;
  journalistOriginalNames: string[];
  journalistNames: string[];
  keywords: string[];
  hitCount: number;
}

export interface NewsPostsProps {
  newsData: NewsProps[];
}
export interface NewsKeywordFilterPropsType {
  filter: boolean;
  setFilter: (a: boolean) => void;
  filterKeywords: string;
  setFilterKeywords: React.Dispatch<React.SetStateAction<string>>;
}

export interface INewsFilterPropsType {
  setFilter: (x: boolean) => void;
  setSort: (x: boolean) => void;
  sort: boolean;
  setOrder: (x: boolean) => void;
  order: boolean;
}
