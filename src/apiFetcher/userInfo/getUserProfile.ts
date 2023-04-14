import customAxios from '../customAxios';

const getUserProfileInfo = async (token: string, id: number): Promise<[]> => {
  return await customAxios({
    method: 'get',
    url: `/users/${id}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export default getUserProfileInfo;
