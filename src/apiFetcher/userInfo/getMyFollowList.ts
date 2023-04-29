import { MyFollowListType } from '../../components/myProfile/_MyProfile.interface';
import customAxios from '../customAxios';

const getMyFollowList = async (token: string): Promise<MyFollowListType[]> => {
  return await customAxios({
    method: 'get',
    url: `/users/follows`,
    headers: {
      Authorization: token,
    },
  });
};

export default getMyFollowList;
