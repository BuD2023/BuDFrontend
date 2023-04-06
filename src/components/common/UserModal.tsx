import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';

interface ConfirmModalPropsType {
  userModal: boolean;
  setUserModal: (x: boolean) => void;
  userName: string;
  userImg: string;
  userIntro: string;
  userJob: string;
}

export default function UserModal({ userModal, setUserModal, userName, userImg, userIntro, userJob }: ConfirmModalPropsType) {
  // const [open, setOpen] = useState(true)
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleAuthorizeHost = () => {
    setUserModal(false);
    console.log(`사용자가 ${userName}에게 호스트를 위임했습니다.`);
  };

  return (
    <Transition.Root show={userModal} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setUserModal}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          {/* 배경색 회색 */}
          <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
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
                    <img className="h-[50px] w-[50px] rounded-full object-cover" src={userImg} alt={userName} />
                    <div className="flex grow flex-col justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <p className="text-base font-bold text-black">{userName}</p>
                        <p className="text-xs text-black opacity-50">({userJob})</p>
                      </div>
                      <p className="text-sm text-black">{userIntro}</p>
                    </div>
                    <p onClick={() => navigate(`/otherProfile/${userName}`)} className="h-[18px] cursor-pointer items-center gap-1 text-sm opacity-60">
                      <BsInfoCircle size={18} />
                    </p>
                  </div>
                </div>
                <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-full bg-pointGreen px-3 py-2 text-sm font-semibold text-white shadow-sm outline-none ring-1 ring-inset sm:mt-0 sm:w-auto"
                    onClick={handleAuthorizeHost}
                    ref={cancelButtonRef}
                  >
                    호스트 위임하기
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
