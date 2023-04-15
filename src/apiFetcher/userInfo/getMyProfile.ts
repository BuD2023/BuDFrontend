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

const getMyProfileInfo = async (token: string): Promise<UserProfileType> => {
  return await customAxios({
    method: 'get',
    url: `/users`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getMyProfileInfo;

// const { data: asdf, isLoading, error } = useMyFollowersQuery();

// const { data:asdfasdf, isLoading, error } = useMyFollowsQuery();
