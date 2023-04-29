import { chatroomsStatusType } from '../../components/chatRoom/_ChatRoom.interface';
import customAxios from '../customAxios';

const getChatroomStatusAxios = async (token: string): Promise<chatroomsStatusType> => {
  const response = (await customAxios({
    method: 'get',
    url: `/chatrooms/status`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })) as chatroomsStatusType;
  return response;
};

export default getChatroomStatusAxios;
