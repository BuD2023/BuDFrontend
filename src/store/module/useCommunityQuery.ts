import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { deleteCommunityPostAxios } from '../../apiFetcher/communityInfo/deleteCommunityPost';
import getCommunityPostAxios from '../../apiFetcher/communityInfo/getCommunityPost';
import postCommunityLikeAxios from '../../apiFetcher/communityInfo/postCommunityLike';
import postCommunityPostAxios from '../../apiFetcher/communityInfo/postCommunityPost';
import postCommunityScrapAxios from '../../apiFetcher/communityInfo/postCommunityScrap';
import postUserFollow from '../../apiFetcher/communityInfo/postUserFollow';
import updateCommunityPostAxios from '../../apiFetcher/communityInfo/updateCommunityPost';
import { accessToken } from '../../main';
import { useMyFollowersQuery, useMyFollowsQuery, useMyProfileQuery, useMyScrapsQuery } from './useMyProfileQuery';
import { useUserProfileQuery } from './useUserProfileQuery';

export type SortType = 'HIT' | 'LIKE' | 'DATE';
export type OrderType = 'DESC' | 'ASC';

export function useCommunityPostQuery(word?: string, sort?: SortType, order?: OrderType, size?: number) {
  return useInfiniteQuery(['Community', word, sort, order], ({ pageParam = 0 }) => getCommunityPostAxios(accessToken, word, sort, order, pageParam, size), {
    getNextPageParam: (prevData, allPages) => {
      const lastPage = prevData.last;
      const nextPage = allPages.length + 1;
      return lastPage ? undefined : nextPage;
    },
    // enabled: true,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}

export function usePostCommunityMutation() {
  // const { refetch } = useCommunityPostQuery();
  return useMutation((data: FormData) => postCommunityPostAxios(accessToken, data), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('요청이 실행되었습니다.');
      // refetch();
    },
  });
}

export function useUpdateCommunityMutation() {
  return useMutation((data: FormData) => updateCommunityPostAxios(accessToken, data), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('요청이 실행되었습니다.');
    },
  });
}

export function useDeleteCommunityMutation(id: number) {
  return useMutation(() => deleteCommunityPostAxios(accessToken, id), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('게시글 삭제 요청이 실행되었습니다.');
    },
  });
}

export function useCommunityLikeMutation(postId: number) {
  return useMutation(() => postCommunityLikeAxios(accessToken, postId), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('좋아요 상태 변경 반영됨');
    },
  });
}
export function useCommunityScrapMutation(postId: number) {
  const { refetch } = useMyScrapsQuery('postId,DESC');
  return useMutation(() => postCommunityScrapAxios(accessToken, postId), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('게시물 스크랩 상태 변경 반영됨');
      refetch();
    },
  });
}

export function useFollowMutation(id: number) {
  const { refetch: followersRefetch } = useMyFollowersQuery();
  const { refetch: followrRefetch } = useMyFollowsQuery();
  const { refetch: myProfileRefetch } = useMyProfileQuery();
  const { refetch: userProfileRefetch } = useUserProfileQuery(id);

  return useMutation(() => postUserFollow(accessToken, id), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('팔로우 상태가 변경되었습니다.');
      followrRefetch();
      followersRefetch();
      myProfileRefetch();
      if (id !== 0) userProfileRefetch();
    },
  });
}
