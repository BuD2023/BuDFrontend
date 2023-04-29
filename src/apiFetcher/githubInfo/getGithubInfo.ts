import { githubInfoType } from '../../components/home/_Home.interface';
import customAxios from '../customAxios';

const getGithubInfoAxios = async (token: string): Promise<githubInfoType> => {
  return await customAxios({
    method: 'get',
    url: '/github',
    headers: {
      Authorization: token,
    },
  });
};

export default getGithubInfoAxios;
