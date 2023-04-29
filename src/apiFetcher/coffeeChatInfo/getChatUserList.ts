import { chatroomUserListType } from '../../components/chatRoom/_ChatRoom.interface';
import customAxios from '../customAxios';

const getChatUserListAxios = async (token: string, chatroomId: number): Promise<chatroomUserListType[]> => {
  const response = (await customAxios({
    method: 'get',
    url: `/chatrooms/${chatroomId}/users`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })) as chatroomUserListType[];
  return response;
};

export default getChatUserListAxios;
