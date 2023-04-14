import customAxios from '../customAxios';

const getMyProfileInfo = async (token: string): Promise<[]> => {
  return await customAxios({
    method: 'get',
    url: `/users`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export default getMyProfileInfo;
