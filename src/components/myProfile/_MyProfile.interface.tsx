import { CommunityPostPageableType, MemberLevelType, PostSortType, PostStatusType, postType } from '../community/_Community.interface';

/** 일반적인 userList 타입 */
export interface CommonUserListType {
  readonly id: number;
  readonly description: string;
  readonly isFollowing: boolean;
  readonly nickName: string;
  readonly userId: string;
  readonly profileUrl: string;
}

/** getMyFollowList / getMyFollowerList - 나의 팔로우 / 팔로워 리스트 가져올 때 사용하는 response 타입 */
export interface MyFollowListType {
  readonly description: string | null;
  readonly id: number;
  readonly isFollowing: boolean;
  readonly nickName: string;
  readonly profileUrl: string | null;
  readonly userId: string;
}

/** getMyFollowerList - 나의 팔로우 리스트 가져올 때 사용하는 response 타입 */

/** getMyProfileInfo - 나의 프로필 정보 가져올 때 사용하는 response 타입 */
export interface MyProfileType {
  readonly id: number;
  readonly job: string;
  readonly userId: string;
  readonly nickName: string;
  readonly description: string;
  readonly level: number;
  readonly numberOfFollowers: number;
  readonly numberOfFollows: number;
  readonly numberOfPosts: number;
  readonly profileUrl: string;
  readonly isFollowing: boolean;
  readonly isReader: boolean;
  readonly memberStatus: null;
}

/** getMyScrapList - ScrapPostProps의 member 타입 */
export interface memberType {
  readonly accountNonExpired: boolean;
  readonly accountNonLocked: boolean;
  readonly addInfoYn: boolean;
  readonly authorities: {
    readonly authority: string;
  }[];
  readonly createdAt: string;
  readonly credentialNonExpired: boolean;
  readonly enabled: boolean;
  readonly id: number;
  readonly introduceMessage: null | string;
  readonly job: null | string;
  readonly level: Partial<MemberLevelType>;
  readonly nickName: string;
  readonly oauthAccessToken: string;
  readonly password: null | string;
  readonly profileImg: null | string;
  readonly status: string;
  readonly updatedAt: string;
  readonly userId: string;
  readonly username: string;
}

/** getMyScrapList - ScrpListType의 content 타입 */
export interface ScrapPostContentType {
  readonly createdAt: string;
  readonly postId: number;
  readonly commentCount: number;
  readonly content: string;
  readonly title: string;
  readonly imageUrls: [] | string[];
  readonly follow: boolean;
  readonly like: boolean;
  readonly likeCount: number;
  readonly scrapCount: number;
  readonly hitCount: number;
  readonly postStatus: PostStatusType;
  readonly postType: postType;
  readonly updatedAt: string;
  readonly postRegisterMemberId: number;
  readonly postRegisterMemberNickname: string;
  readonly postRegisterMemberProfileImg: string;
  readonly postRegisterMemberStatus: string;
}

/** getMyScrapList - 나의 스크랩 리스트 가져올 때 사용하는 response 타입 */
export interface ScrapListType {
  readonly content: ScrapPostContentType[];
  readonly empty: boolean;
  readonly first: boolean;
  readonly last: boolean;
  readonly number: number;
  readonly numberOfElements: number;
  readonly pageable: Partial<CommunityPostPageableType>;
  readonly size: number;
  readonly sort: PostSortType;
}

/** MyProfileHeader - 나의 프로필 헤더에 사용하는 props 타입 */
export interface MyProfileHeaderPropsType {
  readonly userId: string;
  readonly nickName: string;
  readonly description: string;
  readonly profileUrl: string;
  readonly isLoading: boolean;
  readonly job: string;
}

/** MyProfileInfo - 나의 프로필 정보에 사용하는 props 타입 */
export interface MyProfileInfoPropsType {
  readonly level: number;
  readonly followers: number;
  readonly follows: number;
  readonly posts: number;
  readonly isLoading: boolean;
}

/** MyProfileMenu - 나의 프로필 메뉴에 사용하는 props 타입 */
export interface MyProfileMenuPropsType {
  readonly postView: string;
  setPostView: React.Dispatch<React.SetStateAction<string>>;
}

/** getProfilePostList - 작성한 게시글 리스트 가져올 때 사용하는 response 타입 */
export interface FeedPostType {
  readonly content: FeedPostContentPropsType[];
  readonly empty: boolean;
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
  readonly totalElements: number;
  readonly totalPages: number;
}

/** getProfilePostList - FeedPostType의 content 타입 */
export interface FeedPostContentPropsType {
  readonly commentCount: number;
  readonly content: string;
  readonly createdAt: string;
  readonly follow: boolean;
  readonly hitCount: number;
  readonly postId: number;
  readonly imageUrls: null[] | string[];
  readonly like: boolean;
  readonly likeCount: number;
  readonly postStatus: PostStatusType;
  readonly postType: postType;
  readonly scrap: boolean;
  readonly scrapCount: number;
  readonly title: string;
  readonly updatedAt: string;
}

/** FeedPostFormat - FeedPostFormat에 사용하는 props 타입 */
export interface FeedPostFormatProps {
  readonly resultData: FeedPostContentPropsType[];
  readonly type: string;
}
