import { githubProps } from '../../components/home/_Home.interface';
import customAxios from '../customAxios';

const getGithubInfoAxios = async (token: string): Promise<githubProps> => {
  return await customAxios({
    method: 'get',
    url: '/github',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getGithubInfoAxios;
