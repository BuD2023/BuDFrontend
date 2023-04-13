import customAxios from '../customAxios';
import { PostTypeType } from './getCommunityPost';

type postStatusType = 'INACTIVE' | 'ACTIVE';

interface getCommunityDetailType {
  id: number;
  title: string;
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
