import axios from 'axios';
import { useEffect, useState } from 'react';
import CoffeeChatRoom from '../components/coffeeChat/CoffeeChatRoom';
import CoffeeTitle from '../components/coffeeChat/CoffeeTitle';
import AddBtn from '../components/common/AddBtn';
import FooterMenu from '../components/common/FooterMenu';
import { chatRooms } from '../store/chatsDummy';
import tw from 'tailwind-styled-components';

export default function CoffeeChat() {
  const [inputValue, setInputValue] = useState('');

  let chatRoomsResult = [...chatRooms];
  const [chatRoom, setChatRoom] = useState(null);

  useEffect(() => {
    const fetchChatRoom = async () => {
      try {
        const response = await axios.get('https://proxy.cors.sh/http://34.64.224.24:8080/api/chatroom', {
          params: { page: 0 },
          headers: { Authorization: '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' },
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChatRoom();
  }, []);

  if (inputValue) {
    chatRoomsResult = chatRooms.filter(
      (room) =>
        room.roomName.toLowerCase().split(' ').join('').trim().includes(inputValue.toLowerCase().split(' ').join('').trim()) ||
        room.tag.map((i) => i.toLowerCase()).includes(inputValue.toLowerCase().split(' ').join('').trim())
    );
  }

  return (
    <section>
      <div className="relative mb-20 mt-9  flex  h-full  min-h-[calc(100vh-160px)]  w-full  flex-col  items-center  justify-center  gap-4  p-4">
        <AddBtn url="/roomCreate" text="방만들기" />
        <CoffeeTitle chatRooms={chatRooms} inputValue={inputValue} setInputValue={setInputValue} />
        <CoffeeChatRoom chatRooms={chatRoomsResult} />
      </div>
      <FooterMenu />
    </section>
  );
}
