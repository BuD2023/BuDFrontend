import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import getNewsDetailAxios from '../../apiFetcher/newsInfo/getNewsDetail';
import getNewsList from '../../apiFetcher/newsInfo/getNewsList';
import { loginUserInfo } from '../recoil/user';

export function useNewsQuery(inputKeyword: string, sort: boolean, order: boolean, filterKeywords: string) {
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useInfiniteQuery(
    ['newsList', inputKeyword, sort, order, filterKeywords],
    ({ pageParam = 0 }) => getNewsList(loginUser?.token as string, pageParam, inputKeyword, sort, order, filterKeywords),
    {
      getNextPageParam: (prevData, allPages) => {
        const lastPage = prevData.last;
        const nextPage = allPages.length;
        return lastPage ? undefined : nextPage;
      },
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: 0,
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 5,
    }
  );
}

export function useNewsDetailQuery(id: number) {
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useQuery(['newsDetail', id], () => getNewsDetailAxios(loginUser?.token as string, id), {
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
}
