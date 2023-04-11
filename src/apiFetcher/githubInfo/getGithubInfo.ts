import customAxios from '../customAxios';

const getGithubInfoAxios = async (token: string) => {
  return await customAxios({
    method: 'get',
    url: '/github',
    headers: {
      Authorization: token,
    },
  });
};

export default getGithubInfoAxios;
