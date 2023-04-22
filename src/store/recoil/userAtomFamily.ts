import { atomFamily } from 'recoil';
import getGithubInfoAxios from '../../apiFetcher/githubInfo/getGithubInfo';

// 임시로 한번 어떤건지 사용해봤습니다!
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
