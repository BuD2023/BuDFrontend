import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import getNewsDetailAxios from '../../apiFetcher/newsInfo/getNewsDetail';
import getNewsList from '../../apiFetcher/newsInfo/getNewsList';
import { accessToken } from '../../main';

export function useNewsQuery(inputKeyword: string, sort: boolean, order: boolean, filterKeywords: string) {
  return useInfiniteQuery(['newsList', inputKeyword, sort, order, filterKeywords], ({ pageParam = 0 }) => getNewsList(accessToken, pageParam, inputKeyword, sort, order, filterKeywords), {
    getNextPageParam: (prevData: any, allPages) => {
      const lastPage = prevData.last;
      const nextPage = allPages.length + 1;
      return lastPage ? undefined : nextPage;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}

export function useNewsDetailQuery(id: number) {
  return useQuery(['newsDetail', id], () => getNewsDetailAxios(accessToken, id), {
    getNextPageParam: (prevData: any, allPages) => {
      const lastPage = prevData.last;
      const nextPage = allPages.length + 1;
      return lastPage ? undefined : nextPage;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
