import { useMutation, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import deleteCommentAxios from '../../apiFetcher/communityInfo/deleteComment';
import deleteCommentPinAxios from '../../apiFetcher/communityInfo/deleteCommentPin';
import getCommentAxios from '../../apiFetcher/communityInfo/getComment';
import { getCommunityDetailAxios } from '../../apiFetcher/communityInfo/getCommunityDetail';
import postCommentLike from '../../apiFetcher/communityInfo/postCommentLike';
import postCommentPin from '../../apiFetcher/communityInfo/postCommentPin';
import { postQnaAnswerAxios } from '../../apiFetcher/communityInfo/postQnaAnswer';
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
  return useMutation((answer: FormData) => postQnaAnswerAxios(accessToken, answer), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('QNA 답변이 게시되었습니다.');
    },
  });
}

// 댓글 조회
export function useCommentQuery(id: number) {
  return useInfiniteQuery(['CommunityComment', id], ({ pageParam = 0 }) => getCommentAxios(accessToken, pageParam, id), {
    getNextPageParam: (prevData: any, allPages) => {
      const maxPages = prevData.totalPages;
      const nextPage = allPages.length + 1;
      return nextPage < maxPages ? nextPage : undefined;
    },
    // enabled: true,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });
}

// 댓글 좋아요 / 좋아요 취소
export function useCommentLikeMutation(id: number) {
  return useMutation(() => postCommentLike(accessToken, id), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('좋아요 상태 변경 반영되었습니다.');
    },
  });
}

// 댓글 핀 / 핀 변경
export function useCommentPinMutation(id: number) {
  return useMutation(() => postCommentPin(accessToken, id), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('핀 상태 변경 반영되었습니다.');
    },
  });
}

// 댓글 핀 취소
export function useDeleteCommentPinMutation(id: number) {
  return useMutation(() => deleteCommentPinAxios(accessToken, id), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('핀이 취소되었습니다.');
    },
  });
}

// 댓글 삭제
export function useDeleteCommentMutation(id: number) {
  return useMutation(() => deleteCommentAxios(accessToken, id), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('댓글이 삭제되었습니다.');
    },
  });
}
