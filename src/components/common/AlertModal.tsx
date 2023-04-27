import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { AlertModalPropsType } from './_Common.interface';
import { useNavigate } from 'react-router-dom';

export default function AlertModal({ alertModal, setAlertModal, title, des, action }: AlertModalPropsType) {
  const navigate = useNavigate();
  const tmp = (x: boolean) => {
    return;
  };

  return (
    <Transition.Root show={alertModal} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={tmp}>
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
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#fae1e3] sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-[#dc2626]" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-[#111827]">
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-[#6b7280]">{des}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#f9fafb] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-full bg-[#dc2626] px-3 py-2 text-sm font-semibold text-white shadow-sm outline-none ring-1 ring-inset ring-[#fae1e3] hover:bg-[#ef4444] sm:mt-0 sm:w-auto"
                    onClick={() => {
                      setAlertModal(false);
                      action && action();
                    }}
                  >
                    확인
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
