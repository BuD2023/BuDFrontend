import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import getNotificationListAxios from '../../apiFetcher/notificationInfo/getNotificationList';
import putNotificationStatusAxios from '../../apiFetcher/notificationInfo/putNotificationStatus';
import deleteNotificationAxios from '../../apiFetcher/notificationInfo/deleteNotification';
import { accessToken } from '../../main';
import postNotificationTokenAxios from '../../apiFetcher/notificationInfo/postNotificationToken';
import { notificationDataType } from '../../components/notification/_Notification.interface';

export function useNotificationListQuery() {
  return useInfiniteQuery(['NotificationList'], ({ pageParam = 0 }) => getNotificationListAxios(accessToken, pageParam), {
    getNextPageParam: (prevData, allPages) => {
      const lastPage: boolean = prevData.last;
      const nextPage: number = allPages.length;
      return lastPage ? undefined : nextPage;
    },
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0,
    staleTime: 0,
    cacheTime: 1000 * 60,
  });
}

export function useNotificationStatusMutation() {
  const { refetch } = useNotificationListQuery();
  return useMutation((notiId: string) => putNotificationStatusAxios(accessToken, notiId), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('읽음처리가 완료되었습니다.');
      refetch();
    },
  });
}

export function useNotificationdeleteMutation() {
  return useMutation((notiId: string) => deleteNotificationAxios(accessToken, notiId), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('알림 삭제가 완료되었습니다.');
    },
  });
}

export function useNotificationTokenMutation() {
  return useMutation((notificationData: notificationDataType) => postNotificationTokenAxios(accessToken, notificationData), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('알림토큰전송이 완료되었습니다.');
    },
  });
}
