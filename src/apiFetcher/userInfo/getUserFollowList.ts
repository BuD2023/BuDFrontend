import customAxios from '../customAxios';

const getUserFollowList = async (token: string, id: number): Promise<[]> => {
  return await customAxios({
    method: 'get',
    url: `/users/${id}/follows`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getUserFollowList;
