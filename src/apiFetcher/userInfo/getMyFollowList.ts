import customAxios from '../customAxios';

const getMyFollowList = async (token: string): Promise<[]> => {
  return await customAxios({
    method: 'get',
    url: `/users/follows`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export default getMyFollowList;
