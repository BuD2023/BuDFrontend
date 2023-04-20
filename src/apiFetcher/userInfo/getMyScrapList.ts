import { ScrpListType } from '../../components/myProfile/_MyProfile.interface';
import customAxios from '../customAxios';

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
