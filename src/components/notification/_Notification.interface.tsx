export interface NotiContent {
  readonly [key: string]: (senderId: string) => JSX.Element;
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
  readonly senderProfileImage: string;
  readonly senderNickName: string;
  readonly senderId: string;
  readonly notificationId: string;
  readonly notificationType: notificationType;
  readonly pageType: pageType;
  readonly pageId: number;
  readonly notificationDetailType: notificationDetailType;
  readonly notificationStatus: string;
  readonly notifiedAt: string;
}

/** getNotificationListAxios - 알림 정보를 가져올 때 사용하는 response 타입 */
export interface NotificationListType {
  readonly content: NotificationListContentType[];
  readonly pageable: string;
  readonly sort: {
    readonly sorted: boolean;
    readonly unsorted: boolean;
    readonly empty: boolean;
  };
  readonly number: number;
  readonly numberOfElements: number;
  readonly first: boolean;
  readonly last: boolean;
  readonly size: number;
  readonly empty: boolean;
}

/** postNotificationTokenAxios - 알림 토큰을 전송할 때 사용하는 request 타입 */
export interface notificationDataType {
  readonly fcmToken: string;
  readonly isPostPushAvailable?: boolean;
  readonly isFollowPushAvailable?: boolean;
}

export interface UnreadNotificationCountType {
  readonly unreadCount: number;
}
