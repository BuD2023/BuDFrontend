/** 게시글 종류(FEED, QNA) 타입 */
export type postType = 'FEED' | 'QNA';

/** 게시글 활성/비활성 상태 타입 */
export type PostStatusType = 'ACTIVE' | 'INACTIVE';

export type postingInfoType = 'ROOM_CREATE' | 'POST_UPDATE' | 'POST_CREATE' | 'ANSWER_CREATE' | 'ANSWER_UPDATE';

/** 인기순 좋아요순 최신순 정렬 타입 */
export type SortType = 'HIT' | 'LIKE' | 'DATE';

/** 내림차순 오름차순 정렬 타입 */
export type OrderType = 'DESC' | 'ASC';

export interface SortAndOrderType {
  sort: SortType;
  order: OrderType;
}

/** getCommunityPostAxios - 커뮤니티 post 불러올때 response의 content 안의 member(유저정보) 타입 */
export interface memberType {
  createdAt: string;
  updatedAt: string;
  id: number;
  userId: string;
  level: {
    createdAt: string;
    updatedAt: string;
    id: number;
    levelNumber: number;
    levelCode: string;
    levelStartCommitCount: number;
    nextLevelStartCommitCount: number;
  };
  nickName: string;
  profileImg: null | string;
  job: null | string;
  status: string;
  introduceMessage: null | string;
  addInfoYn: boolean;
  enabled: boolean;
  oauthAccessToken: string;
  username: string;
  password: null | string;
  credentialNonExpired: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: {
    authority: string;
  }[];
}

/** getCommunityPostAxios - 커뮤니티 post 불러올때 response의 content 타입 */
export interface CommunityPostListContentType {
  id: number;
  member: memberType;
  title: string;
  imageUrls: any[];
  content: string;
  commentCount: number;
  likeCount: number;
  scrapCount: number;
  hitCount: number;
  postStatus: PostStatusType;
  postType: postType;
  createdAt: string;
  updatedAt: string;
}

/** getCommunityPostAxios - 커뮤니티 post 불러올때 response 타입 */
export interface CommunityPostListType {
  content: CommunityPostListContentType[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

/** CommunityPostAxios - 커뮤니티 게시글 수정시 넘겨주는 폼데이터로 변환하기 전 데이터 타입
 * Partial<CommunityPostType>과 같은 형태로 사용해야 함
 */
export interface CommunityPostType {
  postTypeInfo: postingInfoType;
  title: string;
  content: string;
  images: null | string[] | Blob[];
  postType: postType;
  postId: number;
}

/** postQnaAnswerAxios - QNA 답변 작성 혹은 수정시 넘겨주는 데이터, 폼데이터로 변경하기 전 상태.
 * Partial<QnaAnswerType>과 같이 사용해야 함/*/
export interface QnaAnswerType {
  postTypeInfo: postingInfoType;
  postId: number;
  qnaAnswerId: number;
  content: string;
  images: null | Blob[];
}

export interface CommentContentType {
  commentId: number;
  content: string;
  createdAt: string;
  isPinned: boolean;
  isReader: boolean;
  isReaderLiked: boolean;
  memberId: number;
  memberName: string;
  memberProfileUrl: string | null;
  numberOfLikes: number;
}

export interface CommunityCommentType {
  content: CommentContentType[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
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
