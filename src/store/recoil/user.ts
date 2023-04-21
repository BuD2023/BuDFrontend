import { selector } from 'recoil';
import { BASE_URL } from '../../constant/union';

const getGithubInfoUrl = BASE_URL + 'api/github';

export const getGithubInfo = selector({
  key: 'githubInfo',
  get: async () => {
    try {
      const response = await fetch(getGithubInfoUrl);
      return (await response.json()) || {};
    } catch (error) {
      console.log(`Error: \n${error}`);
      return {};
    }
  },
});
