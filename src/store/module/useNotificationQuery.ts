import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import getNotificationListAxios from '../../apiFetcher/notificationInfo/getNotificationList';
import putNotificationStatusAxios from '../../apiFetcher/notificationInfo/putNotificationStatus';
import deleteNotificationAxios from '../../apiFetcher/notificationInfo/deleteNotification';
import postNotificationTokenAxios from '../../apiFetcher/notificationInfo/postNotificationToken';
import { notificationDataType } from '../../components/notification/_Notification.interface';
import deleteReadAllNotificationAxios from '../../apiFetcher/notificationInfo/deleteReadAllNotification';
import getUnreadNotificationCount from '../../apiFetcher/notificationInfo/getUnreadNotificationCount';
import putReadAllNotification from '../../apiFetcher/notificationInfo/putReadAllNotification';
import { useRecoilValue } from 'recoil';
import { loginUserInfo } from '../recoil/user';

export function useNotificationListQuery() {
  const loginUser = useRecoilValue(loginUserInfo);
  return useInfiniteQuery(['NotificationList'], ({ pageParam = 0 }) => getNotificationListAxios(loginUser?.token as string, pageParam), {
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
  const loginUser = useRecoilValue(loginUserInfo);
  const { refetch: notificationListRefetch } = useNotificationListQuery();
  const { refetch: unreadNotificationRefetch } = useUnreadNotificationCountQuery();
  return useMutation((notiId: string) => putNotificationStatusAxios(loginUser?.token as string, notiId), {
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
  const { refetch } = useNotificationListQuery();
  const loginUser = useRecoilValue(loginUserInfo);
  return useMutation((notiId: string) => deleteNotificationAxios(loginUser?.token as string, notiId), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: async () => {
      console.log('알림 삭제가 완료되었습니다.');
      await refetch();
    },
  });
}

export function useNotificationTokenMutation() {
  const loginUser = useRecoilValue(loginUserInfo);
  return useMutation((notificationData: notificationDataType) => postNotificationTokenAxios(loginUser?.token as string, notificationData), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('알림토큰전송이 완료되었습니다.');
    },
  });
}

export function useUnreadNotificationCountQuery() {
  const loginUser = useRecoilValue(loginUserInfo);
  return useQuery(['newsDetail'], () => getUnreadNotificationCount(loginUser?.token as string), {
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
}

export function useDeleteReadAllNotificationMutation() {
  const loginUser = useRecoilValue(loginUserInfo);
  return useMutation(() => deleteReadAllNotificationAxios(loginUser?.token as string), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('모든 읽은 알림 삭제가 완료되었습니다.');
    },
  });
}

export function useReadAllNotificationQuery() {
  const loginUser = useRecoilValue(loginUserInfo);
  return useMutation(() => putReadAllNotification(loginUser?.token as string), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log('알림이 모두 읽음 상태로 변경되었습니다.');
    },
  });
}
