import { atom } from 'recoil';
import { UserInfoEditInitialType } from '../../pages/profile/MyProfileEdit';

const initialValue: UserInfoEditInitialType = {
  file: null,
  nickname: '',
  job: '',
};

export const addUserInfo = atom({
  key: 'addUserInfo',
  default: initialValue,
});
