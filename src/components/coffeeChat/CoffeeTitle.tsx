import { useRef } from 'react';
import { BsBackspace } from 'react-icons/bs';
import { FcIcons8Cup } from 'react-icons/fc';
import { useChatroomStatusQuery } from '../../store/module/useChatroomQuery';
import Header from '../common/Header';

interface CoffeeTitlePropsType {
  inputValue: string;
  setInputValue: (x: string) => void;
}

export default function CoffeeTitle({ setInputValue, inputValue }: CoffeeTitlePropsType) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { isLoading, data } = useChatroomStatusQuery();

  const clearInputValue = () => {
    inputRef.current && (inputRef.current.value = '');
    setInputValue('');
  };

  return (
    <div className="flex w-full flex-col gap-4 text-[26px] font-bold">
      <Header type="category" title="커피챗" icon={<FcIcons8Cup />} />
      <div className="relative flex w-full items-center">
        <input
          ref={inputRef}
          onKeyPress={(e) => {
            if (e.key === 'Enter') setInputValue(e.currentTarget.value);
          }}
          type="text"
          placeholder="키워드로 검색"
          className="searchInput h-[60px] w-full rounded-xl bg-white p-4 text-xl font-bold text-[#514848] placeholder:text-[#7B6D6D] dark:bg-[#E4E4E4]"
        />
        {inputValue && <BsBackspace onClick={clearInputValue} className="absolute right-5 cursor-pointer" size={20} />}
      </div>
      {isLoading ? (
        <div className="h-[40px] rounded-full bg-pointGreen dark:bg-sky"></div>
      ) : (
        <div className="rounded-full bg-pointGreen py-3 text-center text-[16px] font-medium text-white dark:bg-sky">{`총 ${data?.numberOfChatRooms}개의 채팅방에서 ${data?.numberOfUsers}명이 대화중입니다.`}</div>
      )}
    </div>
  );
}
