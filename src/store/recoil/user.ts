import { atom } from 'recoil';
import { githubProps } from '../../components/home/_Home.interface';

export const userInitialValue = '';

export const user = atom<string>({
  key: 'userInfo',
  default: userInitialValue,
});
