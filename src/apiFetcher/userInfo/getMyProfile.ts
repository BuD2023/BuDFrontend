import { MyProfileType } from '../../components/myProfile/_MyProfile.interface';
import customAxios from '../customAxios';

const getMyProfileInfo = async (token: string): Promise<MyProfileType> => {
  return await customAxios({
    method: 'get',
    url: `/users`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
};

export default getMyProfileInfo;
