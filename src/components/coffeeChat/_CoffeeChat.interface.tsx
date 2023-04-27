/** getAllChatroomListAxios - 모든 채팅방 리스트 response의 content 타입 */
export interface ChatroomListContentType {
  readonly chatRoomId: number;
  readonly createdAt: string;
  readonly description: string;
  readonly hashTags: string[];
  readonly hostId: number;
  readonly hostName: string;
  readonly hostProfileUrl: null | string;
  readonly numberOfMembers: number;
  readonly title: string;
}

/** getAllChatroomListAxios / getSearchChatroomListAxios - 채팅방 리스트 response 타입 */
export interface ChatroomListType {
  readonly content: ChatroomListContentType[];
  readonly empty: boolean;
  readonly first: boolean;
  readonly last: boolean;
  readonly number: number;
  readonly numberOfElements: number;
  readonly pageable: {
    readonly offset: number;
    readonly pageNumber: number;
    readonly pageSize: number;
    readonly paged: boolean;
    readonly sort: {
      readonly empty: boolean;
      readonly sorted: boolean;
      readonly unsorted: boolean;
    };
    readonly unpaged: boolean;
  };
  readonly size: number;
  readonly sort: {
    readonly empty: boolean;
    readonly sorted: boolean;
    readonly unsorted: boolean;
  };
}

/** postChatroomAxios - 채팅방 생성할 때 보내는 data 타입 */
export interface postChatroomData {
  title: string;
  description: string;
  hashTag?: string[];
}

/** CoffeeChatRoom 컴포넌트 props 타입 */
export interface CoffeeChatRoomPropsType {
  readonly inputValue: string;
}

/** CoffeeTitle 컴포넌트 props 타입 */
export interface CoffeeTitlePropsType {
  readonly inputValue: string;
  readonly setInputValue: (x: string) => void;
}
