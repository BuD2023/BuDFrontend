import { NewsProps } from '../../components/news/_News.interface';
import customAxios from '../customAxios';

const getNewsDetailAxios = async (token: string, id: number): Promise<NewsProps> => {
  return await customAxios({
    method: 'get',
    url: `/news/detail/${String(id)}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export default getNewsDetailAxios;