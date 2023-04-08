import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { mutatePassengerData } from '../api/mutateData';

// post 할 데이터 타입 정의
export interface createDataType {
  name: string;
  trips: number;
  airline: number;
}

// useMutation 커스텀 훅
export default function usePassengerMutation() {
  const queryClient = useQueryClient();
  return useMutation(mutatePassengerData, {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (newPost) => {
      queryClient.setQueryData(['passengerInfo'], newPost);
      console.log('글이 저장되었습니다.');
    },
    onSettled: () => {
      console.log('요청이 실행되었습니다.');
    },
  });
}
