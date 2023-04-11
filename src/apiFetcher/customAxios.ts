import axios, { AxiosInstance, AxiosError } from 'axios';
import { accessToken } from '../main';

export const basicHeaders = {
  Authorization: accessToken,
  'Content-Type': 'application/json',
};

const customAxios: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: '/api',
});

customAxios.interceptors.request.use(
  (config) => {
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
