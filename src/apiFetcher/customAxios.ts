import axios, { AxiosInstance, AxiosError } from 'axios';
import { useRecoilState } from 'recoil';
import { loginUserInfo, userInfoInitialType } from '../store/recoil/user';
import { getNewToken } from './userInfo/getNewToken';

const customAxios: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: '/api',
});

let accessToken: Partial<userInfoInitialType> = { expireTime: String(10000000000000) };
const tokenExpirationTime = () => {
  if (accessToken !== null) {
    return Number(accessToken.expireTime);
  } else return 10000000000000;
};

customAxios.interceptors.request.use(
  async (config) => {
    accessToken = JSON.parse(localStorage.getItem('accessToken') as string);
    if (Date.now() >= tokenExpirationTime()) {
      // 현재시간보다 만료기한시간이 작으면 토큰 재발급
      console.log('token expired');
      if (accessToken !== null) {
        const response = await getNewToken(accessToken.token as string);
        if (response) {
          const newToken = response?.token;
          console.log(newToken);
          config.headers['Authorization'] = newToken;
          localStorage.setItem('newAccessToken', JSON.stringify({ ...accessToken, ...response }));
        }
      }
    }
    console.log(config);
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response) => {
    const res = response.data;
    console.log(res);
    return res;
  },

  async (error) => {
    const err = error as AxiosError;

    if (err.response?.status === 405) {
      alert('로그아웃 되었습니다.');
    }
    return Promise.reject(error);
  }
);

export default customAxios;
