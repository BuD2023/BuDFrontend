import customAxios from '../customAxios';

const getMyFollowList = async (token: string): Promise<[]> => {
  return await customAxios({
    method: 'get',
    url: `/users/follows`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getMyFollowList;
