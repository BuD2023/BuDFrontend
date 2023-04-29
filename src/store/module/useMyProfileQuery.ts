import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import getMyFollowerList from '../../apiFetcher/userInfo/getMyFollowerList';
import getMyFollowList from '../../apiFetcher/userInfo/getMyFollowList';
import getMyProfileInfo from '../../apiFetcher/userInfo/getMyProfile';
import getMyScrapList from '../../apiFetcher/userInfo/getMyScrapList';
import postCreateUserInfoAxios from '../../apiFetcher/userInfo/postCreateUserInfo';
import postUserInfoEditAxios from '../../apiFetcher/userInfo/postUpdateUserInfo';
import getUserLevelInfoAxios from '../../apiFetcher/userInfo/getUserLevelInfo';
import { OrderType } from '../../components/community/_Community.interface';
import postIsIdUniqueAxios from '../../apiFetcher/userInfo/postIsIdUnique';
import getRandomImageAxios from '../../apiFetcher/userInfo/getRandomImage';
import { loginUserInfo } from '../recoil/user';
import { useRecoilValue } from 'recoil';

export function useMyProfileQuery(enabled: boolean = true) {
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useQuery(['myProfile'], () => getMyProfileInfo(loginUser?.token as string), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useQuery(['myFollowers'], () => getMyFollowerList(loginUser?.token as string), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useQuery(['myFollows'], () => getMyFollowList(loginUser?.token as string), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useInfiniteQuery(['myScraps', sort, order], ({ pageParam = 0 }) => getMyScrapList(loginUser?.token as string, pageParam, sort, order), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useMutation((data: FormData) => postCreateUserInfoAxios(loginUser?.token as string, data), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('유저 정보가 생성되었습니다.');
    },
  });
}

export function useUpdateUserInfoMutation() {
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useMutation((data: FormData) => postUserInfoEditAxios(loginUser?.token as string, data), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('유저 정보가 수정되었습니다.');
    },
  });
}

export function useGetUserLevelInfoQuery() {
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useQuery(['userLevelInfo'], () => getUserLevelInfoAxios(loginUser?.token as string), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useQuery(['isUniqueId', data], () => postIsIdUniqueAxios(loginUser?.token as string, data), {
    enabled: true,
  });
}

export function useGetRandomImageMutation() {
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useQuery(['randomImage'], () => getRandomImageAxios(loginUser?.token as string), {
    enabled: false,
  });
}
