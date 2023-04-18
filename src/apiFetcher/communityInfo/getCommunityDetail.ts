import customAxios from '../customAxios';
import { PostTypeType } from './getCommunityPost';

type postStatusType = 'INACTIVE' | 'ACTIVE';

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
  nickname: string;
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
interface getCommunityDetailType {
  id: number;
  title: string;
  member: memberType;
  imageUrls: null[] | string[];
  content: string;
  commentCount: number;
  likeCount: number;
  scrapCount: number;
  hitCount: number;
  postStatus: postStatusType;
  postType: PostTypeType;
  createdAt: string;
  updatedAt: string;
}

export const getCommunityDetailAxios = async (token: string, id: number): Promise<getCommunityDetailType> => {
  return await customAxios({
    method: 'get',
    url: `/posts/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};
