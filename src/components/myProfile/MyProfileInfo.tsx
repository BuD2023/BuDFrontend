import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserListModal from '../common/UserListModal';
import { MyProfileInfoPropsType } from './_MyProfile.interface';

export default function MyProfileInfo({ level, followers, follows, posts, isLoading }: MyProfileInfoPropsType) {
  const navigate = useNavigate();
  const [type, setType] = useState('');
  const [isUserList, setIsUserList] = useState<boolean>(false);

  const handleClickFollower = () => {
    setIsUserList(!isUserList);
    setType('MyFollowers');
  };

  const handleClickFollow = () => {
    setIsUserList(!isUserList);
    setType('MyFollows');
  };

  if (isLoading) {
    return <div className="mt-3 h-[177px] w-full rounded-2xl bg-midIvory dark:bg-sky"></div>;
  }

  return (
    <>
      <UserListModal follows={follows} isUserList={isUserList} setIsUserList={setIsUserList} type={type} />
      <div className="mt-3 flex w-full flex-col rounded-2xl bg-midIvory text-lightText dark:bg-sky dark:text-white">
        <div className="flex h-[122px] w-full items-center justify-around px-3">
          <div className="flex flex-col items-center justify-around text-[22px] font-bold">
            <div>{posts}</div>
            <div className="mt-2 text-[18px] font-medium">게시글</div>
          </div>
          <div onClick={followers > 0 ? handleClickFollower : undefined} className={'flex flex-col items-center justify-around text-[22px] font-bold ' + (followers > 0 ? 'cursor-pointer' : '')}>
            <div>{followers}</div>
            <div className="mt-2 text-[18px] font-medium">팔로워</div>
          </div>
          <div onClick={follows > 0 ? handleClickFollow : undefined} className={'flex flex-col items-center justify-around text-[22px] font-bold ' + (follows > 0 ? 'cursor-pointer' : '')}>
            <div>{follows}</div>
            <div className="mt-2 text-[18px] font-medium">팔로우</div>
          </div>
          <div className="flex flex-col items-center justify-around text-[22px] font-bold">
            <div>{level}</div>
            <div className="mt-2 text-[18px] font-medium">성장레벨</div>
          </div>
        </div>
        <div onClick={() => navigate('/myProfileEdit')} className="flex h-[55px] w-full text-[18px] font-semibold">
          <button className="h-full w-full rounded-2xl bg-greyBeige bg-opacity-50 text-lightText dark:bg-lightNavy dark:text-white">프로필 편집</button>
        </div>
      </div>
    </>
  );
}
