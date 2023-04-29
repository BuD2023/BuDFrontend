import { useInfiniteQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import getProfilePostList from '../../apiFetcher/userInfo/getProfilePostList';
import { OrderType, SortType } from '../../components/community/_Community.interface';
import { loginUserInfo } from '../recoil/user';

export function useProfilePostQuery(userId: number, postType?: string, sort?: SortType, order?: OrderType) {
  const loginUser = useRecoilValue(loginUserInfo);
  return useInfiniteQuery(['userProfile', userId, sort, postType, order], ({ pageParam = 0 }) => getProfilePostList(loginUser?.token as string, userId, postType, pageParam, sort, order), {
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
