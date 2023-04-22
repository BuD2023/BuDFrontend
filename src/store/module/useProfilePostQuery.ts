import { useInfiniteQuery } from '@tanstack/react-query';
import getProfilePostList from '../../apiFetcher/userInfo/getProfilePostList';
import { accessToken } from '../../main';

export function useProfilePostQuery(userId: number, postType?: string, sort?: string) {
  return useInfiniteQuery(['userProfile', userId, sort, postType], ({ pageParam = 0 }) => getProfilePostList(accessToken, userId, postType, pageParam, sort), {
    getNextPageParam: (prevData, allPages) => {
      const maxPages = prevData.last;
      const nextPage = allPages.length;
      return maxPages ? undefined : nextPage;
    },
    enabled: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });
}
