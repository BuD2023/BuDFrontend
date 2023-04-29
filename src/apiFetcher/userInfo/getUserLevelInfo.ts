import customAxios from '../customAxios';

const getUserLevelInfoAxios = async (token: string): Promise<string[]> => {
  return await customAxios({
    method: 'get',
    url: `/member/getLevelImage`,
    headers: {
      Authorization: token,
    },
  });
};

export default getUserLevelInfoAxios;
