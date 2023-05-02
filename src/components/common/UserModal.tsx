import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserModalPropsType } from './_Common.interface';
import { S3_URL } from '../../constant/union';
import { useRecoilValue } from 'recoil';
import { loginUserInfo } from '../../store/recoil/user';

export default function UserModal({ userModal, setUserModal, userInfo, hostInfo, action, isHost }: UserModalPropsType) {
  const { userId, nickName, profileUrl, userIntro, job } = userInfo;

  // 사용자 정보 Recoil
  const logInUserInfo = useRecoilValue(loginUserInfo);

  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleAuthorizeHost = async (userId: number) => {
    setUserModal(false);
    action && action(userId);
  };

  return (
    <Transition.Root show={userModal} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setUserModal}>
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
              <Dialog.Panel className="relative my-8 w-full max-w-lg transform overflow-auto rounded-lg bg-white text-left shadow-xl transition-all">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-2 flex gap-4">
                    <img className="h-[50px] w-[50px] rounded-full object-cover" src={S3_URL + profileUrl} alt={nickName} />
                    <div className="flex grow flex-col justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <p className="text-base font-bold text-lightText">{nickName}</p>
                        <p className="text-xs text-lightText opacity-50">{job}</p>
                      </div>
                      <p className="text-sm text-lightText">{userIntro}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {isHost?.isHost ? (
                    <>
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-full border border-[#d9d9d9] bg-white px-3 py-2 text-sm font-semibold text-lightText shadow-sm outline-none sm:mt-0 sm:w-auto"
                        onClick={() => handleAuthorizeHost(userId)}
                        ref={cancelButtonRef}
                      >
                        호스트 위임하기
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigate(`/otherProfile/${userId}/feed`)}
                      className="inline-flex w-full justify-center rounded-full border bg-pointGreen px-3 py-2 text-sm font-semibold text-white shadow-sm outline-none sm:mt-0 sm:w-auto"
                    >
                      프로필 보러가기
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
