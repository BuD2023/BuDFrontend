import customAxios from '../customAxios';
import { ChatroomListType } from '../../components/coffeeChat/_CoffeeChat.interface';

const getAllChatroomListAxios = async (token: string, page: number = 0): Promise<ChatroomListType> => {
  const response = (await customAxios({
    method: 'get',
    url: `/chatrooms/?page=${page}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })) as ChatroomListType;
  return response;
};

export default getAllChatroomListAxios;
