import { chatroomInfoType } from '../../components/chatRoom/_ChatRoom.interface';
import customAxios from '../customAxios';

const getChatroomInfoAxios = async (token: string, page: number = 0): Promise<chatroomInfoType> => {
  const response = (await customAxios({
    method: 'get',
    url: `/chatrooms/${page}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })) as chatroomInfoType;
  return response;
};

export default getChatroomInfoAxios;
