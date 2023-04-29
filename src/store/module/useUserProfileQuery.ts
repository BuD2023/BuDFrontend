import { useQuery } from '@tanstack/react-query';
import getUserFollowList from '../../apiFetcher/userInfo/getUserFollowList';
import getUserFollowerList from '../../apiFetcher/userInfo/getUserFollowerList';
import getUserProfileInfo from '../../apiFetcher/userInfo/getUserProfile';
import { useRecoilValue } from 'recoil';
import { loginUserInfo } from '../recoil/user';

export function useUserProfileQuery(id: number) {
  const loginUser = useRecoilValue(loginUserInfo);
  return useQuery(['userProfile', id], () => getUserProfileInfo(loginUser?.token as string, id), {
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
  const loginUser = useRecoilValue(loginUserInfo);
  return useQuery(['userFollows', id], () => getUserFollowList(loginUser?.token as string, id), {
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
  const loginUser = useRecoilValue(loginUserInfo);
  return useQuery(['userFollowers', id], () => getUserFollowerList(loginUser?.token as string, id), {
    enabled: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
}
