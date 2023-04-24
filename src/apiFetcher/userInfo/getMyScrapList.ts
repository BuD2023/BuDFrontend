import { ScrapPostPropsType, ScrpListType } from '../../components/myProfile/_MyProfile.interface';
import customAxios from '../customAxios';

const getMyScrapList = async (token: string, page: number = 0, sort: string = 'POST_DATE,DESC'): Promise<ScrapPostPropsType> => {
  return await customAxios({
    method: 'get',
    url: `/users/posts/scraps?page=${page}&sort=${sort}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getMyScrapList;
