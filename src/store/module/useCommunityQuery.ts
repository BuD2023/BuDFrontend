import { useMutation } from '@tanstack/react-query';
import postCommunityPostAxios, { INewCommunityPostType } from '../../apiFetcher/communityInfo/postCommunityPost';
import updateCommunityPostAxios from '../../apiFetcher/communityInfo/updateCommunityPost';
import { accessToken } from '../../main';

export function usePostCommunityMutation() {
  return useMutation((data: INewCommunityPostType) => postCommunityPostAxios(accessToken, data), {
    onError: (err) => {
      console.log(err);
    },
    onSettled: () => {
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
