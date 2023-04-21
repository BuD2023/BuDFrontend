import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RiUserFollowFill } from 'react-icons/ri';
import { TfiWrite } from 'react-icons/tfi';
import { CheckModalPropsType } from './_Common.interface';
import { SetNotificationType } from '../SignUp/_SignUp.interface';

export default function CheckBoxModal({ checkModal, setCheckModal, getModalAnswer, action }: CheckModalPropsType) {
  // const [open, setOpen] = useState(true)
  const cancelButtonRef = useRef(null);
  const [notification, setNotification] = useState<SetNotificationType>({
    post: true,
    follow: true,
  });

  return (
    <Transition.Root show={checkModal} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setCheckModal}>
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
              <Dialog.Panel className="relative my-8 w-full max-w-lg transform overflow-auto rounded-lg bg-white text-left text-black shadow-xl transition-all">
                <div className="bg-white px-4 pt-5 pb-4  sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {/* 모달창 아이콘 배경 색 */}
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-[#111827]">
                        {`알림 설정`}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="whitespace-pre-wrap text-sm text-[#6b7280]">{`허용하실 알림을 모두 선택해주세요.`}</p>
                        <p className="whitespace-pre-wrap text-sm text-[#6b7280]">{`건너뛰시면 모든 알림이 허용되며`}</p>
                        <p className="whitespace-pre-wrap text-sm text-[#6b7280]">{`추후에 설정페이지에서 다시 설정하실 수 있습니다.`}</p>
                        <div className="mt-4 flex w-full justify-around">
                          <label className={`my-2 flex cursor-pointer flex-col items-center gap-2 rounded-full p-4 ${notification.follow ? 'border-zinc-500 border' : ''}`}>
                            <input
                              onChange={(e) => {
                                // e.preventDefault();
                                setNotification({ ...notification, follow: !notification.follow });
                              }}
                              className="hidden"
                              type="checkbox"
                              name="notification"
                              value="follow"
                            />
                            <RiUserFollowFill className="text-[30px] sm:text-[35px]" />
                            <span className="text-[14px]">팔로우 알림</span>
                          </label>
                          <label className={`my-2 flex cursor-pointer flex-col items-center gap-2 rounded-full p-4 ${notification.post ? 'border-zinc-500 border' : ''}`}>
                            <input
                              onChange={(e) => {
                                // e.preventDefault();
                                setNotification({ ...notification, post: !notification.post });
                              }}
                              className="hidden"
                              type="checkbox"
                              name="notification"
                              value="post"
                            />
                            <TfiWrite className="text-[30px] sm:text-[35px]" />
                            <span className="text-[14px]">게시물 알림</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#f9fafb] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-full bg-[#dc2626] px-3 py-2 text-sm font-semibold text-white shadow-sm  hover:bg-[#ef4444] sm:ml-3 sm:w-auto"
                    onClick={() => {
                      setCheckModal(false);
                      getModalAnswer(notification);
                      action && action();
                    }}
                  >
                    완료
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#111827] shadow-sm outline-none ring-1 ring-inset ring-[#d1d5db] hover:bg-[#f9fafb] sm:mt-0 sm:w-auto"
                    onClick={() => {
                      setCheckModal(false);
                      getModalAnswer({ post: true, follow: true });
                      action && action();
                    }}
                    ref={cancelButtonRef}
                  >
                    건너뛰기
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
