import customAxios from '../customAxios';

type notificationType = 'POST' | 'FOLLOW';
type notificationDetailType = 'ANSWER' | 'PIN' | 'COMMENT' | 'LIKE' | 'FOLLOWED' | 'NEWPOST';
type postTypeType = 'QNA' | 'FEED';

interface NotificationListContentType {
  senderNickName: string;
  notificationId: string;
  notificationType: notificationType;
  pageType: postTypeType;
  pageId: number;
  notificationDetailType: notificationDetailType;
  notificationStatus: string;
  notifiedAt: string;
}

interface NotificationListType {
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

const getNotificationListAxios = async (token: string, pageParam: number): Promise<NotificationListType> => {
  const response = (await customAxios({
    method: 'get',
    url: `/notifications`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })) as NotificationListType;
  return response;
};

export default getNotificationListAxios;
