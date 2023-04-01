import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import CoffeeChatRoom from '../components/coffeeChat/CoffeeChatRoom';
import CoffeeTitle from '../components/coffeeChat/CoffeeTitle';
import FooterMenu from '../components/common/FooterMenu';
import { chatRooms } from '../store/dummy';

export default function CoffeeChat() {
  const [inputValue, setInputValue] = useState('');

  let chatRoomsResult = [...chatRooms];
  if (inputValue) {
    chatRoomsResult = chatRooms.filter((room) => room.roomName.toLowerCase().split(' ').join('').trim().includes(inputValue.toLowerCase().split(' ').join('').trim()));
  }

  return (
    <>
      <section>
        <div className="relative mt-16 flex h-full min-h-[calc(100vh-160px)] w-full flex-col items-center gap-4 p-4">
          <div className="fixed left-[50%] bottom-[120px] z-20 ml-[-15%] flex h-[50px] w-[30%] max-w-[150px] cursor-pointer items-center justify-center gap-1 rounded-full border-[2px] border-pointGreen bg-pointGreen text-[24px] text-white drop-shadow-2xl transition-all hover:border-white dark:border-[#7cb342] dark:bg-[#7cb342] hover:dark:border-white">
            <IoMdAdd />
            <span className="mb-0.5 mr-0.5 text-[18px] font-semibold">방만들기</span>
          </div>
          <CoffeeTitle chatRooms={chatRooms} inputValue={inputValue} setInputValue={setInputValue} />
          <CoffeeChatRoom chatRooms={chatRoomsResult} />
        </div>
        <FooterMenu />
      </section>
    </>
  );
}
