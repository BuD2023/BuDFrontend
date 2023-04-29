import { UserFollowListType } from '../../components/otherProfile/_OtherProfile.interface';
import customAxios from '../customAxios';

const getUserFollowerList = async (token: string, id: number): Promise<UserFollowListType[]> => {
  return await customAxios({
    method: 'get',
    url: `/users/${id}/followers`,
    headers: {
      Authorization: token,
    },
  });
};

export default getUserFollowerList;
