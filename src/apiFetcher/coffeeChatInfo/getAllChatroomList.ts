import customAxios from '../customAxios';

export interface ChatroomType {
  chatRoomId: number;
  createdAt: string;
  description: string;
  hashTags: string[];
  hostId: number;
  hostName: string;
  hostProfileUrl: null | string;
  numberOfMembers: number;
  title: string;
}
export interface AllChatroomListType {
  contents: ChatroomType[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
}

const getAllChatroomListAxios = async (token: string, page: number = 0): Promise<AllChatroomListType> => {
  const response = (await customAxios({
    method: 'get',
    url: `/chatrooms/?page=${page}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })) as AllChatroomListType;
  console.log(response);
  return response;
};

export default getAllChatroomListAxios;
