import { useMutation, useQuery } from '@tanstack/react-query';
import getGithubInfoAxios from '../../apiFetcher/githubInfo/getGithubInfo';
import postGithubInfoAxios from '../../apiFetcher/githubInfo/postGithubInfo';
import { accessToken } from '../../main';

export function useGithubQuery() {
  return useQuery(['githubInfo'], () => getGithubInfoAxios(accessToken), {
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
}

export function useGithubMutation() {
  return useMutation(() => postGithubInfoAxios(accessToken), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('깃헙 정보 요청이 실행되었습니다.');
    },
  });
}
