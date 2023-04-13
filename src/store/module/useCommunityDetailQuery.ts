import { useMutation, useQuery } from '@tanstack/react-query';
import { getCommunityDetailAxios } from '../../apiFetcher/communityInfo/getCommunityDetail';
import { postQnaAnswerAxios, QnaAnswerType } from '../../apiFetcher/communityInfo/postQnaAnswer';
import { accessToken } from '../../main';

export function useCommunityDetailQuery(id: number) {
  return useQuery(['CommunityDetail', id], () => getCommunityDetailAxios(accessToken, id), {
    // enabled: true,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });
}

export function useCreateAnswerMutation() {
  return useMutation((answer: QnaAnswerType) => postQnaAnswerAxios(accessToken, answer), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('QNA 답변이 게시되었습니다.');
    },
  });
}
