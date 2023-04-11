import axios from 'axios';
import { useState, useEffect } from 'react';
import CoffeeChatRoom from '../components/coffeeChat/CoffeeChatRoom';
import CoffeeTitle from '../components/coffeeChat/CoffeeTitle';
import AddBtn from '../components/common/AddBtn';
import FooterMenu from '../components/common/FooterMenu';
import { chatRooms } from '../store/chatsDummy';
import { accessToken } from './Home';

export default function CoffeeChat() {
  const [inputValue, setInputValue] = useState('');
  const [chatRoomsResult, setChatRoomsResult] = useState([]);

  const getChatRooms = async () => {
    try {
      const response = await axios.get(`api/chatrooms?page=0`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data.content);
      setChatRoomsResult(response.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  const searchChatRoomsResult = async () => {
    try {
      const response = await axios.get(`api/chatrooms/search?keyword=${inputValue}&page=0`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      setChatRoomsResult(response.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (inputValue) {
      searchChatRoomsResult();
    } else {
      getChatRooms();
    }
  }, [inputValue]);

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
