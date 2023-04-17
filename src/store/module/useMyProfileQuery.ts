import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import getMyFollowerList from '../../apiFetcher/userInfo/getMyFollowerList';
import getMyFollowList from '../../apiFetcher/userInfo/getMyFollowList';
import getMyProfileInfo from '../../apiFetcher/userInfo/getMyProfile';
import getMyScrapList from '../../apiFetcher/userInfo/getMyScrapList';
import postUserFollow from '../../apiFetcher/userInfo/postUserFollow';
import { accessToken } from '../../main';

export function useMyProfileQuery() {
  return useQuery(['myProfile'], () => getMyProfileInfo(accessToken), {
    // enabled: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}

export function useMyFollowersQuery() {
  return useQuery(['myFollowers'], () => getMyFollowerList(accessToken), {
    enabled: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}

export function useMyFollowsQuery() {
  return useQuery(['myFollows'], () => getMyFollowList(accessToken), {
    enabled: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}

export function useMyScrapsQuery(sort: string) {
  return useInfiniteQuery(['myScarps', sort], ({ pageParam = 0 }) => getMyScrapList(accessToken, pageParam, sort), {
    getNextPageParam: (prevData, allPages) => {
      const lastPage = prevData.last;
      const nextPage = allPages.length;
      return lastPage ? undefined : nextPage;
    },
    enabled: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}

export function useFollowMutation(id: number) {
  return useMutation(() => postUserFollow(accessToken, id), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('팔로우 상태가 변경되었습니다.');
    },
  });
}
