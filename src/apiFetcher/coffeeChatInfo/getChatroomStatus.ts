import customAxios from '../customAxios';

interface chatroomsStatusType {
  numberOfChatRooms: number;
  numberOfUsers: number;
}

const getChatroomStatusAxios = async (token: string): Promise<chatroomsStatusType> => {
  const response = (await customAxios({
    method: 'get',
    url: `/chatrooms/status`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })) as chatroomsStatusType;
  return response;
};

export default getChatroomStatusAxios;
