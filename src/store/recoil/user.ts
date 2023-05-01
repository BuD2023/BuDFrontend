import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export interface userInfoInitialType {
  token: string;
  userName: string;
  description: string;
  id: number;
  job: string;
  level: number;
  nickName: string;
  numberOfFollowers: number;
  numberOfPosts: number;
  profileUrl: string;
  userId: string;
  expireTime: string;
}

const { persistAtom } = recoilPersist({
  key: 'newAccessToken',
  storage: localStorage,
});

export const loginUserInfo = atom({
  key: 'loginUserInfo',
  default: undefined as undefined | Partial<userInfoInitialType>,
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
