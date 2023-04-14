import customAxios from '../customAxios';

const getMyFollowerList = async (token: string): Promise<[]> => {
  return await customAxios({
    method: 'get',
    url: `/users/followers`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getMyFollowerList;
