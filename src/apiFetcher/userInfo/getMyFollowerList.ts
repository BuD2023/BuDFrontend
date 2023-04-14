import customAxios from '../customAxios';

const getMyFollowerList = async (token: string): Promise<[]> => {
  return await customAxios({
    method: 'get',
    url: `/users/followers`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export default getMyFollowerList;
