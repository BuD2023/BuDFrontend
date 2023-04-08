import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getPostData } from '../api/getPostData';

//데이터 타입 정의
export interface airlineType {
  id: number;
  name: string;
  country: string;
  logo: string;
  slogan: string;
  head_quaters: string;
  website: string;
  establoshed: string;
}
export interface passengerDataType {
  _id: string;
  name: string;
  trips: number;
  airline: airlineType[];
  __v: number;
}

export interface responseDataType {
  _id: string;
  name: string;
  country: string;
  logo: string;
}

export interface responseType {
  totalPages: number;
  totalPassengers: number;
  data: responseDataType[];
}

// useQuery 커스텀 훅
export default function usePassengerQuery() {
  // const queryClient = useQueryClient();
  // const cachedData = queryClient.getQueryData(['passengerInfo']);

  return useInfiniteQuery(['passengerInfo'], ({ pageParam = 5 }) => getPostData(pageParam), {
    getNextPageParam: (prevData, allPages) => {
      const maxPages = prevData.totalPages;
      console.log(maxPages);
      const nextPage = allPages.length + 1;
      console.log(allPages);
      console.log(nextPage);
      return nextPage < maxPages ? nextPage : undefined;
    },

    // getHasNextPage: (lastPage, allPages) => lastPage.totalPages > allPages.length,
    // enabled: true,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 3, // 실패시 재호출 몇번 할지
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
