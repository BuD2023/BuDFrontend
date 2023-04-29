import customAxios from '../customAxios';

const putReadAllNotification = async (token: string) => {
  return await customAxios({
    method: 'put',
    url: `/notifications`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export default putReadAllNotification;
