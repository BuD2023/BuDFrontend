/** getNewsDetailAxios - 뉴스 디테일 가져올 때 사용하는 response 타입 */
export interface NewsDetailType {
  readonly id: number;
  readonly registeredAt: string;
  readonly title: string;
  readonly link: string;
  readonly content: string;
  readonly summaryContent: string;
  readonly mainImgUrl: string;
  readonly company: string;
  readonly journalistOriginalNames: string[];
  readonly journalistNames: string[];
  readonly keywords: string[];
  readonly hitCount: number;
}

/** NewsPosts - 뉴스 리스트에 사용하는 props 타입 */
export interface NewsPostsProps {
  readonly newsData?: NewsDetailType[];
  readonly isLoading: boolean;
}

/** NewsKeywordFilter - 뉴스 키워드 필터링에 사용하는 props 타입 */
export interface NewsKeywordFilterPropsType {
  readonly filter: boolean;
  setFilter: (a: boolean) => void;
  readonly inputValue: string;
  setInputValue: (x: string) => void;
}

/** NewsFilter - 뉴스 정렬 사용하는 props 타입 */
export interface INewsFilterPropsType {
  setFilter: (x: boolean) => void;
  setSort: (x: boolean) => void;
  readonly sort: boolean;
  setOrder: (x: boolean) => void;
  readonly order: boolean;
}

/** getNewsListAxio - 전체 뉴스 리스트를 가져올 때 사용하는 response 타입 */
export interface NewsListType {
  readonly content: NewsDetailType[];
  readonly pageable: {
    readonly sort: {
      readonly empty: boolean;
      readonly sorted: boolean;
      readonly unsorted: boolean;
    };
    readonly offset: number;
    readonly pageNumber: number;
    readonly pageSize: number;
    readonly paged: boolean;
    readonly unpaged: boolean;
  };
  readonly totalElements: number;
  readonly totalPages: number;
  readonly first: boolean;
  readonly last: boolean;
  readonly size: number;
  readonly number: number;
  readonly sort: {
    readonly empty: boolean;
    readonly sorted: boolean;
    readonly unsorted: boolean;
  };
  readonly numberOfElements: number;
  readonly empty: boolean;
}
