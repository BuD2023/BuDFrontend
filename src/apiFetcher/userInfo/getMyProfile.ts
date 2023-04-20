import { MyProfileType } from '../../components/myProfile/_MyProfile.interface';
import customAxios from '../customAxios';

const getMyProfileInfo = async (token: string): Promise<MyProfileType> => {
  return await customAxios({
    method: 'get',
    url: `/users`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getMyProfileInfo;
