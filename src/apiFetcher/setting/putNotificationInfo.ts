import customAxios from '../customAxios';

const putNotificationInfoAxios = async (token: string, userId: number, body: any) => {
  const { isPostPushAvailable, isFollowPushAvailable } = body;
  return await customAxios({
    method: 'put',
    url: `/users/${userId}/notification-info`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: {
      isPostPushAvailable: isPostPushAvailable,
      isFollowPushAvailable: isFollowPushAvailable,
    },
  });
};

export default putNotificationInfoAxios;
