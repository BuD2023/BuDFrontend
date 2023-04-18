import customAxios from '../customAxios';

export type PostStatusType = 'ACTIVE' | 'INACTIVE';
export type PostTypeType = 'FEED' | 'QNA';

export interface memberType {
  createdAt: string;
  updatedAt: string;
  id: number;
  userId: string;
  level: {
    createdAt: string;
    updatedAt: string;
    id: number;
    levelNumber: number;
    levelCode: string;
    levelStartCommitCount: number;
    nextLevelStartCommitCount: number;
  };
  nickName: string;
  profileImg: null | string;
  job: null | string;
  status: string;
  introduceMessage: null | string;
  addInfoYn: boolean;
  enabled: boolean;
  oauthAccessToken: string;
  username: string;
  password: null | string;
  credentialNonExpired: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: {
    authority: string;
  }[];
}
export interface CommunityPostListContentType {
  id: number;
  member: memberType;
  title: string;
  imageUrls: any[];
  content: string;
  commentCount: number;
  likeCount: number;
  scrapCount: number;
  hitCount: number;
  postStatus: PostStatusType;
  postType: PostTypeType;
  createdAt: string;
  updatedAt: string;
}
export interface CommunityPostListType {
  content: CommunityPostListContentType[];
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
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

const getCommunityPostAxios = async (token: string, word: string | null = null, sort: string = 'DATE', order: string = 'DESC', page: number = 0, size: number = 5): Promise<CommunityPostListType> => {
  return await customAxios({
    method: 'get',
    url: `/posts?keyword=${word}&sort=${sort}&order=${order}&page=${page}&size=${size}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};

export default getCommunityPostAxios;
