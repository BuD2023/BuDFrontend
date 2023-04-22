import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import getNewsDetailAxios from '../../apiFetcher/newsInfo/getNewsDetail';
import getNewsList from '../../apiFetcher/newsInfo/getNewsList';
import { accessToken } from '../../main';

export function useNewsQuery(inputKeyword: string, sort: boolean, order: boolean, filterKeywords: string) {
  return useInfiniteQuery(['newsList', inputKeyword, sort, order, filterKeywords], ({ pageParam = 0 }) => getNewsList(accessToken, pageParam, inputKeyword, sort, order, filterKeywords), {
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
  });
}

export function useNewsDetailQuery(id: number) {
  return useQuery(['newsDetail', id], () => getNewsDetailAxios(accessToken, id), {
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
}
