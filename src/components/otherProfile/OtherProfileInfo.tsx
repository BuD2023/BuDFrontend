import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFollowMutation } from '../../store/module/useCommunityQuery';
import UserListModal from '../common/UserListModal';

interface OtherProfileInfoProps {
  numberOfPosts: number;
  numberOfFollowers: number;
  numberOfFollows: number;
  level: number;
  isFollowing: boolean;
  isLoading: boolean;
}

export default function OtherProfileInfo({ numberOfPosts, numberOfFollowers, numberOfFollows, level, isFollowing, isLoading }: OtherProfileInfoProps) {
  const { id } = useParams();
  const [type, setType] = useState('');
  const [isUserList, setIsUserList] = useState<boolean>(false);

  const handleClickFollower = () => {
    setIsUserList(!isUserList);
    setType('UserFollowers');
  };

  const handleClickFollow = () => {
    setIsUserList(!isUserList);
    setType('UserFollows');
  };

  const followMutation = useFollowMutation(Number(id));
  const handleFollowClick = () => {
    followMutation.mutate();
  };

  if (isLoading) {
    return <div className="mt-3 h-[185px] w-full rounded-2xl bg-midIvory dark:bg-sky"></div>;
  }

  return (
    <>
      <UserListModal isUserList={isUserList} setIsUserList={setIsUserList} type={type} />
      <div className="mt-3 flex h-[185px] w-full flex-col rounded-2xl bg-midIvory text-lightText dark:bg-sky dark:text-white">
        <div className="flex h-[122px] w-full items-center justify-around px-3">
          <div className="flex flex-col items-center justify-around text-[22px] font-bold">
            <div>{numberOfPosts}</div>
            <div className="mt-2 text-[18px] font-medium">게시물</div>
          </div>
          <div onClick={handleClickFollower} className="flex cursor-pointer flex-col items-center justify-around text-[22px] font-bold">
            <div>{numberOfFollowers}</div>
            <div className="mt-2 text-[18px] font-medium">팔로워</div>
          </div>
          <div onClick={handleClickFollow} className="flex cursor-pointer flex-col items-center justify-around text-[22px] font-bold">
            <div>{numberOfFollows}</div>
            <div className="mt-2 text-[18px] font-medium">팔로우</div>
          </div>
          <div className="flex flex-col items-center justify-around text-[22px] font-bold">
            <div>{level}</div>
            <div className="mt-2 text-[18px] font-medium">성장레벨</div>
          </div>
        </div>
        <div onClick={handleFollowClick} className="flex h-[55px] w-full text-[18px] font-semibold">
          <button className="h-full w-full rounded-2xl bg-greyBeige bg-opacity-50 text-lightText dark:bg-lightNavy dark:text-white">{isFollowing ? '팔로우취소' : '팔로우하기'}</button>
        </div>
      </div>
    </>
  );
}
