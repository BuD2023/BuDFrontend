import { NotificationListType } from '../../components/notification/_Notification.interface';
import customAxios from '../customAxios';

const getNotificationListAxios = async (token: string, pageParam: number): Promise<NotificationListType> => {
  const response = (await customAxios({
    method: 'get',
    url: `/notifications?page=${pageParam}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })) as NotificationListType;
  return response;
};

export default getNotificationListAxios;
