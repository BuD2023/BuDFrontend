import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deleteCommunityPostAxios } from '../../apiFetcher/communityInfo/deleteCommunityPost';
import getCommunityPostAxios from '../../apiFetcher/communityInfo/getCommunityPost';
import postCommunityLikeAxios from '../../apiFetcher/communityInfo/postCommunityLike';
import postCommunityPostAxios from '../../apiFetcher/communityInfo/postCommunityPost';
import postCommunityScrapAxios from '../../apiFetcher/communityInfo/postCommunityScrap';
import postUserFollow from '../../apiFetcher/communityInfo/postUserFollow';
import updateCommunityPostAxios from '../../apiFetcher/communityInfo/updateCommunityPost';
import { OrderType, postType, SortType } from '../../components/community/_Community.interface';
import { accessToken } from '../../main';
import { useCommunityDetailQuery } from './useCommunityDetailQuery';
import { useMyFollowersQuery, useMyFollowsQuery, useMyProfileQuery, useMyScrapsQuery } from './useMyProfileQuery';
import { useUserProfileQuery } from './useUserProfileQuery';

let refetchNew = '';
export function useCommunityPostQuery(word?: string, sort?: SortType, order?: OrderType, size?: number, postType?: postType | 'ALL') {
  return useInfiniteQuery(['Community', word, sort, order, postType, refetchNew], ({ pageParam = 0 }) => getCommunityPostAxios(accessToken, word, sort, order, pageParam, size, postType), {
    getNextPageParam: (prevData, allPages) => {
      const lastPage = prevData.last;
      const nextPage = allPages.length + 1;
      return lastPage ? undefined : nextPage;
    },
    refetchInterval: 1000 * 60,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    staleTime: 30000,
  });
}

export function usePostCommunityMutation() {
  const { refetch } = useCommunityPostQuery();
  const navigate = useNavigate();
  return useMutation((data: FormData) => postCommunityPostAxios(accessToken, data), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: async () => {
      console.log('게시글이 등록되었습니다.');
      refetchNew = `newPost${Date.now()}`;
      await refetch();
      navigate('/community/all');
    },
  });
}

export function useUpdateCommunityMutation(postId: number) {
  const { refetch } = useCommunityPostQuery();
  const navigate = useNavigate();
  return useMutation((data: FormData) => updateCommunityPostAxios(accessToken, data, postId), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: async () => {
      console.log('게시글이 수정되었습니다.');
      refetchNew = `updatePost${Date.now()}`;
      await refetch();
      navigate('/community/all');
    },
  });
}

export function useDeleteCommunityMutation(id: number) {
  const { refetch } = useCommunityPostQuery();
  const navigate = useNavigate();
  return useMutation(() => deleteCommunityPostAxios(accessToken, id), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: async () => {
      console.log('게시글 삭제 요청이 실행되었습니다.');
      refetchNew = `deletePost${Date.now()}`;
      await refetch();
      navigate('/community/all');
    },
  });
}

export function useCommunityLikeMutation(postId: number) {
  const { refetch: detailRefetch } = useCommunityDetailQuery(postId);
  // const { refetch: allListRefetch } = useCommunityPostQuery();

  return useMutation(() => postCommunityLikeAxios(accessToken, postId), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: async () => {
      detailRefetch();
      console.log('좋아요 상태 변경 반영됨');
    },
  });
}

export function useCommunityScrapMutation(postId: number) {
  const { refetch } = useMyScrapsQuery('POST_DATE,DESC');
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
