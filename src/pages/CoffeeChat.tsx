import axios from 'axios';
import { useEffect, useState } from 'react';
import CoffeeChatRoom from '../components/coffeeChat/CoffeeChatRoom';
import CoffeeTitle from '../components/coffeeChat/CoffeeTitle';
import AddBtn from '../components/common/AddBtn';
import FooterMenu from '../components/common/FooterMenu';
import { chatRooms } from '../store/chatsDummy';

export default function CoffeeChat() {
  const [inputValue, setInputValue] = useState('');

  let chatRoomsResult = [...chatRooms];
  const [chatRoom, setChatRoom] = useState(null);

  const accessToken =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJKSG5pMiIsInJvbGUiOiJbUk9MRV9WRVJJRklFRF0iLCJpYXQiOjE2ODEwMzkwODgsImV4cCI6MTY4MTA0MjY4OH0.SWnSKEbQLtxoXaNgPY8FJWmn3TdRfWLfsOOY_wOkn2n-LcRFWKtaRu0BDIcUei4lW5kiifbUWk5aCt4ddL_XhA';

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    withCredentials: true,
  };

  const githubLogin = async () => {
    try {
      const response = await axios.get('api/oauth2/authorization/github ', { headers });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchChatRoom = async () => {
    try {
      const response = await axios.get('api/chatroom?page=0 ', { headers });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const postData = {
    title: '이게 올라간다면?',
    description: '테스트용입니다',
    hashTags: ['인공지능', '챗지비티', 'ai'],
  };

  const postChatroom = async () => {
    try {
      const response = await axios.post('api/chatroom', postData, { headers });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
        <button onClick={githubLogin}>깃허브 로그인하기</button>
        <button onClick={fetchChatRoom}>채팅방 불러오기</button>
        <button onClick={postChatroom}>채팅방 만들기</button>
        <AddBtn url="/roomCreate" text="방만들기" />
        <CoffeeTitle chatRooms={chatRooms} inputValue={inputValue} setInputValue={setInputValue} />
        <CoffeeChatRoom chatRooms={chatRoomsResult} />
      </div>
      <FooterMenu />
    </section>
  );
}
