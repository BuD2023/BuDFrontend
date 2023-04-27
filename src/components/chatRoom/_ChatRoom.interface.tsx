/** common Chatroom Type - 채팅 종류 */
export type chatType = 'IMAGE' | 'MESSAGE' | 'ENTER' | 'EXIT' | 'EXPIRE';

/** 실시간으로 유저의 채팅방 등 퇴장, 혹은 호스트의 퇴장을 알려주는 메세지 타입 */
export interface InfoMessageType {
  readonly chatroomId: number;
  readonly chatType: chatType;
  readonly numberOfMembers: number;
}

/** 실시간 채팅 메세지 타입 */
export interface ChatMessageType {
  readonly chatId: number;
  readonly chatType: chatType;
  readonly chatroomId: number;
  readonly createdAt: string;
  readonly message: string;
  readonly userProfileUrl?: string;
  readonly numberOfMembers: number;
  readonly userId: number;
  readonly userName: string;
}

/** getAllMyChatroomListAxios - 내 채팅방의 메세지 리스트 가져올 때 response의 content 타입 */
export interface myChatroomListContentType {
  readonly chatroomId: null | number;
  readonly chatId: number;
  readonly message: string;
  readonly chatType: chatType;
  readonly createdAt: string;
  readonly userProfileUrl: string;
  readonly userName: string;
  readonly userId: number;
}

/** getAllMyChatroomListAxios - 내 채팅방의 메세지 리스트 가져올 때 response 타입 */
export interface myChatroomListType {
  readonly content: myChatroomListContentType[];
  readonly pageable: string;
  readonly hasNext: boolean;
  readonly sort: {
    readonly orders: string;
    readonly empty: boolean;
    readonly sorted: boolean;
    readonly unsorted: boolean;
  };
  readonly size: number;
  readonly number: number;
  readonly first: boolean;
  readonly numberOfElements: number;
  readonly last: boolean;
  readonly empty: boolean;
}

/** getChatroomInfoAxios - 채팅방 기본 정보 */
export interface chatroomInfoType {
  readonly chatRoomId: number;
  readonly title: string;
  readonly numberOfMembers: number;
  readonly description: string;
  readonly hashTags: string[];
  readonly createdAt: string;
  readonly hostName: string;
  readonly hostProfileUrl: string;
  readonly hostId: number;
}

/** getChatUserListAxios - 채팅방의 유저리스트 정보 */
export interface chatroomUserListType {
  readonly id: number;
  readonly userId: string;
  readonly nickName: string;
  readonly description: string;
  readonly isReader: boolean;
  readonly isFollowing: boolean;
  readonly profileUrl: string;
}

/** getChatroomStatusAxios - 채팅방 헤더에 들어갈 간략한 정보 */
export interface chatroomsStatusType {
  readonly numberOfChatRooms: number;
  readonly numberOfUsers: number;
}

/** RoomChats 컴포넌트의 props 타입 */
export interface RoomChatsPropsType {
  readonly hostInfo: { id: number; nickName: string };
  readonly messageList: myChatroomListContentType[];
  readonly newChatMessages: Partial<ChatMessageType>[];
  readonly hasNextPage: boolean;
  readonly isFetching: boolean;
  readonly isFetchingNextPage: boolean;
  readonly fetchNextPage: () => void;
}
