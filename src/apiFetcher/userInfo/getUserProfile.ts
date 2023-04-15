import customAxios from '../customAxios';

interface UserProfileType {
  id: number;
  userId: string;
  nickName: string;
  description: string;
  level: number;
  numberOfFollowers: number;
  numberOfFollows: number;
  numberOfPosts: number;
  profileUrl: string;
  isFollowing: boolean;
  isReader: boolean;
}

const getUserProfileInfo = async (token: string, id: number): Promise<UserProfileType> => {
  return await customAxios({
    method: 'get',
    url: `/users/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getUserProfileInfo;
