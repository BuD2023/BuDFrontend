import customAxios from '../customAxios';

const getRandomImageAxios = async (token: string): Promise<string> => {
  return await customAxios({
    method: 'get',
    url: `/member/random-image`,
    headers: {
      Authorization: token,
    },
  });
};

export default getRandomImageAxios;
