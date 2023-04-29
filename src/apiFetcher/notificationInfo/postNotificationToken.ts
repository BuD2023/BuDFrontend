import { notificationDataType } from '../../components/notification/_Notification.interface';
import customAxios from '../customAxios';

const postNotificationTokenAxios = async (token: string, notificationData: notificationDataType) => {
  return await customAxios({
    method: 'post',
    url: `/notification-info`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: notificationData,
  });
};

export default postNotificationTokenAxios;
