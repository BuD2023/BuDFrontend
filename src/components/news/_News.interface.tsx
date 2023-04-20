/** getNewsDetailAxios - 뉴스 디테일 가져올 때 사용하는 response 타입 */
export interface NewsDetailType {
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

/** NewsPosts - 뉴스 리스트에 사용하는 props 타입 */
export interface NewsPostsProps {
  newsData?: NewsDetailType[];
  isLoading: boolean;
}

/** NewsKeywordFilter - 뉴스 키워드 필터링에 사용하는 props 타입 */
export interface NewsKeywordFilterPropsType {
  filter: boolean;
  setFilter: (a: boolean) => void;
  filterKeywords: string;
  setFilterKeywords: React.Dispatch<React.SetStateAction<string>>;
}

/** NewsFilter - 뉴스 정렬 사용하는 props 타입 */
export interface INewsFilterPropsType {
  setFilter: (x: boolean) => void;
  setSort: (x: boolean) => void;
  sort: boolean;
  setOrder: (x: boolean) => void;
  order: boolean;
}

/** getNewsListAxio - 전체 뉴스 리스트를 가져올 때 사용하는 response 타입 */
export interface NewsListType {
  content: NewsDetailType[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}
