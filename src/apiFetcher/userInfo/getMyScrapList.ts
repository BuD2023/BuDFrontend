import { PostStatusType, postType } from '../../components/community/_Community.interface';
import customAxios from '../customAxios';

export interface memberType {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  addInfoYn: boolean;
  authorities: {
    authority: string;
  }[];
  createdAt: string;
  credentialNonExpired: boolean;
  enabled: boolean;
  id: number;
  introduceMessage: null | string;
  job: null | string;
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
  oauthAccessToken: string;
  password: null | string;
  profileImg: null | string;
  status: string;
  updatedAt: string;
  userId: string;
  username: string;
}

export interface ScrapPostProps {
  createdAt: string;
  id: number;
  post: {
    id: number;
    member: memberType;
    title: string;
    imageUrls: null[] | string[];
    content: string;
    commentCount: number;
    likeCount: number;
    scrapCount: number;
    hitCount: number;
    postStatus: PostStatusType;
    postType: postType;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ScrpListType {
  content: ScrapPostProps[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
}

const getMyScrapList = async (token: string, page: number = 0, sort: string = ''): Promise<ScrpListType> => {
  return await customAxios({
    method: 'get',
    url: `/users/posts/scraps?page=${page}&sort=${sort}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getMyScrapList;
