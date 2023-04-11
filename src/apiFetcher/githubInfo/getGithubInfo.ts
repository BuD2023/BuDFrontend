import customAxios from '../customAxios';

const getGithubInfoAxios = async (token: string) => {
  return await customAxios({
    method: 'get',
    url: '/home/github/info',
    headers: {
      Authorization: token,
    },
  });
};

export default getGithubInfoAxios;
