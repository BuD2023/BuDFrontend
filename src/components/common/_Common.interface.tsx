import { IconType } from 'react-icons/lib';
import { ReactElement, RefObject } from 'react';
import { postingInfoType, postType, SortAndOrderType } from '../community/_Community.interface';
import { SetNotificationType } from '../SignUp/_SignUp.interface';
import { ScrapPostPropsType } from '../myProfile/_MyProfile.interface';

/** AddBtn - 컴포넌트 props 타입 */
export interface AddBtnPropsType {
  url: string;
  text: string;
}

/** AlertModal - 컴포넌트 props 타입 */
export interface AlertModalPropsType {
  alertModal: boolean;
  setAlertModal: (x: boolean) => void;
  title: string;
  des: string;
  action?: () => void;
}

/** CheckBoxModal - 컴포넌트 props 타입 */
export interface CheckModalPropsType {
  checkModal: boolean;
  setCheckModal: (x: boolean) => void;
  getModalAnswer: (x: SetNotificationType) => void;
  action?: () => void;
}

/** ConfirmModal 컴포넌트 props 타입 */
export interface ConfirmModalPropsType {
  confirmModal: boolean;
  setConfirmModal: (x: boolean) => void;
  getModalAnswer: (x: boolean) => void;
  title: string;
  des: string;
  confirmBtn: string;
  action?: () => void;
}

/** EditDeleteBtn 컴포넌트 props 타입 */
export interface EditDeleteBtnPropsType {
  postId: string;
  setIsMenu: (x: boolean) => void;
}

/** Header 컴포넌트 props 타입 -  */
export interface CommonHeaderType {
  type?: string;
  title?: string;
  restart?: boolean;
  icon?: ReactElement<IconType>;
  onSubmit?: object;
  postId?: string;
  copyUrl?: string;
  answerPin?: boolean;
}

/** ImagePeek - 이미지 미리보기 컴포넌트에 들어가는 props 타입 */
export interface ImagePeekPropsType {
  imgPeek: string[] | ArrayBuffer[] | null[];
  setIsPicPopUp: (x: { open: boolean; pic: string }) => void;
}

/** LikeCommentScrap 컴포넌트 props 타입 */
export interface LikeCommentScrapPropsType {
  postType: postType;
  likeCount: number;
  commentCount: number;
  postId: number;
}

/** ScrapPostFormat 캄포넌트 props 타입 */
export interface ScrapPostFormatPropsType {
  resultData: ScrapPostPropsType[];
}

/** 글작성 및 수정, 채팅방 생성시 header에 mainBtn 컴포넌트로 들어오는 onSubmit 객체의 타입 */
export interface OnSubmitType {
  postTypeInfo: postingInfoType;
  title: string;
  description: string;
  hashTag: string[];

  postId: string | number;
  content: string;
  postType: string;
  pic?: (string | ArrayBuffer | null)[];
  images?: Blob[];
  qnaAnswerId?: number;

  profileImg: string | ArrayBuffer | null;
  nickName: string;
  selectedJob: string;
}

/** MainBtn 컴포넌트 props 타입 */
export interface MainBtnPropsType {
  content: string;
  size: number;
  onSubmit?: Partial<OnSubmitType>;
}

/** PicModal 컴포넌트 props 타입 */
export interface PictureModalPropsType {
  isPicPopUp: { open: boolean; pic: string };
  setIsPicPopUp: ({}: { open: boolean; pic: string }) => void;
}

/** PostFormat 컴포넌트 props 타입 */
export interface PostFormatPropsType {
  inputValue: string;
  sortAndOrder: SortAndOrderType;
}

/** QuestionModal 컴포넌트 props 타입 */
export interface QuestionModalPropsType {
  alertModal: boolean;
  setAlertModal: (x: boolean) => void;
  title: string;
  des: string;
}

/** ScrollToBottomBtn 컴포넌트 props 타입 */
export interface ScrollToBottomBtnPropsType {
  scrollToNew: RefObject<HTMLDivElement>;
}

/** SearchBar 컴포넌트 props 타입 */
export interface ISearchBarPropsType {
  inputValue: string;
  setInputValue: (x: string) => void;
  filterKeywords?: string;
}

/** Toggle 컴포넌트 props 타입 */
export interface TogglePropsType {
  isOn: boolean;
}

/** UserListModal 컴포넌트 props 타입 */
export interface UserListModalPropsType {
  isUserList: boolean;
  setIsUserList: (x: boolean) => void;
  type: string;
  follows?: number;
}

/** UserModal 컴포넌트 props 타입 */
export interface UserModalPropsType {
  userModal: boolean;
  setUserModal: (x: boolean) => void;
  userName: string;
  userImg: string;
  userIntro: string;
  userJob: string;
}
