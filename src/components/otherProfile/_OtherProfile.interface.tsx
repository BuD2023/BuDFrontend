/** getUserFollowList / getUserFollowerList - 타인 팔로우 / 팔로워 리스트 가져올 때 사용하는 response 타입 */
export interface UserFollowListType {
  readonly description: string | null;
  readonly id: number;
  readonly isFollowing: boolean;
  readonly isReader: boolean;
  readonly nickName: string;
  readonly profileUrl: string | null;
  readonly userId: string;
}

/** getUserProfileInfo - 타인 프로필 정보 가져올 때 사용하는 response 타입 */
export interface UserProfileType {
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
  readonly memberStatus: string;
}

/** OtherProfileHeader - 타인 프로필 헤더에 사용하는 props 타입 */
export interface UserProfileHeaderPropsType {
  readonly userId: string;
  readonly job: string;
  readonly nickName: string;
  readonly description: string;
  readonly profileUrl: string;
  readonly isLoading: boolean;
  readonly memberStatus: string;
}

/** OtherProfileInfo - 타인 프로필 정보에 사용하는 props 타입  */
export interface OtherProfileInfoPropsType {
  readonly numberOfPosts: number;
  readonly numberOfFollowers: number;
  readonly numberOfFollows: number;
  readonly level: number;
  readonly isFollowing: boolean;
  readonly isLoading: boolean;
  readonly memberStatus: string;
}

/** OtherProfileMenu - 타인 프로필 메뉴에 사용하는 props 타입 */
export interface OtherProfileMenuPropsType {
  readonly postView: string;
  setPostView: (x: string) => void;
  readonly id: string | undefined;
}
