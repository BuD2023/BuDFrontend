import { useMutation } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import postDeleteAccountAxios from '../../apiFetcher/setting/postDeleteAccount';
import putNotificationInfoAxios from '../../apiFetcher/setting/putNotificationInfo';
import { loginUserInfo } from '../recoil/user';

// 설정 > 알림 설정 > 알림 푸쉬 설정 변경
export function usePutNotificationInfoMutation(userId: number, body: any) {
  const loginUser = useRecoilValue(loginUserInfo);
  return useMutation(() => putNotificationInfoAxios(loginUser?.token as string, userId, body), {
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
  const loginUser = useRecoilValue(loginUserInfo);
  return useMutation(() => postDeleteAccountAxios(loginUser?.token as string), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: async () => {
      console.log('회원탈퇴가 완료되었습니다.');
    },
  });
}
