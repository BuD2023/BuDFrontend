import { userInfoInitialType } from '../store/recoil/user';

export const useLocalStorageToken = (): userInfoInitialType | null => {
  const loginUser = localStorage.getItem('accessToken');
  if (loginUser && loginUser !== null) {
    return JSON.parse(loginUser as string);
  } else return null;
};
