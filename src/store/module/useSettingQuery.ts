import { useMutation } from '@tanstack/react-query';
import postDeleteAccountAxios from '../../apiFetcher/setting/postDeleteAccount';
import putNotificationInfoAxios from '../../apiFetcher/setting/putNotificationInfo';
import { accessToken } from '../../main';

// 설정 > 알림 설정 > 알림 푸쉬 설정 변경
export function usePutNotificationInfoMutation(userId: number, body: any) {
  return useMutation(() => putNotificationInfoAxios(accessToken, userId, body), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: async () => {
      console.log('알림 설정이 변경되었습니다.');
    },
  });
}

// 회원탈퇴
export function useDeleteAccountMutation() {
  return useMutation(() => postDeleteAccountAxios(accessToken), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: async () => {
      console.log('회원탈퇴가 완료되었습니다.');
    },
  });
}
