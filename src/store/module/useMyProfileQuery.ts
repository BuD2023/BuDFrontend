import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import getMyFollowerList from '../../apiFetcher/userInfo/getMyFollowerList';
import getMyFollowList from '../../apiFetcher/userInfo/getMyFollowList';
import getMyProfileInfo from '../../apiFetcher/userInfo/getMyProfile';
import getMyScrapList from '../../apiFetcher/userInfo/getMyScrapList';
import postCreateUserInfoAxios from '../../apiFetcher/userInfo/postCreateUserInfo';
import postUserInfoEditAxios from '../../apiFetcher/userInfo/postUpdateUserInfo';
import getUserLevelInfoAxios from '../../apiFetcher/userInfo/getUserLevelInfo';
import { OrderType } from '../../components/community/_Community.interface';
import { accessToken } from '../../main';
import postIsIdUniqueAxios from '../../apiFetcher/userInfo/postIsIdUnique';
import postRandomImageAxios from '../../apiFetcher/userInfo/postRandomImage';

export function useMyProfileQuery(enabled: boolean = true) {
  return useQuery(['myProfile'], () => getMyProfileInfo(accessToken), {
    enabled: enabled,
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

export function useMyScrapsQuery(sort?: string, order?: OrderType) {
  return useInfiniteQuery(['myScraps', sort, order], ({ pageParam = 0 }) => getMyScrapList(accessToken, pageParam, sort, order), {
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

export function useCreateUserInfoMutation() {
  return useMutation((data: FormData) => postCreateUserInfoAxios(data), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('유저 정보가 생성되었습니다.');
    },
  });
}

export function useUpdateUserInfoMutation() {
  return useMutation((data: FormData) => postUserInfoEditAxios(accessToken, data), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('유저 정보가 수정되었습니다.');
    },
  });
}

export function useGetUserLevelInfoQuery() {
  return useQuery(['userLevelInfo'], () => getUserLevelInfoAxios(accessToken), {
    // enabled: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
}

export function useGetIsIdUniqueQuery(data: string) {
  return useQuery(['isUniqueId', data], () => postIsIdUniqueAxios(accessToken, data), {
    enabled: true,
  });
}

export function useGetRandomImageQuery() {
  return useQuery(['randomImage'], () => postRandomImageAxios(accessToken), {
    enabled: true,
  });
}
