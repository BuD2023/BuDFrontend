import { useMutation, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { deleteFeedCommentAxios, deleteQnACommentAxios } from '../../apiFetcher/communityInfo/deleteComment';
import { deleteFeedCommentPinAxios, deleteQnACommentPinAxios } from '../../apiFetcher/communityInfo/deleteCommentPin';
import { getFeedCommentAxios, getQnACommentAxios } from '../../apiFetcher/communityInfo/getComment';
import { getQnaAnswerAxios } from '../../apiFetcher/communityInfo/getQnaAnswer';
import { getCommunityDetailAxios } from '../../apiFetcher/communityInfo/getCommunityDetail';
import { getFeedCommentLikeAxios, postQnACommentLikeAxios } from '../../apiFetcher/communityInfo/postCommentLike';
import { postFeedCommentPinAxios, postQnACommentPinAxios } from '../../apiFetcher/communityInfo/postCommentPin';
import { postQnaAnswerAxios } from '../../apiFetcher/communityInfo/postQnaAnswer';
import postQnaAnswerPinAxios from '../../apiFetcher/communityInfo/postQnaAnswerPin';
import { accessToken } from '../../main';
import postQnaAnswerLikeAxios from '../../apiFetcher/communityInfo/postQnaAnswerLike';
import deleteQnaAnswerAxios from '../../apiFetcher/communityInfo/deleteQnaAnswer';
import { updateQnaAnswerAxios } from '../../apiFetcher/communityInfo/updateQnaAnswer';
import { postFeedCommentReplyAxios, postQnaCommentReplyAxios } from '../../apiFetcher/communityInfo/postCommentReply';
import { postFeedCommentAxios, postQnaCommentAxios } from '../../apiFetcher/communityInfo/postComment';
import { putFeedCommentEditAxios, putQnaCommentEditAxios } from '../../apiFetcher/communityInfo/putCommentEdit';

export function useCommunityDetailQuery(id: number) {
  return useQuery(['CommunityDetail', id], () => getCommunityDetailAxios(accessToken, id), {
    enabled: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
  });
}

//QnA 답변 조회
export function useCommunityAnswerQuery(id: number) {
  return useQuery(['CommunityAnswer', id], () => getQnaAnswerAxios(accessToken, id), {
    enabled: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: 1000 * 60,
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

//QnA 답변 수정
export function useUpdateAnswerMutation(answerId: number) {
  return useMutation((answer: FormData) => updateQnaAnswerAxios(accessToken, answerId, answer), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('QNA 답변이 수정되었습니다.');
    },
  });
}

//QnA 답변 핀
export function usePinAnswerMutation(id: number) {
  return useMutation(() => postQnaAnswerPinAxios(accessToken, id), {
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
    getNextPageParam: (prevData, allPages) => {
      const maxPages = prevData.last;
      const nextPage = allPages.length;
      return maxPages ? undefined : nextPage;
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
  return useMutation(() => postFeedCommentPinAxios(accessToken, id), {
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
export function useDeleteFeedCommentMutation(commentId: number, postId: number) {
  const { refetch } = useFeedCommentQuery(postId);
  return useMutation(() => deleteFeedCommentAxios(accessToken, commentId), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('댓글이 삭제되었습니다.');
      refetch();
    },
  });
}

// QnA 피드 댓글 조회
export function useQnACommentQuery(id: number) {
  return useInfiniteQuery(['CommunityComment', id], ({ pageParam = 0 }) => getQnACommentAxios(accessToken, pageParam, id), {
    getNextPageParam: (prevData, allPages) => {
      const maxPages = prevData.last;
      const nextPage: any = allPages.length;
      return maxPages ? undefined : nextPage;
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
export function useQnACommentPinMutation(commentId: number, answerId: number) {
  const { refetch } = useQnACommentQuery(answerId);
  return useMutation(() => postQnACommentPinAxios(accessToken, commentId), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('핀 상태 변경 반영되었습니다.');
      refetch();
    },
  });
}

// QnA 피드 댓글 핀 취소
export function useDeleteQnACommentPinMutation(answerId: number) {
  const { refetch } = useQnACommentQuery(answerId);
  return useMutation(() => deleteQnACommentPinAxios(accessToken, answerId), {
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
export function useDeleteQnACommentMutation(commentId: number, AnswerId: number) {
  const { refetch } = useQnACommentQuery(AnswerId);
  return useMutation(() => deleteQnACommentAxios(accessToken, commentId), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('댓글이 삭제되었습니다.');
      refetch();
    },
  });
}

// QNA 답변 좋아요 상태 변경
export function usePostQnaAnswerLikeMutation(postId: number) {
  const { refetch } = useCommunityAnswerQuery(postId);
  return useMutation((id: number) => postQnaAnswerLikeAxios(accessToken, id), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: async () => {
      console.log('QNA 답변 좋아요 상태가 변경되었습니다.');
      // fetchNew = `qnaLike${Date.now()}` => 이렇게 하면 깜빡이네.....
      refetch();
    },
  });
}

// QnA 답변 삭제
export function useDeleteQnaAnswerMutation(answerId: number, questionId: number) {
  const { refetch } = useCommunityAnswerQuery(questionId);
  return useMutation(() => deleteQnaAnswerAxios(accessToken, answerId), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('답변이 삭제되었습니다.');
      refetch();
    },
  });
}

// 개발 피드 댓글 작성
export function useFeedCommentMutation(postId: number) {
  return useMutation((comment: string) => postFeedCommentAxios(accessToken, postId, comment), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('댓글이 작성되었습니다.');
    },
  });
}

// QnA 피드 댓글 작성
export function useQnaCommentMutation(answerId: number) {
  return useMutation((comment: string) => postQnaCommentAxios(accessToken, answerId, comment), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('댓글이 작성되었습니다.');
    },
  });
}

// 개발 피드 댓글 수정
export function useFeedCommentEditMutation(commentId: number) {
  return useMutation((content: string) => putFeedCommentEditAxios(accessToken, commentId, content), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('댓글이 수정되었습니다.');
    },
  });
}

// qna 피드 댓글 수정
export function useQnaCommentEditMutation(commentId: number) {
  return useMutation((content: string) => putQnaCommentEditAxios(accessToken, commentId, content), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('댓글이 수정되었습니다.');
    },
  });
}

// 개발 피드 대댓글 작성
export function useFeedCommentReplyMutation(commentId: number) {
  return useMutation((comment: string) => postFeedCommentReplyAxios(accessToken, commentId, comment), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('대댓글이 작성되었습니다.');
    },
  });
}

// qna 피드 대댓글 작성
export function useQnaCommentReplyMutation(commentId: number) {
  return useMutation((comment: string) => postQnaCommentReplyAxios(accessToken, commentId, comment), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('대댓글이 작성되었습니다.');
    },
  });
}
