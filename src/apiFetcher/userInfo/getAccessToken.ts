import axios from 'axios';
import { BASE_URL } from '../../constant/union';

export const getAccessToken = async (codeParams: string) => {
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
      expireTime: String(data.jwt_expire_time),
    };
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
};
