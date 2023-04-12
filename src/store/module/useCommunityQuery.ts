import { useMutation, useQuery } from '@tanstack/react-query';
import getCommunityPostAxios from '../../apiFetcher/communityInfo/getCommunityPost';
import postCommunityPostAxios, { INewCommunityPostType } from '../../apiFetcher/communityInfo/postCommunityPost';
import updateCommunityPostAxios from '../../apiFetcher/communityInfo/updateCommunityPost';
import { accessToken } from '../../main';

// getCommunityPostAxios
// (token: string, word: string, sort: string = 'DATE', order: string = 'DESC', page: number = 0, size: number = 5)
export function useGithubQuery(word?: string, sort?: string, order?: string, page?: number, size?: number) {
  return useQuery(['Community'], () => getCommunityPostAxios(accessToken, word, sort, order, page, size), {
    // enabled: true,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}

export function usePostCommunityMutation() {
  return useMutation((data: INewCommunityPostType) => postCommunityPostAxios(accessToken, data), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('요청이 실행되었습니다.');
    },
  });
}

export function useUpdateCommunityMutation() {
  return useMutation((data: INewCommunityPostType) => updateCommunityPostAxios(accessToken, data), {
    onError: (err) => {
      console.log(err);
    },
    onSettled: () => {
      console.log('요청이 실행되었습니다.');
    },
  });
}
