import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RiUserFollowFill } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import { useMyFollowersQuery } from '../../store/module/useMyProfileQuery';
import { useMyFollowsQuery } from '../../store/module/useMyProfileQuery';
import { useUserFollowersQuery, useUserFollowsQuery } from '../../store/module/useUserProfileQuery';
import profile1 from '../../assets/profile1.jpg';
import { useFollowMutation } from '../../store/module/useCommunityQuery';
import { UserListModalPropsType } from './_Common.interface';
import { CommonUserListType, myInfo } from '../myProfile/_MyProfile.interface';
import { S3_URL } from '../../constant/union';

export default function UserListModal({ isUserList, setIsUserList, type, follows }: UserListModalPropsType) {
  const cancelButtonRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: MyFollowersData, isLoading: followersIsLoading, error: followersError, refetch: followersRefetch } = useMyFollowersQuery();
  const { data: MyFollowsData, isLoading: followsIsLading, error: followsError, refetch: followsRefetch } = useMyFollowsQuery();
  const { data: UserFollowersData, isLoading: UserFollowersIsLoading, error: UserFollowersError, refetch: UserFollowersRefetch } = useUserFollowersQuery(Number(id));
  const { data: UserFollowsData, isLoading: UserFollowsIsLading, error: UserFollowsError, refetch: UserFollowsRefetch } = useUserFollowsQuery(Number(id));

  let data: CommonUserListType[];
  switch (type) {
    case 'UserFollows':
      data = UserFollowsData as CommonUserListType[];
      break;
    case 'UserFollowers':
      data = UserFollowersData as CommonUserListType[];
      break;
    case 'MyFollows':
      data = MyFollowsData as CommonUserListType[];
      break;
    case 'MyFollowers':
      data = MyFollowersData as CommonUserListType[];
      break;
    default:
      data = [];
      break;
  }

  useEffect(() => {
    switch (type) {
      case 'MyFollows':
        followsRefetch();
        break;
      case 'MyFollowers':
        followersRefetch();
        break;
      case 'UserFollows':
        UserFollowsRefetch();
        break;
      case 'UserFollowers':
        UserFollowersRefetch();
        break;
      default:
        break;
    }
  }, [type]);

  const [userId, setUserId] = useState(id ?? 0);
  const { mutate } = useFollowMutation(Number(userId));

  const handleClickFollow = (memberId: number) => {
    setUserId(memberId);
    mutate();
  };

  useEffect(() => {
    setIsUserList(false);
  }, [follows === 0]);

  return (
    <Transition.Root show={isUserList} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={() => setIsUserList(false)}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          {/* 배경색 회색 */}
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative my-8 max-h-[50vh] w-full max-w-lg transform overflow-auto rounded-lg bg-white text-left shadow-xl transition-all">
                <div className="bg-white p-2 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {data !== undefined &&
                      data.map((user: CommonUserListType) => (
                        <div key={user.id} className="flex items-center justify-between">
                          <div
                            onClick={(e) => {
                              if (user.nickName === myInfo.nickname) {
                                navigate('/myProfile/feed');
                                e.stopPropagation;
                                return;
                              }
                              navigate(`/otherProfile/${user.id}/feed`);
                              setIsUserList(false);
                              e.stopPropagation();
                            }}
                            className="my-2 flex cursor-pointer items-center gap-3 px-4"
                          >
                            <img src={S3_URL + user.profileUrl} className="h-[50px] w-[50px] rounded-full object-cover" />
                            <div className=" text-[16px] font-semibold">{user.nickName}</div>
                          </div>
                          <div
                            onClick={() => handleClickFollow(user.id)}
                            className={`mr-4 flex cursor-pointer items-center gap-1 text-[14px] font-semibold ` + (user.nickName === myInfo.nickname ? 'hidden' : '')}
                          >
                            <RiUserFollowFill className="text-[16px]" />
                            <span>팔로우 {user.isFollowing}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
