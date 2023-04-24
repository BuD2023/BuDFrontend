import { ScrapListType } from '../../components/myProfile/_MyProfile.interface';
import customAxios from '../customAxios';

const getMyScrapList = async (token: string, page: number = 0, sort: string = 'POST_DATE,DESC'): Promise<ScrapListType> => {
  const response = (await customAxios({
    method: 'get',
    url: `/users/posts/scraps?page=${page}&sort=${sort}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })) as ScrapListType;
  return response;
};

export default getMyScrapList;
