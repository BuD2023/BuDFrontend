import { NewsProps } from '../../components/news/_News.interface';
import customAxios from '../customAxios';

const getNewsListAxios = async (token: string, page: number = 0, inputKeyword: string = '', sort: boolean = false, order: boolean = false, filterKeywords: string = ''): Promise<NewsProps[]> => {
  return await customAxios({
    method: 'get',
    url: `/news?size=5&page=${page}&keyword=${filterKeywords.length > 0 ? filterKeywords : inputKeyword}&sort=${sort ? 'DATE' : 'HIT'}&order=${order ? 'ASC' : 'DESC'}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getNewsListAxios;
