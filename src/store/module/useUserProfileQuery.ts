import { useQuery } from '@tanstack/react-query';
import getUserFollowList from '../../apiFetcher/userInfo/getUserFollowList';
import getUserFollowerList from '../../apiFetcher/userInfo/getUserFollowerList';
import { accessToken } from '../../main';
import getUserProfileInfo from '../../apiFetcher/userInfo/getUserProfile';

export function useUserProfileQuery(id: number) {
  return useQuery(['userProfile', id], () => getUserProfileInfo(accessToken, id), {
    enabled: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
}

export function useUserFollowsQuery(id: number) {
  return useQuery(['userFollows', id], () => getUserFollowList(accessToken, id), {
    enabled: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
}

export function useUserFollowersQuery(id: number) {
  return useQuery(['userFollowers', id], () => getUserFollowerList(accessToken, id), {
    enabled: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
}
