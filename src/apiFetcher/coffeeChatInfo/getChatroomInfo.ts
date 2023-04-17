import customAxios from '../customAxios';

interface chatroomInfoType {
  chatRoomId: number;
  title: string;
  numberOfMembers: number;
  description: string;
  hashTags: string[];
  createdAt: string;
  hostName: string;
  hostProfileUrl: string;
  hostId: number;
}

const getChatroomInfoAxios = async (token: string, page: number = 0): Promise<chatroomInfoType> => {
  const response = (await customAxios({
    method: 'get',
    url: `/chatrooms/${page}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })) as chatroomInfoType;
  return response;
};

export default getChatroomInfoAxios;
