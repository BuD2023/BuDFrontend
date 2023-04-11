import axios from 'axios';
import { createDataType } from '../store/testUseMutation';

// 매개변수로 post할 데이터를 객체로 받는 fetcher 함수
export const mutatePassengerData = async (passengerInfo: createDataType) => {
  try {
    const res = await axios.post('https://api.instantwebtools.net/v1/passenger', passengerInfo);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
