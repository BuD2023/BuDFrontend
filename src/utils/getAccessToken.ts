import axios from 'axios';
import { BASE_URL } from '../constant/union';

export const getAccessToken = async (codeParams: string, setRerender: (x: boolean) => void, rerender: boolean) => {
  try {
    const response = await axios.get(BASE_URL + 'token', {
      params: {
        code: codeParams,
      },
    });
    const data = response.headers;
    const result = {
      token: data.authorization as string,
      userName: data.jwt_user_information as string,
    };
    console.log(result);
    if (data.authorization) {
      localStorage.setItem('accessToken', JSON.stringify(result));
      setRerender(!rerender);
    }
    return result.token;
  } catch (error) {
    console.error('Error:', error);
  }
};
