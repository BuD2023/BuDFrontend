import customAxios from '../customAxios';

export interface notificationDataType {
  fcmToken: string;
  isPostPushAvailable?: boolean;
  isFollowPushAvailable?: boolean;
}

const postNotificationTokenAxios = async (token: string, notificationData: notificationDataType) => {
  return await customAxios({
    method: 'post',
    url: `/notification-info`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: notificationData,
  });
};

export default postNotificationTokenAxios;
