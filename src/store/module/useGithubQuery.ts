import { useMutation, useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import getGithubInfoAxios from '../../apiFetcher/githubInfo/getGithubInfo';
import postGithubInfoAxios from '../../apiFetcher/githubInfo/postGithubInfo';
import { loginUserInfo } from '../recoil/user';

export function useGithubQuery() {
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useQuery(['githubInfo'], () => getGithubInfoAxios(loginUser?.token as string), {
    enabled: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
}

export function useGithubMutation() {
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  const { refetch } = useGithubQuery();
  return useMutation(() => postGithubInfoAxios(loginUser?.token as string), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: async () => {
      console.log('깃헙 정보 요청이 실행되었습니다.');
      await refetch();
    },
  });
}
