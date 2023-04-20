import { UserFollowerListType } from '../../components/otherProfile/_OtherProfile.interface';
import customAxios from '../customAxios';

const getUserFollowerList = async (token: string, id: number): Promise<UserFollowerListType[]> => {
  return await customAxios({
    method: 'get',
    url: `/users/${id}/followers`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getUserFollowerList;
