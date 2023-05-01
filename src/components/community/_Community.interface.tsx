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
  readonly sort: SortType;
  readonly order: OrderType;
}
/** 게시물 정렬 boolean 값 타입 */
export interface PostSortType {
  readonly sorted: boolean;
  readonly unsorted: boolean;
  readonly empty: boolean;
}
/** 멤버 레벨 타입. 속성 다 없을 수 있으니, Partial<MemberLevelType> 쓰기 권장*/
export interface MemberLevelType {
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly id: number;
  readonly levelNumber: number;
  readonly levelCode: string;
  readonly levelStartCommitCount: number;
  readonly nextLevelStartCommitCount: number;
  readonly imagePath: string;
  readonly blankImagePath: null;
}

/** Pageable 타입. Partial<CommunityPostPageableType> 쓰기 권장 */
export interface CommunityPostPageableType {
  readonly sort: PostSortType;
  readonly offset: number;
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly paged: boolean;
  readonly unpaged: boolean;
}

/** getCommunityPostAxios - 커뮤니티 post 불러올때 response의 content 안의 member(유저정보) 타입 */
export interface CommunityPostListContentMemberType {
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly id: number;
  readonly userId: string;
  readonly level: Partial<MemberLevelType>;
  readonly nickName: string;
  readonly profileImg: null | string;
  readonly job: null | string;
  readonly status: string;
  readonly introduceMessage: null | string;
  readonly addInfoYn: boolean;
  readonly enabled: boolean;
  readonly oauthAccessToken: string;
  readonly nickname: string;
  readonly password: null | string;
  readonly credentialNonExpired: boolean;
  readonly accountNonExpired: boolean;
  readonly accountNonLocked: boolean;
  readonly authorities: {
    readonly authority: string;
  }[];
}

/** getCommunityPostAxios - 커뮤니티 post 불러올때 response의 content 타입 */
export interface CommunityPostListContentType {
  readonly follow: boolean;
  readonly scrap: boolean;
  readonly like: boolean;
  readonly id: number;
  readonly member: CommunityPostListContentMemberType;
  readonly title: string;
  readonly imageUrls: string[];
  readonly content: string;
  readonly commentCount: number;
  readonly likeCount: number;
  readonly scrapCount: number;
  readonly hitCount: number;
  readonly postStatus: PostStatusType;
  readonly postType: postType;
  readonly createdAt: string;
  readonly updatedAt: string;
}

/** getCommunityPostAxios - 커뮤니티 post 불러올때 response 타입 */
export interface CommunityPostListType {
  readonly content: CommunityPostListContentType[];
  readonly pageable: CommunityPostPageableType;
  readonly totalElements: number;
  readonly totalPages: number;
  readonly last: boolean;
  readonly size: number;
  readonly number: number;
  readonly sort: PostSortType;
  readonly numberOfElements: number;
  readonly first: boolean;
  readonly empty: boolean;
}

/** getCommunityDetailAxios - 커뮤니티 디테일 게시물에 대한 response의 member 타입*/
export interface CommunityDetailListContentMemberType {
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly id: number;
  readonly userId: string;
  readonly level: Partial<MemberLevelType>;
  readonly nickname: string;
  readonly profileImg: null | string;
  readonly job: null | string;
  readonly status: string;
  readonly introduceMessage: null | string;
  readonly addInfoYn: boolean;
  readonly enabled: boolean;
  readonly oauthAccessToken: string;
  readonly username: string;
  readonly password: null | string;
  readonly credentialNonExpired: boolean;
  readonly accountNonExpired: boolean;
  readonly accountNonLocked: boolean;
  readonly authorities: {
    readonly authority: string;
  }[];
}

/** getCommunityDetailAxios - 커뮤니티 디테일 게시물에 대한 response 타입*/
export interface getCommunityDetailType {
  readonly follow: boolean;
  readonly id: number;
  readonly title: string;
  readonly member: CommunityDetailListContentMemberType;
  readonly imageUrls: null[] | string[];
  readonly content: string;
  readonly commentCount: number;
  readonly like: boolean;
  readonly likeCount: number;
  readonly scrap: boolean;
  readonly scrapCount: number;
  readonly hitCount: number;
  readonly postStatus: PostStatusType;
  readonly postType: postType;
  readonly createdAt: string;
  readonly updatedAt: string;
}

/** CommunityPostAxios - 커뮤니티 게시글 수정시 넘겨주는 폼데이터로 변환하기 전 데이터 타입
 * Partial<CommunityPostType>과 같은 형태로 사용해야 함
 */
export interface CommunityPostType {
  readonly postTypeInfo: postingInfoType;
  readonly title: string;
  readonly content: string;
  readonly images: null | string[] | Blob[];
  readonly postType: postType;
  readonly postId: number;
}

/** postQnaAnswerAxios - QNA 답변 작성 혹은 수정시 넘겨주는 데이터, 폼데이터로 변경하기 전 상태.
 * Partial<QnaAnswerType>과 같이 사용해야 함/*/
export interface QnaAnswerType {
  readonly postTypeInfo: postingInfoType;
  readonly postId: number;
  readonly qnaAnswerId: number;
  readonly content: string;
  readonly images: null | Blob[] | string[];
}

export interface CommentContentType {
  readonly reComments: any;
  readonly commentId: number;
  readonly content: string;
  readonly createdAt: string;
  readonly isPinned: boolean;
  readonly isReader: boolean;
  readonly isReaderLiked: boolean;
  readonly memberId: number;
  readonly memberName: string;
  readonly memberProfileUrl: string | null;
  readonly numberOfLikes: number;
}

export interface CommunityCommentType {
  readonly content: CommentContentType[];
  readonly empty: boolean;
  readonly first: boolean;
  readonly last: boolean;
  readonly number: number;
  readonly numberOfElements: number;
  readonly pageable: Partial<CommunityPostPageableType>;
  readonly size: number;
  readonly sort: PostSortType;
}

/**  */
export interface commentPropsType {
  readonly content: string;
}
