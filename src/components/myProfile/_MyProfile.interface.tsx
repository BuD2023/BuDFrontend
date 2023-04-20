import { PostStatusType, postType } from '../community/_Community.interface';

/** 일반적인 userList 타입 */
export interface CommonUserListType {
  id: number;
  description: string;
  isFollowing: boolean;
  nickName: string;
  userId: string;
  profileUrl: string;
}

/** getMyFollowList - 나의 팔로우 리스트 가져올 때 사용하는 response 타입 */
export interface MyFollowListType {
  description: string | null;
  id: number;
  isFollowing: boolean;
  nickName: string;
  profileUrl: string | null;
  userId: string;
}

/** getMyFollowerList - 나의 팔로우 리스트 가져올 때 사용하는 response 타입 */

/** getMyProfileInfo - 나의 프로필 정보 가져올 때 사용하는 response 타입 */
export interface MyProfileType {
  id: number;
  userId: string;
  nickName: string;
  description: string;
  level: number;
  numberOfFollowers: number;
  numberOfFollows: number;
  numberOfPosts: number;
  profileUrl: string;
  isFollowing: boolean;
  isReader: boolean;
}

/** getMyScrapList - ScrapPostProps의 member 타입 */
export interface memberType {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  addInfoYn: boolean;
  authorities: {
    authority: string;
  }[];
  createdAt: string;
  credentialNonExpired: boolean;
  enabled: boolean;
  id: number;
  introduceMessage: null | string;
  job: null | string;
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
  oauthAccessToken: string;
  password: null | string;
  profileImg: null | string;
  status: string;
  updatedAt: string;
  userId: string;
  username: string;
}

/** getMyScrapList - ScrpListType의 content 타입 */
export interface ScrapPostPropsType {
  createdAt: string;
  id: number;
  post: {
    id: number;
    member: memberType;
    title: string;
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
  };
}

/** getMyScrapList - 나의 스크랩 리스트 가져올 때 사용하는 response 타입 */
export interface ScrpListType {
  content: ScrapPostPropsType[];
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

/** MyProfileHeader - 나의 프로필 헤더에 사용하는 props 타입 */
export interface MyProfileHeaderPropsType {
  userId: string;
  nickName: string;
  description: string;
  profileUrl: string;
  isLoading: boolean;
}

/** MyProfileInfo - 나의 프로필 정보에 사용하는 props 타입 */
export interface MyProfileInfoPropsType {
  level: number;
  followers: number;
  follows: number;
  posts: number;
  isLoading: boolean;
}

/** MyProfileMenu - 나의 프로필 메뉴에 사용하는 props 타입 */
export interface MyProfileMenuPropsType {
  postView: string;
  setPostView: React.Dispatch<React.SetStateAction<string>>;
}
