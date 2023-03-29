import { useState } from 'react';
import profile1 from '../assets/profile1.jpg';
import profile2 from '../assets/profile2.jpeg';
import profile3 from '../assets/profile3.jpg';
import CoffeeChatRoom from '../components/coffeeChat/CoffeeChatRoom';
import CoffeeTitle from '../components/coffeeChat/CoffeeTitle';
import FooterMenu from '../components/common/FooterMenu';

export default function CoffeeChat() {
  const [inputValue, setInputValue] = useState('');

  const chatRooms = [
    {
      roomName: 'ChatGPT는 거짓말쟁이! 인공지능과 가짜뉴스에 대한 개발자 토크방',
      memberId: ['', '', '', '', '', '', '', '', '', '', '', ''],
      randomProfiles: [
        { pic: profile1, name: 'Phoebe', position: 'top-8 left-16' },
        { pic: profile2, name: 'Joey', position: 'top-4 left-8' },
        { pic: profile3, name: 'Chandler', position: 'top-0 left-0' },
      ],
    },
    {
      roomName: '주니어 프론트 개발자로서의 고민들... 나눕니다',
      memberId: ['', '', '', '', '', '', '', '', '', ''],
      randomProfiles: [
        { pic: profile1, name: 'Phoebe', position: 'top-8 left-16' },
        { pic: profile2, name: 'Joey', position: 'top-4 left-8' },
        { pic: profile3, name: 'Chandler', position: 'top-0 left-0' },
      ],
    },
    {
      roomName: '우리 빽둥이들 모이자!! [백엔드토크방]',
      memberId: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      randomProfiles: [
        { pic: profile1, name: 'Phoebe', position: 'top-8 left-16' },
        { pic: profile2, name: 'Joey', position: 'top-4 left-8' },
        { pic: profile3, name: 'Chandler', position: 'top-0 left-0' },
      ],
    },
  ];
  let chatRoomsResult = [...chatRooms];
  if (inputValue) {
    chatRoomsResult = chatRooms.filter((room) => room.roomName.toLowerCase().split(' ').join('').trim().includes(inputValue.toLowerCase().split(' ').join('').trim()));
  }

  return (
    <>
      <div className="relative mt-16 flex h-full min-h-screen w-full flex-col items-center gap-4 bg-darkNavy p-4">
        <CoffeeTitle chatRooms={chatRooms} inputValue={inputValue} setInputValue={setInputValue} />
        <CoffeeChatRoom chatRooms={chatRoomsResult} />
      </div>
      <FooterMenu />
    </>
  );
}
