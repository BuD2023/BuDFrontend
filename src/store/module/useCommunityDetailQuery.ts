import { useMutation, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { deleteFeedCommentAxios, deleteQnACommentAxios } from '../../apiFetcher/communityInfo/deleteComment';
import { deleteFeedCommentPinAxios, deleteQnACommentPinAxios } from '../../apiFetcher/communityInfo/deleteCommentPin';
import { getFeedCommentAxios, getQnACommentAxios } from '../../apiFetcher/communityInfo/getComment';
import { getQnaAnswerAxios } from '../../apiFetcher/communityInfo/getQnaAnswer';
import { getCommunityDetailAxios } from '../../apiFetcher/communityInfo/getCommunityDetail';
import { getFeedCommentLikeAxios, postQnACommentLikeAxios } from '../../apiFetcher/communityInfo/postCommentLike';
import { getFeedCommentPinAxios, getQnACommentPinAxios } from '../../apiFetcher/communityInfo/postCommentPin';
import { postQnaAnswerAxios } from '../../apiFetcher/communityInfo/postQnaAnswer';
import getQnaAnswerPinAxios from '../../apiFetcher/communityInfo/postQnaAnswerPin';
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

//QnA 답변 조회
export function useCommunityAnswerQuery(id: number) {
  return useQuery(['CommunityAnswer', id], () => getQnaAnswerAxios(accessToken, id), {
    // enabled: true,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });
}

//QnA 답변 작성
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

//QnA 답변 핀
export function usePinAnswerMutation(id: number) {
  return useMutation(() => getQnaAnswerPinAxios(accessToken, id), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('답변 핀이 반영되었습니다.');
    },
  });
}

//QnA 답변 핀 취소
export function useDeletePinAnswerMutation() {
  return useMutation((answer: FormData) => postQnaAnswerAxios(accessToken, answer), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('답변 핀이 취소되었습니다.');
    },
  });
}

// 개발 피드 댓글 조회
export function useFeedCommentQuery(id: number) {
  return useInfiniteQuery(['CommunityComment', id], ({ pageParam = 0 }) => getFeedCommentAxios(accessToken, pageParam, id), {
    getNextPageParam: (prevData: any, allPages) => {
      const maxPages = prevData.totalPages;
      const nextPage = allPages.length + 1;
      return nextPage < maxPages ? nextPage : undefined;
    },
    enabled: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });
}

// 개발 피드 댓글 좋아요 / 좋아요 취소
export function useFeedCommentLikeMutation(id: number, postId: number) {
  const { refetch } = useFeedCommentQuery(postId);
  return useMutation(() => getFeedCommentLikeAxios(accessToken, id), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('좋아요 상태 변경 반영되었습니다.');
      if (postId !== 0) refetch();
    },
  });
}

// 개발 피드 댓글 핀 / 핀 변경
export function useFeedCommentPinMutation(id: number, postId: number) {
  const { refetch } = useFeedCommentQuery(postId);
  return useMutation(() => getFeedCommentPinAxios(accessToken, id), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('핀 상태 변경 반영되었습니다.');
      refetch();
    },
  });
}

// 개발 피드 댓글 핀 취소
export function useDeleteFeedCommentPinMutation(id: number) {
  const { refetch } = useFeedCommentQuery(id);
  return useMutation(() => deleteFeedCommentPinAxios(accessToken, id), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('핀이 취소되었습니다.');
      refetch();
    },
  });
}

// 개발 피드 댓글 삭제
export function useDeleteFeedCommentMutation(id: number) {
  return useMutation(() => deleteFeedCommentAxios(accessToken, id), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('댓글이 삭제되었습니다.');
    },
  });
}

// QnA 피드 댓글 조회
export function useQnACommentQuery(id: number) {
  return useInfiniteQuery(['CommunityComment', id], ({ pageParam = 0 }) => getQnACommentAxios(accessToken, pageParam, id), {
    getNextPageParam: (prevData: any, allPages) => {
      const maxPages = prevData.totalPages;
      const nextPage = allPages.length + 1;
      return nextPage < maxPages ? nextPage : undefined;
    },
    enabled: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });
}

// QnA 피드 댓글 좋아요 / 좋아요 취소
export function useQnACommentLikeMutation(id: number, answerId: number) {
  const { refetch } = useQnACommentQuery(answerId);
  return useMutation(() => postQnACommentLikeAxios(accessToken, id), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('좋아요 상태 변경 반영되었습니다.');
      if (answerId !== 0) refetch();
    },
  });
}

// QnA 피드 댓글 핀 / 핀 변경
export function useQnACommentPinMutation(id: number) {
  return useMutation(() => getQnACommentPinAxios(accessToken, id), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('핀 상태 변경 반영되었습니다.');
    },
  });
}

// QnA 피드 댓글 핀 취소
export function useDeleteQnACommentPinMutation(id: number) {
  const { refetch } = useFeedCommentQuery(id);
  return useMutation(() => deleteQnACommentPinAxios(accessToken, id), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('핀이 취소되었습니다.');
      refetch();
    },
  });
}

// QnA 피드 댓글 삭제
export function useDeleteQnACommentMutation(id: number) {
  return useMutation(() => deleteQnACommentAxios(accessToken, id), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('댓글이 삭제되었습니다.');
    },
  });
}
