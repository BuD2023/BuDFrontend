import { NewsProps } from '../../components/news/_News.interface';
import customAxios from '../customAxios';

const getNewsListAxios = async (token: string, page: number = 0, keyword: string = ''): Promise<NewsProps[]> => {
  return await customAxios({
    method: 'get',
    url: `/news?page=${String(page)}&keyword=${keyword}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export default getNewsListAxios;
