import { MyFollowListType } from '../../components/myProfile/_MyProfile.interface';
import customAxios from '../customAxios';

const getMyFollowerList = async (token: string): Promise<MyFollowListType[]> => {
  return await customAxios({
    method: 'get',
    url: `/users/followers`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getMyFollowerList;
