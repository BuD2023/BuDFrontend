import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import getChatroomInfoAxios from '../../apiFetcher/coffeeChatInfo/getChatroomInfo';
import getChatroomStatusAxios from '../../apiFetcher/coffeeChatInfo/getChatroomStatus';
import getChatUserListAxios from '../../apiFetcher/coffeeChatInfo/getChatUserList';
import getIsCheckHostAxios from '../../apiFetcher/coffeeChatInfo/getIsCheckHost';
import getAllMyChatroomListAxios from '../../apiFetcher/coffeeChatInfo/getMyChatroomList';
import postNewChatroomHostAxios from '../../apiFetcher/coffeeChatInfo/postNewChatroomHost';
import { loginUserInfo } from '../recoil/user';

// 내 채팅방 메세지 리스트 get
export function useMyChatroomListQuery(chatRoomId: number, size?: number) {
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useInfiniteQuery(['myChatroomList', 'all', chatRoomId], ({ pageParam = 0 }) => getAllMyChatroomListAxios(loginUser?.token as string, pageParam, chatRoomId, size), {
    getNextPageParam: (prevData, allPages) => {
      const lastPage = prevData.last;
      const nextPage = allPages.length;
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

// 채팅방 상세정보
export function useChatroomDetailQuery(chatRoomId: number) {
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useQuery(['chatroomInfo', chatRoomId], () => getChatroomInfoAxios(loginUser?.token as string, chatRoomId), {
    enabled: false,
    retry: 0,
    staleTime: 0,
    cacheTime: 1000 * 60 * 5,
  });
}

// 채팅방 상태 정보
export function useChatroomStatusQuery() {
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useQuery(['chatroomStatus'], () => getChatroomStatusAxios(loginUser?.token as string), {
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
  });
}

// 채팅방 참여 유저 리스트
export function useChatUserListQuery(chatroomId: number) {
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useQuery(['chatUser', chatroomId], () => getChatUserListAxios(loginUser?.token as string, chatroomId), {
    enabled: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });
}

// 채팅방 참여 유저 리스트
export function useIsCheckHostQuery(chatroomId: number, userId: number) {
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useQuery(['isCheckHost', chatroomId, userId], () => getIsCheckHostAxios(loginUser?.token as string, chatroomId, userId), {
    enabled: false,
  });
}

// 채팅방 호스트 변경
export function useNewChatroomHostMutation(chatroomId: number) {
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useMutation((userId: number) => postNewChatroomHostAxios(loginUser?.token as string, chatroomId, userId), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: async () => {
      console.log(`호스트가 변경되었습니다.`);
    },
  });
}
