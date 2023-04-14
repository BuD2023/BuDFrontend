import customAxios from '../customAxios';

const getMyProfileInfo = async (token: string): Promise<[]> => {
  return await customAxios({
    method: 'get',
    url: `/users`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getMyProfileInfo;
