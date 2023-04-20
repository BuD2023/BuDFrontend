/** 게시글 종류(FEED, QNA) 타입 */
export type postType = 'FEED' | 'QNA';

/** 게시글 활성/비활성 상태 타입 */
export type PostStatusType = 'ACTIVE' | 'INACTIVE';

/** 게시물 형식 및 종류 */

export type postingInfoType = 'ROOM_CREATE' | 'POST_UPDATE' | 'POST_CREATE' | 'ANSWER_CREATE' | 'ANSWER_UPDATE';

/** 인기순 좋아요순 최신순 정렬 타입 */
export type SortType = 'HIT' | 'LIKE' | 'DATE';

/** 내림차순 오름차순 정렬 타입 */
export type OrderType = 'DESC' | 'ASC';

export interface SortAndOrderType {
  sort: SortType;
  order: OrderType;
}
/** 게시물 정렬 boolean 값 타입 */
export interface PostSortType {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
/** 멤버 레벨 타입. 속성 다 없을 수 있으니, Partial<MemberLevelType> 쓰기 권장*/
export interface MemberLevelType {
  createdAt: string;
  updatedAt: string;
  id: number;
  levelNumber: number;
  levelCode: string;
  levelStartCommitCount: number;
  nextLevelStartCommitCount: number;
  imagePath: string;
  blankImagePath: null;
}

/** Pageable 타입. Partial<CommunityPostPageableType> 쓰기 권장 */
export interface CommunityPostPageableType {
  sort: PostSortType;
  offset: number;
  pageNumber: Number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

/** getCommunityPostAxios - 커뮤니티 post 불러올때 response의 content 안의 member(유저정보) 타입 */
export interface CommunityPostListContentMemberType {
  createdAt: string;
  updatedAt: string;
  id: number;
  userId: string;
  level: Partial<MemberLevelType>;
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
  member: CommunityPostListContentMemberType;
  title: string;
  imageUrls: string[];
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
  pageable: CommunityPostPageableType;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: PostSortType;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

/** getCommunityDetailAxios - 커뮤니티 디테일 게시물에 대한 response의 member 타입*/
export interface CommunityDetailListContentMemberType {
  createdAt: string;
  updatedAt: string;
  id: number;
  userId: string;
  level: Partial<MemberLevelType>;
  nickname: string;
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

/** getCommunityDetailAxios - 커뮤니티 디테일 게시물에 대한 response 타입*/
export interface getCommunityDetailType {
  id: number;
  title: string;
  member: CommunityDetailListContentMemberType;
  imageUrls: null[] | string[];
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
  pageable: Partial<CommunityPostPageableType>;
  size: number;
  sort: PostSortType;
}
