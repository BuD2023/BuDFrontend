import { NewsListType } from '../../components/news/_News.interface';
import customAxios from '../customAxios';

const getNewsDetailAxios = async (token: string, id: number): Promise<NewsListType> => {
  return await customAxios({
    method: 'get',
    url: `/news/detail/${String(id)}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getNewsDetailAxios;
