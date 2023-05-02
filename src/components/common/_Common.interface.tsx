import { IconType } from 'react-icons/lib';
import { ReactElement, RefObject } from 'react';
import { postingInfoType, postType, SortAndOrderType } from '../community/_Community.interface';
import { SetNotificationType } from '../SignUp/_SignUp.interface';
import { chatroomUserListType } from '../chatRoom/_ChatRoom.interface';
import { ScrapPostContentType } from '../myProfile/_MyProfile.interface';

/** AddBtn - 컴포넌트 props 타입 */
export interface AddBtnPropsType {
  readonly url: string;
  readonly text: string;
}

/** AlertModal - 컴포넌트 props 타입 */
export interface AlertModalPropsType {
  readonly alertModal: boolean;
  readonly setAlertModal: (x: boolean) => void;
  readonly title: string;
  readonly des: string;
  readonly action?: () => void;
}

/** CheckBoxModal - 컴포넌트 props 타입 */
export interface CheckModalPropsType {
  readonly checkModal: boolean;
  readonly setCheckModal: (x: boolean) => void;
  readonly getModalAnswer: (x: SetNotificationType) => void;
  readonly action?: () => void;
}

/** ConfirmModal 컴포넌트 props 타입 */
export interface ConfirmModalPropsType {
  readonly confirmModal: boolean;
  readonly setConfirmModal: (x: boolean) => void;
  readonly getModalAnswer: (x: boolean) => void;
  readonly title: string;
  readonly des: string;
  readonly confirmBtn: string;
  readonly action?: () => void;
}

/** EditDeleteBtn 컴포넌트 props 타입 */
export interface EditDeleteBtnPropsType {
  readonly postId: string;
  readonly setIsMenu: (x: boolean) => void;
}

/** Header 컴포넌트 props 타입 -  */
export interface CommonHeaderType {
  readonly type?: string;
  readonly title?: string;
  readonly restart?: () => void;
  readonly isLoading?: boolean;
  readonly icon?: ReactElement<IconType>;
  readonly onSubmit?: object;
  readonly postId?: string;
  readonly copyUrl?: string;
  readonly answerPin?: boolean;
  readonly questionUserId?: number;
}

/** ImagePeek - 이미지 미리보기 컴포넌트에 들어가는 props 타입 */
export interface ImagePeekPropsType {
  readonly imgPeek: string[] | ArrayBuffer[] | null[];
  readonly setIsPicPopUp: (x: { open: boolean; pic: string }) => void;
}

/** LikeCommentScrap 컴포넌트 props 타입 */
export interface LikeCommentScrapPropsType {
  readonly postType: postType;
  readonly likeCount: number;
  readonly commentCount: number;
  readonly postId: number;
  readonly refetch?: () => void;
  readonly like: boolean;
  readonly scrap: boolean;
}

/** ScrapPostFormat 캄포넌트 props 타입 */
export interface ScrapPostFormatPropsType {
  readonly resultData: ScrapPostContentType[];
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

  introduceMessage: string;
  file: Blob | null;
  nickname: string;
  job: string;
  isUnique: boolean;
}

/** MainBtn 컴포넌트 props 타입 */
export interface MainBtnPropsType {
  readonly content: string;
  readonly size: number;
  readonly onSubmit?: Partial<OnSubmitType>;
}

/** PicModal 컴포넌트 props 타입 */
export interface PictureModalPropsType {
  readonly isPicPopUp: { open: boolean; pic: string };
  readonly setIsPicPopUp: ({}: { open: boolean; pic: string }) => void;
}

/** PostFormat 컴포넌트 props 타입 */
export interface PostFormatPropsType {
  readonly inputValue: string;
}

/** QuestionModal 컴포넌트 props 타입 */
export interface QuestionModalPropsType {
  readonly alertModal: boolean;
  readonly setAlertModal: (x: boolean) => void;
  readonly title: string;
  readonly des: string;
}

/** ScrollToBottomBtn 컴포넌트 props 타입 */
export interface ScrollToBottomBtnPropsType {
  readonly scrollToNew: RefObject<HTMLDivElement>;
}

/** SearchBar 컴포넌트 props 타입 */
export interface ISearchBarPropsType {
  readonly inputValue: string;
  readonly setInputValue: (x: string) => void;
}

/** Toggle 컴포넌트 props 타입 */
export interface TogglePropsType {
  readonly isOn: boolean;
}

/** UserListModal 컴포넌트 props 타입 */
export interface UserListModalPropsType {
  readonly isUserList: boolean;
  readonly setIsUserList: (x: boolean) => void;
  readonly type: string;
  readonly follows?: number;
}

/** UserModal 컴포넌트 props 타입 */
export interface UserModalPropsType {
  readonly hostInfo: { id: number | null; nickName: string };
  readonly userModal: boolean;
  readonly setUserModal: (x: boolean) => void;
  readonly userInfo: any;
  readonly action: (id: number) => void;
}
