import customAxios from '../customAxios';

const deletReadAlleNotificationAxios = async (token: string) => {
  return await customAxios({
    method: 'delete',
    url: `/notifications`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export default deletReadAlleNotificationAxios;
