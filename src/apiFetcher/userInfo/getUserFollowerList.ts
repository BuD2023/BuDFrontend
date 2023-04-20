import { MyFollowListType } from '../../components/myProfile/_MyProfile.interface';
import customAxios from '../customAxios';

const getUserFollowerList = async (token: string, id: number): Promise<MyFollowListType[]> => {
  return await customAxios({
    method: 'get',
    url: `/users/${id}/followers`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getUserFollowerList;
