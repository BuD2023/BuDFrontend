import { UserProfileType } from '../../components/otherProfile/_OtherProfile.interface';
import customAxios from '../customAxios';

const getUserProfileInfo = async (token: string, id: number): Promise<UserProfileType> => {
  return await customAxios({
    method: 'get',
    url: `/users/${id}`,
    headers: {
      Authorization: token,
    },
  });
};

export default getUserProfileInfo;
