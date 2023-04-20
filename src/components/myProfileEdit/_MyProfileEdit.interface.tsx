/** ChangeIntroduction - 나의 프로필 소개글 수정할 때 사용하는 props 타입 */
export interface ChangeIntroductionPropsType {
  introduction: string;
  setIntroduction: (x: string) => void;
}

/** ChangeJob - 나의 프로필 관심 직무 수정할 때 사용하는 props 타입 */
export interface ChangeJobPropsType {
  selectedJob: string;
  setSelectedJob: (x: string) => void;
}

/** ChangeNickName - 나의 프로필 닉네임 수정할 때 사용하는 props 타입 */
export interface ChangeNickNamePropsType {
  nickName: string;
  setNickName: (x: string) => void;
}

/** ChangeProfilePic - 나의 프로필 이미지 수정할 때 사용하는 props 타입 */
export interface ChangeProfilePicPropsType {
  profileImg: string | ArrayBuffer | null;
  setProfileImg: (x: string | ArrayBuffer | null) => void;
}
