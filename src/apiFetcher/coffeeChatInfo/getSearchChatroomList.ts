import customAxios from '../customAxios';
import { ChatroomListType } from './getAllChatroomList';

const getSearchChatroomListAxios = async (token: string, keyword: string = '', page: number = 0, size: number = 5): Promise<ChatroomListType> => {
  return await customAxios({
    method: 'get',
    url: `/chatrooms/search?keyword=${keyword}&page=${page}&size=${size}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getSearchChatroomListAxios;
