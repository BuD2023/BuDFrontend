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
