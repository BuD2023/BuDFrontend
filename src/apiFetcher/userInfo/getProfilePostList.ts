import { OrderType } from '../../components/community/_Community.interface';
import { FeedPostType } from '../../components/myProfile/_MyProfile.interface';
import customAxios from '../customAxios';

const getProfilePostList = async (token: string, userId: number, postType: string = 'FEED', page: number = 0, sort: string = 'DATE', order: OrderType = 'DESC'): Promise<FeedPostType> => {
  return await customAxios({
    method: 'get',
    url: `/users/${userId}/posts?size=5&page=${page}&sort=${sort},${order}&postType=${postType}`,
    headers: {
      Authorization: token,
    },
  });
};

export default getProfilePostList;
