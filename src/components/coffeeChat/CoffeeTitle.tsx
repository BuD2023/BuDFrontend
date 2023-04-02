import React from 'react';
import { BsBellFill } from 'react-icons/bs';
import { FcIcons8Cup } from 'react-icons/fc';
import { IChatRoomType } from '../../store/chatsDummy';
import Header from '../common/Header';
import NotiBtn from '../common/NotiBtn';

interface CoffeeTitlePropsType {
  chatRooms: IChatRoomType[];
  inputValue: string;
  // eslint-disable-next-line no-unused-vars
  setInputValue: (x: string) => void;
}

export default function CoffeeTitle({ chatRooms, inputValue, setInputValue }: CoffeeTitlePropsType) {
  const totalChattingMembers = chatRooms.map((room) => Number(room.memberId.length)).reduce((a, b) => a + b);

  const coffeeInputHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(inputValue);
    // setInputValue('');
  };

  return (
    <div className="flex w-full flex-col gap-4 text-[26px] font-bold">
      <Header type="category" title="커피챗" icon={<FcIcons8Cup />} />
      <div className="w-full">
        <input
          onKeyDown={(e) => {
            // e.preventDefault();
            if (e.key === 'Enter') coffeeInputHandler(e);
          }}
          onChange={(e) => {
            e.preventDefault();
            setInputValue(e.target.value);
          }}
          value={inputValue}
          type="text"
          placeholder="키워드로 검색"
          className="searchInput h-[60px] w-full rounded-xl bg-white p-4 text-xl font-bold text-[#514848] placeholder:text-[#7B6D6D] dark:bg-[#E4E4E4]"
        />
      </div>
      <div className="rounded-full bg-pointGreen py-3 text-center text-[16px] font-medium text-white dark:bg-sky">{`총 ${chatRooms.length}개의 채팅방에서 ${totalChattingMembers}명이 대화중입니다.`}</div>
    </div>
  );
}
