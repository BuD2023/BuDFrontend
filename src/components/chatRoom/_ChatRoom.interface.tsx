/** common Chatroom Type - 채팅 종류 */
export type chatType = 'IMAGE' | 'MESSAGE' | 'ENTER' | 'EXIT' | 'EXPIRE';

/** getAllMyChatroomListAxios - 내 채팅방의 메세지 리스트 가져올 때 response의 content 타입 */
export interface myChatroomListContentType {
  chatroomId: null | number;
  chatId: number;
  message: string;
  chatType: chatType;
  createdAt: string;
  userProfileUrl: string;
  userName: string;
  userId: number;
}

/** getAllMyChatroomListAxios - 내 채팅방의 메세지 리스트 가져올 때 response 타입 */
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

/** getChatroomInfoAxios - 채팅방 기본 정보 */
export interface chatroomInfoType {
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

/** getChatroomStatusAxios - 채팅방 헤더에 들어갈 간략한 정보 */
export interface chatroomsStatusType {
  numberOfChatRooms: number;
  numberOfUsers: number;
}
