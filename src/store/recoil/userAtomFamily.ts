import { atomFamily } from 'recoil';
import getGithubInfoAxios from '../../apiFetcher/githubInfo/getGithubInfo';

export const githubUserInfoAtom = atomFamily({
  key: 'githubUserInfo',
  default: async (accessToken: string) => {
    try {
      return await getGithubInfoAxios(accessToken);
    } catch (error) {
      console.error('GitHub 사용자 정보를 가져오는데 실패했습니다:', error);
      return null;
    }
  },
});
