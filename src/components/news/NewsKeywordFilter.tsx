import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { BiReset } from 'react-icons/bi';

interface NewsKeywordFilterPropsType {
  filter: boolean;
  setFilter: (a: boolean) => void;
  getKeywords: (arr: string[]) => void;
}
const NEWS_KEYWORD = [
  'IT',
  'Java',
  'Javascript',
  'Python',
  '알고리즘',
  '코딩테스트',
  '개발',
  '개발자',
  'AI',
  '인공지능',
  '안드로이드',
  'Android',
  '아이폰',
  'IOS',
  '프론트엔드',
  '백엔드',
  '웹개발',
  '퍼블리셔',
  '웹퍼블리셔',
  '데이터분석',
  '전산',
  '정보보안',
  'C#',
  '떠오르는 개발',
];

export default function NewsKeywordFilter(props: NewsKeywordFilterPropsType) {
  const [keyWords, setKeyWords] = useState([] as string[]);
  // console.log(keyWords);
  return (
    <Transition.Root show={props.filter} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={() => props.setFilter(false)}>
        <Transition.Child as={Fragment} enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-[#53535c] bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed left-0 top-[85px] ml-6 flex pr-2 pt-4"></div>
                  </Transition.Child>
                  <div className="mr-[-16px] flex h-full flex-col overflow-y-scroll bg-lightIvory py-24 pr-[16px] shadow-xl dark:bg-darkNavy">
                    <div className="flex items-center justify-between px-6">
                      <button
                        onClick={() => {
                          props.getKeywords(keyWords);
                          props.setFilter(false);
                        }}
                        type="button"
                        className="rounded-lg border-[2px] border-greyBeige font-extrabold text-greyBeige dark:border-sky dark:text-sky"
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-7 w-7" aria-hidden="true" />
                      </button>
                      <Dialog.Title className="mt-2 text-center text-2xl font-semibold leading-6 ">Filter</Dialog.Title>
                      <button className="rounded-lg border-[2px] border-greyBeige p-1 dark:border-sky ">
                        <BiReset onClick={() => setKeyWords([])} size="20px" className="box-contents cursor-pointer text-greyBeige dark:text-white" />
                      </button>
                    </div>
                    <div className="relative mt-6 flex-1 p-6">
                      <div className="flex h-full w-full flex-wrap items-center justify-between gap-2">
                        {NEWS_KEYWORD.map((i, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              if (keyWords.includes(i)) {
                                setKeyWords([...keyWords.filter((j) => j !== i)]);
                              } else {
                                setKeyWords([...keyWords, i]);
                              }
                            }}
                            className={`${
                              keyWords.includes(i) ? 'bg-greyBeige' : 'bg-opacity-0'
                            } cursor-pointer rounded-[10px] border-[2px] border-greyBeige p-2 text-[18px] font-[500] transition-all hover:scale-[1.1] hover:bg-midIvory`}
                          >
                            {i}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
