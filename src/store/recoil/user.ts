import { selector } from 'recoil';
import getGithubInfoAxios from '../../apiFetcher/githubInfo/getGithubInfo';
import { accessToken } from '../../main';

export const userGithubInfo = selector({
  key: 'githubInfo',
  get: async () => {
    try {
      const token = accessToken;
      const response = await getGithubInfoAxios(token);
      return response || [];
    } catch (error) {
      console.log(`Error: \n${error}`);
      return [];
    }
  },
});
