import customAxios from '../customAxios';

const gdtLogInCheckAxios = async (token: string): Promise<{ isAddInfo: boolean }> => {
  return await customAxios({
    method: 'get',
    url: `/check`,
    headers: {
      Authorization: token,
    },
  });
};

export default gdtLogInCheckAxios;
