import { UnreadNotificationCountType } from '../../components/notification/_Notification.interface';
import customAxios from '../customAxios';

const getNotificationListAxios = async (token: string): Promise<UnreadNotificationCountType> => {
  return await customAxios({
    method: 'get',
    url: `/notifications/unread-count`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
};

export default getNotificationListAxios;
