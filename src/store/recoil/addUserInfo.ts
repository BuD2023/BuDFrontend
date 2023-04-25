import { atom } from 'recoil';

export interface UserInfoInitialValueType {
  file?: Blob | null;
  nickname: string;
  job: string;
  // introduceMessage?: string;
}

const initialValue: UserInfoInitialValueType = {
  file: null,
  nickname: '',
  job: '',
  // introduceMessage: '',
};

export const addUserInfo = atom({
  key: 'addUserInfo',
  default: initialValue,
});
