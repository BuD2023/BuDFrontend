import { NewsProps } from '../../components/news/_News.interface';
import customAxios from '../customAxios';

const getNewsListAxios = async (token: string, page: number = 0, inputKeyword: string = '', sort: boolean = false, filterKeywords: string = ''): Promise<NewsProps[]> => {
  return await customAxios({
    method: 'get',
    url: `/news?size=10&page=${page}&sort=${sort ? 'DATE' : 'HIT'}&order=ASC&&startDate=2000-01-20&endDate=2023-03-28&keyword=${filterKeywords.length > 0 ? filterKeywords : inputKeyword}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export default getNewsListAxios;
