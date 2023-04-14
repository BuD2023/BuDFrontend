import customAxios from '../customAxios';

const getUserFollowerList = async (token: string, id: number): Promise<[]> => {
  return await customAxios({
    method: 'get',
    url: `/users/${id}/followers`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export default getUserFollowerList;
