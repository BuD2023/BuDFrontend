import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMyFollowersQuery, useMyProfileQuery } from '../../store/module/useMyProfileQuery';
import { useMyFollowsQuery } from '../../store/module/useMyProfileQuery';
import { useUserFollowersQuery, useUserFollowsQuery } from '../../store/module/useUserProfileQuery';
import { useFollowMutation } from '../../store/module/useCommunityQuery';
import { UserListModalPropsType } from './_Common.interface';
import { CommonUserListType } from '../myProfile/_MyProfile.interface';
import { S3_URL } from '../../constant/union';
import { loginUserInfo } from '../../store/recoil/user';
import { useRecoilValue } from 'recoil';
import { useChatUserListQuery } from '../../store/module/useChatroomQuery';
import { chatroomUserListType } from '../chatRoom/_ChatRoom.interface';
import { FcCheckmark, FcPortraitMode } from 'react-icons/fc';

export default function UserListModal({ isUserList, setIsUserList, type, follows }: UserListModalPropsType) {
  // 사용자 정보 Recoil
  const logInUserInfo = useRecoilValue(loginUserInfo);

  const cancelButtonRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: myFollowersData, refetch: followersRefetch } = useMyFollowersQuery();
  const { data: myFollowsData, refetch: followsRefetch } = useMyFollowsQuery();
  const { data: userFollowersData, refetch: UserFollowersRefetch } = useUserFollowersQuery(Number(id));
  const { data: userFollowsData, refetch: UserFollowsRefetch } = useUserFollowsQuery(Number(id));
  const { data: chatUserList, refetch: chatUserListRefetch } = useChatUserListQuery(Number(id));
  const { refetch: myProfileRefetch } = useMyProfileQuery();

  const [userId, setUserId] = useState(id ?? 0);
  const { mutate, isSuccess } = useFollowMutation(Number(userId));

  let data: CommonUserListType[];
  switch (type) {
    case 'UserFollows':
      data = userFollowsData as CommonUserListType[];
      break;
    case 'UserFollowers':
      data = userFollowersData as CommonUserListType[];
      break;
    case 'MyFollows':
      data = myFollowsData as CommonUserListType[];
      break;
    case 'MyFollowers':
      data = myFollowersData as CommonUserListType[];
      break;
    case 'ChatUsers':
      data = chatUserList as chatroomUserListType[];
      break;
    default:
      data = [];
      break;
  }

  useEffect(() => {
    switch (type) {
      case 'MyFollows':
        followsRefetch();
        myProfileRefetch();
        break;
      case 'MyFollowers':
        followersRefetch();
        myProfileRefetch();
        break;
      case 'UserFollows':
        UserFollowsRefetch();
        break;
      case 'UserFollowers':
        UserFollowersRefetch();
        break;
      case 'ChatUsers':
        chatUserListRefetch();
        break;
      default:
        break;
    }
  }, [type, isSuccess]);

  const handleClickFollow = (memberId: number) => {
    setUserId(memberId);
    mutate();
  };

  useEffect(() => {
    setIsUserList(false);
  }, [follows === 0]);

  useEffect(() => {
    if (chatUserList) chatUserListRefetch();
  }, [chatUserList]);

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
                <div className="bg-white p-2 dark:text-darkNavy sm:p-6 sm:pb-4">
                  <div className="flex flex-col">
                    {data !== undefined &&
                      data.map((user: CommonUserListType | chatroomUserListType) => (
                        <div key={user.id} className="flex w-full items-center justify-between">
                          <div
                            onClick={(e) => {
                              if (user.id === logInUserInfo?.id) {
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
                            <img src={S3_URL + user.profileUrl} alt={user.profileUrl} className="h-[50px] w-[50px] rounded-full object-cover" />
                            <div className=" text-[16px] font-semibold">{user.nickName}</div>
                          </div>
                          <div
                            onClick={() => handleClickFollow(user.id)}
                            className={`mr-4 flex cursor-pointer items-center gap-1 text-[14px] font-semibold ` + (user.id === logInUserInfo?.id ? 'hidden' : '')}
                          >
                            {user.isFollowing ? (
                              <>
                                <FcCheckmark size={21} />
                                <p>팔로잉</p>
                              </>
                            ) : (
                              <>
                                <FcPortraitMode />
                                <p>팔로우</p>
                              </>
                            )}
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
