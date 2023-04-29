import { myChatroomListType } from '../../components/chatRoom/_ChatRoom.interface';
import customAxios from '../customAxios';

const getAllMyChatroomListAxios = async (token: string, page: number = 0, chatRoomId: number, size: number = 10): Promise<myChatroomListType> => {
  const response = (await customAxios({
    method: 'get',
    url: `/chatrooms/${chatRoomId}/chats?page=${page}&size=${size}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })) as myChatroomListType;
  return response;
};

export default getAllMyChatroomListAxios;
