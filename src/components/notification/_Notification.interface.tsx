export interface NotiContent {
  [key: string]: (senderId: string) => JSX.Element;
}

/** NotificationListContentType에 사용하는 타입들 */
export type notificationType = 'POST' | 'FOLLOW';
export type notificationDetailType =
  | 'FOLLOWED'
  | 'NEW_POST'
  | 'POST_COMMENT'
  | 'POST_RE_COMMENT'
  | 'ANSWER_COMMENT'
  | 'ANSWER_RE_COMMENT'
  | 'ANSWER'
  | 'ADD_LIKE_POST'
  | 'ADD_LIKE_COMMENT'
  | 'ADD_LIKE_ANSWER'
  | 'ADD_LIKE_ANSWER_COMMENT'
  | 'COMMENT_PIN'
  | 'ANSWER_PIN'
  | 'ANSWER_COMMENT_PIN';
export type pageType = 'QNA' | 'FEED' | 'OTHER_PROFILE';

/** NotificationListType에 사용하는 content 타입 */
export interface NotificationListContentType {
  senderNickName: string;
  senderId: string;
  notificationId: string;
  notificationType: notificationType;
  pageType: pageType;
  pageId: number;
  notificationDetailType: notificationDetailType;
  notificationStatus: string;
  notifiedAt: string;
}

/** getNotificationListAxios - 알림 정보를 가져올 때 사용하는 response 타입 */
export interface NotificationListType {
  content: NotificationListContentType[];
  pageable: string;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  size: number;
  empty: boolean;
}

/** postNotificationTokenAxios - 알림 토큰을 전송할 때 사용하는 request 타입 */
export interface notificationDataType {
  fcmToken: string;
  isPostPushAvailable?: boolean;
  isFollowPushAvailable?: boolean;
}
