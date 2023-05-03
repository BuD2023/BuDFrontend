import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function LevelIconModal({ isPicPopUp, setIsPicPopUp, level }: any) {
  const cancelButtonRef = useRef(null);
  const testLevelName = ['씩씩한 씨앗', '성실한 씨앗', '따뜻한 새싹', '다정한 새싹', '활기찬 잎새', '명량한 잎새', '부드러운 가지', '단단한 가지', '꿈꾸는 나무', '찬란한 나무'];
  const testRequiredCommits = [0, 16, 33, 89, 179, 318, 637, 445, 892, 1000];
  const testText = '응애 나 아기 ';

  return (
    <Transition.Root show={isPicPopUp.open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={() => setIsPicPopUp({ ...isPicPopUp, open: false })}>
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
                <div className="flex min-h-[20px] flex-col bg-white text-lightText dark:text-white sm:p-6 sm:pb-4">
                  <div className="w-full bg-lightIvory p-4 text-center text-lg font-bold dark:bg-darkNavy ">
                    <span>Lv {level} </span>
                    <span>{testLevelName[level - 1]}</span>
                  </div>
                  <div className="flex py-3 dark:text-darkNavy">
                    <img src={isPicPopUp.pic as string} alt={isPicPopUp.pic as string} className="aspect-square h-[170px] w-[170px] object-contain" />
                    <div className="flex flex-col gap-6 p-4 pt-3">
                      <div className="flex flex-col gap-2">
                        <span className="font-bold">달성 조건</span>
                        <span className="opacity-50">커밋 {testRequiredCommits[level - 1]}개</span>
                      </div>
                      <div className="flex flex-col leading-6">
                        <span>" {testText + testLevelName[level - 1]?.substr(-2, 2)}!</span>
                        <span>{testLevelName[level] ? `조금만 더 크면 ${testLevelName[level]} 👀` : '이제 다 컸어 🥰'}! "</span>
                      </div>
                    </div>
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
