import { selector } from 'recoil';
import getGithubInfoAxios from '../../apiFetcher/githubInfo/getGithubInfo';
import getMyProfileInfo from '../../apiFetcher/userInfo/getMyProfile';
import { accessToken } from '../../main';

export const getMyPageInfo = selector({
  key: 'getMyPageInfo',
  get: async () => {
    try {
      return (await getMyProfileInfo(accessToken)) || [];
    } catch (error) {
      console.log(`Error: \n${error}`);
      return [];
    }
  },
});
