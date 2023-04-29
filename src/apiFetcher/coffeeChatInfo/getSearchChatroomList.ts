import { ChatroomListType } from '../../components/coffeeChat/_CoffeeChat.interface';
import customAxios from '../customAxios';

const getSearchChatroomListAxios = async (token: string, keyword: string = '', page: number = 0, size: number = 5): Promise<ChatroomListType> => {
  return await customAxios({
    method: 'get',
    url: `/chatrooms/search?keyword=${keyword}&page=${page}&size=${size}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
};

export default getSearchChatroomListAxios;
