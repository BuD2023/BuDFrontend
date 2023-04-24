import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import getChatroomInfoAxios from '../../apiFetcher/coffeeChatInfo/getChatroomInfo';
import getChatroomStatusAxios from '../../apiFetcher/coffeeChatInfo/getChatroomStatus';
import getChatUserListAxios from '../../apiFetcher/coffeeChatInfo/getChatUserList';
import getAllMyChatroomListAxios from '../../apiFetcher/coffeeChatInfo/getMyChatroomList';
import postNewChatroomHostAxios from '../../apiFetcher/coffeeChatInfo/postNewChatroomHost';
import { accessToken } from '../../main';

// 내 채팅방 메세지 리스트 get
export function useMyChatroomListQuery(chatRoomId: number, size?: number) {
  return useInfiniteQuery(['myChatroomList', 'all', chatRoomId], ({ pageParam = 0 }) => getAllMyChatroomListAxios(accessToken, pageParam, chatRoomId, size), {
    getNextPageParam: (prevData, allPages) => {
      const lastPage = prevData.last;
      const nextPage = allPages.length + 1;
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
  return useQuery(['chatroomInfo', chatRoomId], () => getChatroomInfoAxios(accessToken, chatRoomId), {
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: 0,
    cacheTime: 1000 * 60 * 5,
  });
}

// 채팅방 상태 정보
export function useChatroomStatusQuery() {
  return useQuery(['chatroomStatus'], () => getChatroomStatusAxios(accessToken), {
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
  });
}

// 채팅방 참여 유저 리스트
export function useChatUserListQuery(chatroomId: number) {
  return useQuery(['chatUser', chatroomId], () => getChatUserListAxios(accessToken, chatroomId), {
    enabled: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });
}

// 채팅방 호스트 변경
export function useNewChatroomHostMutation(chatroomId: number) {
  return useMutation((userId: number) => postNewChatroomHostAxios(accessToken, chatroomId, userId), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: async () => {
      console.log(`호스트가 변경되었습니다.`);
    },
  });
}
