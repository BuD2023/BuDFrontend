/** getAllChatroomListAxios - 모든 채팅방 리스트 response의 content 타입 */
export interface ChatroomListContentType {
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

/** getAllChatroomListAxios / getSearchChatroomListAxios - 채팅방 리스트 response 타입 */
export interface ChatroomListType {
  content: ChatroomListContentType[];
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

/** postChatroomAxios - 채팅방 생성할 때 보내는 data 타입 */
export interface postChatroomData {
  title: string;
  description: string;
  hashTag?: string[];
}
