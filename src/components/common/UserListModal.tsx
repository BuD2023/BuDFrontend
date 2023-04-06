import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IChatRoomType } from '../../store/chatsDummy';
import { RiUserFollowFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

interface ConfirmModalPropsType {
  isUserList: { open: boolean; list: { name: string; pic: string }[] };
  setIsUserList: ({}: { open: boolean; list: { name: string; pic: string }[] }) => void;
}

export default function UserListModal({ isUserList, setIsUserList }: ConfirmModalPropsType) {
  // const [open, setOpen] = useState(true)
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();

  return (
    <Transition.Root show={isUserList.open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={() => setIsUserList({ ...isUserList, open: false })}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          {/* 배경색 회색 */}
          <div className="fixed inset-0 bg-[#6b7280] bg-opacity-75 transition-opacity" />
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
                    {isUserList.list.map((user, idx) => (
                      <>
                        <div className="flex items-center justify-between">
                          <div onClick={() => navigate(`/otherProfile/${user.name}`)} key={idx} className="my-2 flex cursor-pointer items-center gap-3 px-4">
                            <img src={user.pic} className="h-[50px] w-[50px] rounded-full object-cover" />
                            <div className=" text-[16px] font-semibold">{user.name}</div>
                          </div>
                          <div className="mr-4 flex cursor-pointer items-center gap-1 text-[14px] font-semibold">
                            <RiUserFollowFill className="text-[16px]" />
                            <span>팔로우</span>
                          </div>
                        </div>
                      </>
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
