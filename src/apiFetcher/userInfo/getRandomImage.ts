import customAxios from '../customAxios';

const getRandomImageAxios = async (token: string): Promise<string> => {
  return await customAxios({
    method: 'get',
    url: `/member/random-image`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getRandomImageAxios;
