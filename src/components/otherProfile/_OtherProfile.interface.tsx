/** getUserFollowerList - 타인 팔로워 리스트 가져올 때 사용하는 response 타입 */
export interface UserFollowerListType {
  description: string | null;
  id: number;
  isFollowing: boolean;
  isReader: boolean;
  nickName: string;
  profileUrl: string | null;
  userId: string;
}

/** getUserProfileInfo - 타인 프로필 정보 가져올 때 사용하는 response 타입 */
export interface UserProfileType {
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

/** OtherProfileHeader - 타인 프로필 헤더에 사용하는 props 타입 */
export interface UserProfileHeaderPropsType {
  userId: string;
  nickName: string;
  description: string;
  profileUrl: string;
  isLoading: boolean;
}

/** OtherProfileInfo - 타인 프로필 정보에 사용하는 props 타입  */
export interface OtherProfileInfoPropsType {
  numberOfPosts: number;
  numberOfFollowers: number;
  numberOfFollows: number;
  level: number;
  isFollowing: boolean;
  isLoading: boolean;
}

/** OtherProfileMenu - 타인 프로필 메뉴에 사용하는 props 타입 */
export interface OtherProfileMenuPropsType {
  postView: boolean;
  setPostView: (x: boolean) => void;
}
