import { myChatroomListType } from '../../components/chatRoom/_ChatRoom.interface';
import customAxios from '../customAxios';

export interface getIsCheckHostResponseType {
  id: number;
  userId: string;
  nickName: string;
  description: string;
  isHost: boolean;
}

const getIsCheckHostAxios = async (token: string, room: number, userId: number): Promise<getIsCheckHostResponseType> => {
  const response = (await customAxios({
    method: 'get',
    url: `/chatrooms/${room}/users/${userId}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })) as getIsCheckHostResponseType;
  return response;
};

export default getIsCheckHostAxios;
