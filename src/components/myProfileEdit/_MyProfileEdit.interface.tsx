import { UserInfoEditInitialType } from '../../pages/profile/MyProfileEdit';

/** ChangeIntroduction - 나의 프로필 소개글 수정할 때 사용하는 props 타입 */
export interface ChangeIntroductionPropsType {
  readonly introduction: string;
  setIntroduction: (x: string) => void;
}

/** ChangeJob - 나의 프로필 관심 직무 수정할 때 사용하는 props 타입 */
export interface ChangeJobPropsType {
  readonly selectedJob: UserInfoEditInitialType;
  setSelectedJob: (x: UserInfoEditInitialType) => void;
}

/** ChangeNickName - 나의 프로필 닉네임 수정할 때 사용하는 props 타입 */
export interface ChangeNickNamePropsType {
  readonly nickName: string;
  setNickName: (x: string) => void;
}

/** ChangeProfilePic - 나의 프로필 이미지 수정할 때 사용하는 props 타입 */
export interface ChangeProfilePicPropsType {
  readonly profileImg: string | Blob | ArrayBuffer | null;
  setProfileImg: (x: string | Blob | ArrayBuffer | null) => void;
  readonly userInfo: UserInfoEditInitialType;
  setUserInfo: (x: UserInfoEditInitialType) => void;
  setPictureSet?: (x: boolean) => void;
}
