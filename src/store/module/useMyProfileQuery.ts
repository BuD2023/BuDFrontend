import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import getMyFollowerList from '../../apiFetcher/userInfo/getMyFollowerList';
import getMyFollowList from '../../apiFetcher/userInfo/getMyFollowList';
import getMyProfileInfo from '../../apiFetcher/userInfo/getMyProfile';
import getMyScrapList from '../../apiFetcher/userInfo/getMyScrapList';
import { accessToken } from '../../main';

export function useMyProfileQuery() {
  return useQuery(['myProfile'], () => getMyProfileInfo(accessToken), {
    // enabled: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
}

export function useMyFollowersQuery() {
  return useQuery(['myFollowers'], () => getMyFollowerList(accessToken), {
    enabled: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
}

export function useMyFollowsQuery() {
  return useQuery(['myFollows'], () => getMyFollowList(accessToken), {
    enabled: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
}

export function useMyScrapsQuery(sort?: string) {
  return useInfiniteQuery(['myScraps', sort], ({ pageParam = 0 }) => getMyScrapList(accessToken, pageParam, sort), {
    getNextPageParam: (prevData: any, allPages) => {
      const lastPage = prevData.last;
      const nextPage = allPages.length;
      return lastPage ? undefined : nextPage;
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
