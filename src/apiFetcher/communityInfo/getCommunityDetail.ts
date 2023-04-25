import { getCommunityDetailType, postType } from '../../components/community/_Community.interface';
import customAxios from '../customAxios';

export const getCommunityDetailAxios = async (token: string, id: number | string): Promise<getCommunityDetailType> => {
  return await customAxios({
    method: 'get',
    url: `/posts/${Number(id)}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};
