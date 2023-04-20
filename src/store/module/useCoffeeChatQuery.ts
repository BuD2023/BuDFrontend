import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import getAllChatroomListAxios from '../../apiFetcher/coffeeChatInfo/getAllChatroomList';
import getSearchChatroomListAxios from '../../apiFetcher/coffeeChatInfo/getSearchChatroomList';
import postChatroomAxios from '../../apiFetcher/coffeeChatInfo/postChatroom';
import { postChatroomData } from '../../components/coffeeChat/_CoffeeChat.interface';
import { accessToken } from '../../main';

export function useAllChatroomQuery() {
  return useInfiniteQuery(['coffeeChatList', 'all'], ({ pageParam = 0 }) => getAllChatroomListAxios(accessToken, pageParam), {
    getNextPageParam: (prevData, allPages) => {
      const lastPage = prevData.last;
      const nextPage = allPages.length + 1;
      return lastPage ? undefined : nextPage;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: true, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0,
    staleTime: Infinity,
    cacheTime: Infinity,
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
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: true, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    // staleTime: Infinity,
    // cacheTime: Infinity,
  });
}

export function useCreateRoomMutation() {
  const { refetch } = useSearchChatroomQuery();
  const navigate = useNavigate();
  return useMutation((data: postChatroomData) => postChatroomAxios(accessToken, data), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: async () => {
      fetchNew = `newChatroom${Date.now()}`;
      await refetch();
      navigate('/coffeeChat');
      console.log('채팅방이 생성되었습니다.');
    },
  });
}
