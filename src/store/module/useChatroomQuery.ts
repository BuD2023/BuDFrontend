import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import getChatroomInfoAxios from '../../apiFetcher/coffeeChatInfo/getChatroomInfo';
import getChatroomStatusAxios from '../../apiFetcher/coffeeChatInfo/getChatroomStatus';
import getAllMyChatroomListAxios from '../../apiFetcher/coffeeChatInfo/getMyChatroomList';
import { accessToken } from '../../main';

export function useMyChatroomListQuery(chatRoomId: number, size?: number) {
  return useInfiniteQuery(['myChatroomList', 'all', chatRoomId], ({ pageParam = 0 }) => getAllMyChatroomListAxios(accessToken, pageParam, chatRoomId, size), {
    getNextPageParam: (prevData, allPages) => {
      const lastPage = prevData.last;
      const nextPage = allPages.length + 1;
      return lastPage ? undefined : nextPage;
    },
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0,
    staleTime: 0,
    cacheTime: 1000 * 60 * 1,
  });
}

export function useChatroomDetailQuery(chatRoomId: number) {
  return useQuery(['chatroomInfo', chatRoomId], () => getChatroomInfoAxios(accessToken, chatRoomId), {
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0,
    staleTime: 0,
    cacheTime: 1000 * 60 * 1,
  });
}

export function useChatroomStatusQuery() {
  return useQuery(['chatroomStatus'], () => getChatroomStatusAxios(accessToken), {
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0,
    staleTime: 0,
    cacheTime: 1000 * 60 * 1,
  });
}
