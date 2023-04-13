import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { deleteCommunityPostAxios } from '../../apiFetcher/communityInfo/deleteCommunityPost';
import getCommunityPostAxios from '../../apiFetcher/communityInfo/getCommunityPost';
import postCommunityPostAxios, { CreateCommunityPostType } from '../../apiFetcher/communityInfo/postCommunityPost';
import updateCommunityPostAxios, { UpdateCommunityPostType } from '../../apiFetcher/communityInfo/updateCommunityPost';
import { accessToken } from '../../main';

export type SortType = 'HIT' | 'LIKE' | 'DATE';
export type OrderType = 'ASC' | 'DESC';

export function useCommunityPostQuery(word?: string, sort?: SortType, order?: OrderType, page?: number, size?: number) {
  return useInfiniteQuery(['Community', word, sort, order], () => getCommunityPostAxios(accessToken, word, sort, order, page, size), {
    getNextPageParam: (prevData, allPages) => {
      const maxPages = prevData.totalPages;
      const nextPage = allPages.length + 1;
      return nextPage < maxPages ? nextPage : undefined;
    },
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
  return useMutation((data: FormData) => postCommunityPostAxios(accessToken, data), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('요청이 실행되었습니다.');
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
  return useMutation(() => deleteCommunityPostAxios(accessToken, id), {});
}
