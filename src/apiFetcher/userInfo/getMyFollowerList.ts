import { MyFollowListType } from '../../components/myProfile/_MyProfile.interface';
import customAxios from '../customAxios';

const getMyFollowerList = async (token: string): Promise<MyFollowListType[]> => {
  return await customAxios({
    method: 'get',
    url: `/users/followers`,
    headers: {
      Authorization: token,
    },
  });
};

export default getMyFollowerList;
