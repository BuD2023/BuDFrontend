import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import getNotificationListAxios from '../../apiFetcher/notificationInfo/getNotificationList';
import putNotificationStatusAxios from '../../apiFetcher/notificationInfo/putNotificationStatus';
import { accessToken } from '../../main';

export function useNotificationListQuery() {
  return useInfiniteQuery(['NotificationList'], ({ pageParam = 0 }) => getNotificationListAxios(accessToken, pageParam), {
    getNextPageParam: (prevData, allPages) => {
      const lastPage = prevData.last;
      const nextPage = allPages.length;
      return lastPage ? undefined : nextPage;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}

export function useNotificationStatusMutation() {
  return useMutation((notiId: string) => putNotificationStatusAxios(accessToken, notiId), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('읽음처리가 완료되었습니다.');
    },
  });
}
