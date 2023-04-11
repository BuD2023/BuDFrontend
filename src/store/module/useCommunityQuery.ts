import { useMutation } from '@tanstack/react-query';
import postCommunityPostAxios, { INewCommunityPostType } from '../../apiFetcher/communityInfo/postCommunityPost';
import { accessToken } from '../../main';

export function useCommunityMutation() {
  return useMutation((data: INewCommunityPostType) => postCommunityPostAxios(accessToken, data), {
    onError: (err) => {
      console.log(err);
    },
    onSettled: () => {
      console.log('요청이 실행되었습니다.');
    },
  });
}
