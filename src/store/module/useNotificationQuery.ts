import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import getNotificationListAxios from '../../apiFetcher/notificationInfo/getNotificationList';
import putNotificationStatusAxios from '../../apiFetcher/notificationInfo/putNotificationStatus';
import deleteNotificationAxios from '../../apiFetcher/notificationInfo/deleteNotification';
import { accessToken } from '../../main';
import postNotificationTokenAxios from '../../apiFetcher/notificationInfo/postNotificationToken';
import { notificationDataType } from '../../components/notification/_Notification.interface';
import deleteReadAllNotificationAxios from '../../apiFetcher/notificationInfo/deleteReadAllNotification';
import getUnreadNotificationCount from '../../apiFetcher/notificationInfo/getUnreadNotificationCount';

export function useNotificationListQuery() {
  return useInfiniteQuery(['NotificationList'], ({ pageParam = 0 }) => getNotificationListAxios(accessToken, pageParam), {
    getNextPageParam: (prevData, allPages) => {
      const lastPage: boolean = prevData.last;
      const nextPage: number = allPages.length;
      return lastPage ? undefined : nextPage;
    },
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
}

export function useNotificationStatusMutation() {
  const { refetch: notificationListRefetch } = useNotificationListQuery();
  const { refetch: unreadNotificationRefetch } = useUnreadNotificationCountQuery();
  return useMutation((notiId: string) => putNotificationStatusAxios(accessToken, notiId), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('읽음처리가 완료되었습니다.');
      notificationListRefetch();
      unreadNotificationRefetch();
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

export function useUnreadNotificationCountQuery() {
  return useQuery(['newsDetail'], () => getUnreadNotificationCount(accessToken), {
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
}

export function useDeleteReadAllNotificationMutation() {
  return useMutation(() => deleteReadAllNotificationAxios(accessToken), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('모든 읽은 알림 삭제가 완료되었습니다.');
    },
  });
}
