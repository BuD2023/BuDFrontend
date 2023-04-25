import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import getAllChatroomListAxios from '../../apiFetcher/coffeeChatInfo/getAllChatroomList';
import getSearchChatroomListAxios from '../../apiFetcher/coffeeChatInfo/getSearchChatroomList';
import postChatroomAxios from '../../apiFetcher/coffeeChatInfo/postChatroom';
import { postChatroomData } from '../../components/coffeeChat/_CoffeeChat.interface';
import { accessToken } from '../../main';

//모든 채팅방 불러오기
export function useAllChatroomQuery() {
  return useInfiniteQuery(['coffeeChatList', 'all'], ({ pageParam = 0 }) => getAllChatroomListAxios(accessToken, pageParam), {
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
let fetchNew = '';
export function useSearchChatroomQuery(keyword?: string, size?: number) {
  return useInfiniteQuery(['coffeeChatList', 'search', keyword, fetchNew], ({ pageParam = 0 }) => getSearchChatroomListAxios(accessToken, keyword, pageParam, size), {
    getNextPageParam: (prevData, allPages) => {
      const lastPage = prevData.last;
      const nextPage = allPages.length + 1;
      return lastPage ? undefined : nextPage;
    },
    onSuccess: (result) => console.log(result),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
}

export function useCreateRoomMutation() {
  return useMutation((data: postChatroomData) => postChatroomAxios(accessToken, data), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: async () => {
      console.log('채팅방이 생성되었습니다.');
    },
  });
}
