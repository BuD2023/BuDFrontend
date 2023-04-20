import { FeedPostType } from '../../components/myProfile/_MyProfile.interface';
import customAxios from '../customAxios';

const getProfilePostList = async (token: string, userId: number, postType: string = '', page: number = 0, sort: string = ''): Promise<FeedPostType> => {
  return await customAxios({
    method: 'get',
    url: `/users/${userId}/posts?size=5&page=${page}&sort=${sort}&postType=${postType}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getProfilePostList;
