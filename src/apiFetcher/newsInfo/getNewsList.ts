import { NewsProps } from '../../components/news/_News.interface';
import customAxios from '../customAxios';

const getNewsListAxios = async (token: string, page: number = 0, inputKeyword: string = '', sort: boolean = false, filterKeywords: string = ''): Promise<NewsProps[]> => {
  return await customAxios({
    method: 'get',
    url: `/news?page=${page}&keyword=${filterKeywords.length > 0 ? filterKeywords : inputKeyword}&sort=${sort ? 'DATE' : 'HIT'}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export default getNewsListAxios;
