import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RiUserFollowFill } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import { useMyFollowersQuery } from '../../store/module/useMyProfileQuery';
import { useMyFollowsQuery } from '../../store/module/useMyProfileQuery';
import { useUserFollowersQuery, useUserFollowsQuery } from '../../store/module/useUserProfileQuery';

interface ConfirmModalPropsType {
  isUserList: boolean;
  setIsUserList: (x: boolean) => void;
  type: string;
}

interface UserListProps {
  id: number;
  description: string;
  isFollow: boolean;
  nickName: string;
  userId: string;
  profileUrl: string;
}

export default function UserListModal({ isUserList, setIsUserList, type }: ConfirmModalPropsType) {
  const cancelButtonRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: MyFollowersData, isLoading: followersIsLoading, error: followersError, refetch: followersRefetch } = useMyFollowersQuery();
  const { data: MyFollowsData, isLoading: followsIsLading, error: followsError, refetch: followsRefetch } = useMyFollowsQuery();
  const { data: UserFollowersData, isLoading: UserFollowersIsLoading, error: UserFollowersError, refetch: UserFollowersRefetch } = useUserFollowersQuery(Number(id));
  const { data: UserFollowsData, isLoading: UserFollowsIsLading, error: UserFollowsError, refetch: UserFollowsRefetch } = useUserFollowsQuery(Number(id));

  const data = type === 'UserFollows' ? UserFollowsData : type === 'UserFollowers' ? UserFollowersData : type === 'MyFollows' ? MyFollowsData : type === 'MyFollowers' ? MyFollowersData : [];

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

  console.log(data);

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
                    {data !== undefined && data.length > 0 ? (
                      data.map((user: UserListProps) => (
                        <div key={user.id} className="flex items-center justify-between">
                          <div onClick={() => navigate(`/otherProfile/${user.nickName}`)} className="my-2 flex cursor-pointer items-center gap-3 px-4">
                            <img src={user.profileUrl} className="h-[50px] w-[50px] rounded-full object-cover" />
                            <div className=" text-[16px] font-semibold">{user.nickName}</div>
                          </div>
                          <div className="mr-4 flex cursor-pointer items-center gap-1 text-[14px] font-semibold">
                            <RiUserFollowFill className="text-[16px]" />
                            <span>팔로우 {user.isFollow}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>없읍니다</div>
                    )}
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
