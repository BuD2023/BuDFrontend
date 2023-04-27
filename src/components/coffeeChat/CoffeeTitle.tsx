import { useState } from 'react';
import { FcIcons8Cup } from 'react-icons/fc';
import { HiOutlineRefresh } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useChatroomStatusQuery } from '../../store/module/useChatroomQuery';
import { useAllChatroomQuery } from '../../store/module/useCoffeeChatQuery';
import Header from '../common/Header';
import SearchBar from '../common/SearchBar';
import { CoffeeTitlePropsType } from './_CoffeeChat.interface';

export default function CoffeeTitle({ setInputValue, inputValue }: CoffeeTitlePropsType) {
  const navigate = useNavigate();

  const { isLoading, data, isError, refetch: chatroomStatusRefetch, isFetching: chatroomStatusIsFetching } = useChatroomStatusQuery();
  const { refetch: allChatroomRefetch, isFetching: allChatroomIsFetching } = useAllChatroomQuery();
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClickRefreshBtn = () => {
    allChatroomRefetch();

    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 500);
  };

  if (isError) {
    navigate('/NotFound');
  }

  return (
    <div className="flex w-full flex-col gap-4 text-[26px] font-bold">
      <Header type="category" title="커피챗" icon={<FcIcons8Cup />} />
      <SearchBar inputValue={inputValue} setInputValue={setInputValue} />
      {isLoading ? (
        <div className="h-[40px] rounded-full bg-pointGreen dark:bg-sky"></div>
      ) : (
        <div className="flex justify-evenly rounded-full bg-pointGreen py-3 text-center text-[16px] font-medium text-white dark:bg-sky">
          <div>{`총 ${data?.numberOfChatRooms}개의 채팅방에서 ${data?.numberOfUsers}명이 대화중입니다.`}</div>
          <HiOutlineRefresh
            onClick={handleClickRefreshBtn}
            className={`transform cursor-pointer transition-transform duration-500 ${chatroomStatusIsFetching || allChatroomIsFetching || isClicked ? 'animate-spin' : ''}`}
          />
        </div>
      )}
    </div>
  );
}
