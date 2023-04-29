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
import postQnaAnswerLikeAxios from '../../apiFetcher/communityInfo/postQnaAnswerLike';
import deleteQnaAnswerAxios from '../../apiFetcher/communityInfo/deleteQnaAnswer';
import { updateQnaAnswerAxios } from '../../apiFetcher/communityInfo/updateQnaAnswer';
import { postFeedCommentReplyAxios, postQnaCommentReplyAxios } from '../../apiFetcher/communityInfo/postCommentReply';
import { postFeedCommentAxios, postQnaCommentAxios } from '../../apiFetcher/communityInfo/postComment';
import { putFeedCommentEditAxios, putQnaCommentEditAxios } from '../../apiFetcher/communityInfo/putCommentEdit';
import { loginUserInfo } from '../recoil/user';
import { useRecoilValue } from 'recoil';

export function useCommunityDetailQuery(id: number) {
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useQuery(['CommunityDetail', id], () => getCommunityDetailAxios(loginUser?.token as string, id), {
    enabled: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
  });
}

//QnA 답변 조회
export function useCommunityAnswerQuery(id: number) {
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useQuery(['CommunityAnswer', id], () => getQnaAnswerAxios(loginUser?.token as string, id), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useMutation((answer: FormData) => postQnaAnswerAxios(loginUser?.token as string, answer), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useMutation((answer: FormData) => updateQnaAnswerAxios(loginUser?.token as string, answerId, answer), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useMutation(() => postQnaAnswerPinAxios(loginUser?.token as string, id), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useMutation((answer: FormData) => postQnaAnswerAxios(loginUser?.token as string, answer), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useInfiniteQuery(['CommunityComment', id], ({ pageParam = 0 }) => getFeedCommentAxios(loginUser?.token as string, pageParam, id), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  const { refetch } = useFeedCommentQuery(postId);
  return useMutation(() => getFeedCommentLikeAxios(loginUser?.token as string, id), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  const { refetch } = useFeedCommentQuery(postId);
  return useMutation(() => postFeedCommentPinAxios(loginUser?.token as string, id), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  const { refetch } = useFeedCommentQuery(id);
  return useMutation(() => deleteFeedCommentPinAxios(loginUser?.token as string, id), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  const { refetch } = useFeedCommentQuery(postId);
  return useMutation(() => deleteFeedCommentAxios(loginUser?.token as string, commentId), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useInfiniteQuery(['CommunityComment', id], ({ pageParam = 0 }) => getQnACommentAxios(loginUser?.token as string, pageParam, id), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  const { refetch } = useQnACommentQuery(answerId);
  return useMutation(() => postQnACommentLikeAxios(loginUser?.token as string, id), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  const { refetch } = useQnACommentQuery(answerId);
  return useMutation(() => postQnACommentPinAxios(loginUser?.token as string, commentId), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  const { refetch } = useQnACommentQuery(answerId);
  return useMutation(() => deleteQnACommentPinAxios(loginUser?.token as string, answerId), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  const { refetch } = useQnACommentQuery(AnswerId);
  return useMutation(() => deleteQnACommentAxios(loginUser?.token as string, commentId), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  const { refetch } = useCommunityAnswerQuery(postId);
  return useMutation((id: number) => postQnaAnswerLikeAxios(loginUser?.token as string, id), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  const { refetch } = useCommunityAnswerQuery(questionId);
  return useMutation(() => deleteQnaAnswerAxios(loginUser?.token as string, answerId), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useMutation((comment: string) => postFeedCommentAxios(loginUser?.token as string, postId, comment), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useMutation((comment: string) => postQnaCommentAxios(loginUser?.token as string, answerId, comment), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useMutation((content: string) => putFeedCommentEditAxios(loginUser?.token as string, commentId, content), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useMutation((content: string) => putQnaCommentEditAxios(loginUser?.token as string, commentId, content), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useMutation((comment: string) => postFeedCommentReplyAxios(loginUser?.token as string, commentId, comment), {
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
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useMutation((comment: string) => postQnaCommentReplyAxios(loginUser?.token as string, commentId, comment), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('대댓글이 작성되었습니다.');
    },
  });
}
