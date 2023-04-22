import { useInfiniteQuery } from '@tanstack/react-query';
import getProfilePostList from '../../apiFetcher/userInfo/getProfilePostList';
import { accessToken } from '../../main';

export function useProfilePostQuery(userId: number, postType?: string, sort?: string) {
  return useInfiniteQuery(['userProfile', userId, sort, postType], ({ pageParam = 0 }) => getProfilePostList(accessToken, userId, postType, pageParam, sort), {
    getNextPageParam: (prevData, allPages) => {
      const maxPages = prevData.last;
      const nextPage = allPages.length;
      return maxPages ? undefined : nextPage;
    },
    enabled: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
}
