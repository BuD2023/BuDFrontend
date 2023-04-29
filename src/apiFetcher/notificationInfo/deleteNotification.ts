import customAxios from '../customAxios';

const deleteNotificationAxios = async (token: string, notiId: string) => {
  return await customAxios({
    method: 'delete',
    url: `/notifications/${notiId}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export default deleteNotificationAxios;
