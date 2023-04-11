import { useMutation, useQuery } from '@tanstack/react-query';
import getAllChatroomList from '../../apiFetcher/coffeeChatInfo/getAllChatroomList';
import postChatroomAxios from '../../apiFetcher/coffeeChatInfo/postChatroom';
import { accessToken } from '../../main';

export function useAllChatroomQuery() {
  return useQuery(['coffeeChatList', 'all'], () => getAllChatroomList(accessToken), {
    // enabled: true,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 3, // 실패시 재호출 몇번 할지
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}

export function useCreateRoomMutation() {
  return useMutation(postChatroomAxios, {
    onError: (err) => {
      console.log(err);
    },
    onSettled: () => {
      console.log('요청이 실행되었습니다.');
    },
  });
}
