import { UserFollowListType } from '../../components/otherProfile/_OtherProfile.interface';
import customAxios from '../customAxios';

const getUserFollowList = async (token: string, id: number): Promise<UserFollowListType[]> => {
  return await customAxios({
    method: 'get',
    url: `/users/${id}/follows`,
    headers: {
      Authorization: token,
    },
  });
};

export default getUserFollowList;
