import customAxios from '../customAxios';

const getUserFollowList = async (token: string, id: number): Promise<[]> => {
  return await customAxios({
    method: 'get',
    url: `/users/${id}/follows`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export default getUserFollowList;
