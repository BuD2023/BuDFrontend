import customAxios from '../customAxios';

export type chatType = 'IMAGE' | 'MESSAGE';

export interface myChatroomListContentType {
  chatroomId: null | number;
  chatId: number;
  message?: string;
  imageUrl?: string;
  chatType: chatType;
  createdAt: string;
  userProfileUrl: string;
  userName: string;
  userId: number;
}

export interface myChatroomListType {
  content: myChatroomListContentType[];
  pageable: string;
  hasNext: boolean;
  sort: {
    orders: string;
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  last: boolean;
  empty: boolean;
}

const getAllMyChatroomListAxios = async (token: string, page: number = 0, chatRoomId: number, size: number = 10): Promise<myChatroomListType> => {
  const response = (await customAxios({
    method: 'get',
    url: `/chatrooms/${chatRoomId}/chats?page=${page}&size=${size}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })) as myChatroomListType;
  return response;
};

export default getAllMyChatroomListAxios;
