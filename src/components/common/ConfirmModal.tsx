import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ConfirmModalPropsType {
  confirmModal: boolean;
  setConfirmModal: (x: boolean) => void;
  getModalAnswer: (x: boolean) => void;
  title: string;
  des: string;
  confirmBtn: string;
}

export default function ConfirmModal({ confirmModal, setConfirmModal, getModalAnswer, title, des, confirmBtn }: ConfirmModalPropsType) {
  // const [open, setOpen] = useState(true)
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={confirmModal} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setConfirmModal}>
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
              <Dialog.Panel className="relative my-8 w-full max-w-lg transform overflow-auto rounded-lg bg-white text-left text-black shadow-xl transition-all">
                <div className="bg-white px-4 pt-5 pb-4  sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {/* 모달창 아이콘 배경 색 */}
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#fbe2e3] sm:mx-0 sm:h-10 sm:w-10">
                      {/* 모달창 아이콘 색 */}
                      <ExclamationTriangleIcon className="h-6 w-6 text-[#dc2626]" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-[#111827]">
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="whitespace-pre-wrap text-sm text-[#6b7280]">{des}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#f9fafb] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-[#dc2626] px-3 py-2 text-sm font-semibold text-white shadow-sm  hover:bg-[#ef4444] sm:ml-3 sm:w-auto"
                    onClick={() => {
                      setConfirmModal(false);
                      getModalAnswer(true);
                    }}
                  >
                    {confirmBtn}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#111827] shadow-sm outline-none ring-1 ring-inset ring-[#d1d5db] hover:bg-[#f9fafb] sm:mt-0 sm:w-auto"
                    onClick={() => {
                      setConfirmModal(false);
                      getModalAnswer(false);
                    }}
                    ref={cancelButtonRef}
                  >
                    취소
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
