import { BsCameraFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import RoomChats from '../components/chatRoom/RoomChats';
import RoomHeader from '../components/chatRoom/RoomHeader';
import { chats, chatRooms, IChatRoomType, IChatsType } from '../store/chatsDummy';
import axios from 'axios';
import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

export default function ChatRoom() {
  const { id } = useParams();
  const chatRoom = chatRooms.find((i) => i.roomId === Number(id)) as IChatRoomType;
  const chatsResult = chats.filter((i) => i.roomId === Number(id)) as IChatsType[];

  // const [chatRoom, setChatRoom] = useState(null);

  // const fetchChatRoom = async () => {
  //   try {
  //     setChatRoom(null);
  //     const response = await axios.get('http://34.64.224.24:8080/');
  //     // setChatRoom(response.data);
  //     console.log(response.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    // fetchChatRoom();
  }, []);

  return (
    <section>
      <RoomHeader roomName={chatRoom.roomName} numOfMember={chatRoom.memberId} />
      <div className="fixed left-0 top-20 h-full w-full rounded-[20px] bg-midIvory dark:bg-midNavy"></div>
      {/* <Hello>
        <div></div>
      </Hello> */}
      <RoomChats chatsResult={chatsResult} />
      <div className="fixed bottom-0 left-0 z-20 flex w-full items-center gap-4 bg-lightIvory p-3 dark:bg-darkNavy">
        <BsCameraFill size="40" className="grow cursor-pointer " />
        <input type="text" className="mb-0.5 h-[40px] w-full grow rounded-[20px] bg-greyBeige px-4 py-2 focus:outline-none dark:bg-lightNavy" />
      </div>
    </section>
  );
}

const Hello = tw.div`fixed top-20 left-0 h-full w-full rounded-[20px] bg-midIvory dark:bg-midNavy`;
