import { useState } from 'react';
import CoffeeChatRoom from '../components/coffeeChat/CoffeeChatRoom';
import CoffeeTitle from '../components/coffeeChat/CoffeeTitle';
import FooterMenu from '../components/common/FooterMenu';
import Loading from '../components/common/Loading';
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
        {/* <Loading /> */}
        <div className="relative mt-16 flex h-full min-h-[calc(100vh-160px)] w-full flex-col items-center gap-4 bg-darkNavy p-4">
          <CoffeeTitle chatRooms={chatRooms} inputValue={inputValue} setInputValue={setInputValue} />
          <CoffeeChatRoom chatRooms={chatRoomsResult} />
        </div>
        <FooterMenu />
      </section>
    </>
  );
}
