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
    refetchOnWindowFocus: true, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}

export function useUserFollowsQuery(id: number) {
  return useQuery(['userFollows', id], () => getUserFollowList(accessToken, id), {
    enabled: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}

export function useUserFollowersQuery(id: number) {
  return useQuery(['userFollowers', id], () => getUserFollowerList(accessToken, id), {
    enabled: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
