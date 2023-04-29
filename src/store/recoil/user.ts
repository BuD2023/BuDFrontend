import axios from 'axios';
import { atom, selector } from 'recoil';
import getMyProfileInfo from '../../apiFetcher/userInfo/getMyProfile';
import { githubInfoType } from '../../components/home/_Home.interface';
import { accessToken } from '../../main';
import { useLocalStorageToken } from '../../utils/localStorageToken';

export const getMyPageInfo = selector({
  key: 'getMyPageInfo',
  get: async () => {
    try {
      return (await getMyProfileInfo('Bearer ' + accessToken)) || [];
    } catch (error) {
      console.log(`Error: \n${error}`);
      return [];
    }
  },
});
export interface userInfoInitialType {
  token: string;
  userName: string;
  profileInfo?: githubInfoType;
}

export const loginUserInfo = atom({
  key: 'loginUserInfo',
  // default: useLocalStorageToken() || null,
  default: undefined as undefined | userInfoInitialType,
  effects: [
    ({ setSelf, onSet }) => {
      const savedData = localStorage.getItem('accessToken');
      // setSelf: atom 값을 설정 혹은 재설정
      if (savedData) setSelf(JSON.parse(savedData));

      // atom이 변화가 감지될 때 작동, Storage에 데이터 저장
      // setSelf에 의해서는 작동하지 않음
      onSet((newValue, _, isReset) => {
        isReset ? localStorage.removeItem('accessToken') : localStorage.setItem('accessToken', JSON.stringify(newValue));
      });
    },
  ],
});
