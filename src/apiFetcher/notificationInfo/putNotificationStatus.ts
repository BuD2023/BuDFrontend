import customAxios from '../customAxios';

const putNotificationStatusAxios = async (token: string, notiId: string) => {
  return await customAxios({
    method: 'put',
    url: `/notifications/${notiId}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export default putNotificationStatusAxios;
