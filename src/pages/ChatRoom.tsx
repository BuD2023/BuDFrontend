import { BsCameraFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import RoomChats from '../components/chatRoom/RoomChats';
import RoomHeader from '../components/chatRoom/RoomHeader';
import { chats, chatRooms, IChatRoomType, IChatsType } from '../store/chatsDummy';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import tw from 'tailwind-styled-components';
import * as StompJs from '@stomp/stompjs';
import { accessToken } from './Home';

export default function ChatRoom() {
  const { id } = useParams();
  const chatRoom = chatRooms.find((i) => i.roomId === Number(id)) as IChatRoomType;
  const chatsResult = chats.filter((i) => i.roomId === Number(id)) as IChatsType[];

  // const client = useRef({});
  // const connect = () => {
  //   client.current = new StompJs.Client({
  //     brokerURL: 'ws://34.64.224.24:8080/ws',
  //     reconnectDelay: 5000,
  //     heartbeatIncoming: 4000,
  //     heartbeatOutgoing: 4000,
  //     onConnect: () => {
  //       subscribe();
  //     },
  //     onStompError: (frame) => {
  //       console.error(frame);
  //     },
  //   });

  //   client.current.activate();
  // };

  // const disconnect = () => {
  //   client.current.deactivate();
  // };

  // const subscribe = () => {
  //   client.current.subscribe(`/exchange/chat.exchange/room.${item.id}`, (body) => {
  //     const json_body = JSON.parse(body.body);
  //     setNewMsgList((_chat_list) => [..._chat_list, json_body]);
  //   });
  // };

  // const publish = () => {
  //   if (!client.current.connected) return;

  //   client.current.publish({
  //     destination: `/pub/chat.${item.id}.messages`,
  //     body: JSON.stringify({
  //       senderId: USER_ID,
  //       userName: USER_ID === item.buyer.id ? item.buyer.name : item.seller.name,
  //       profileUrl: USER_ID === item.buyer.id ? item.buyer.imageURL : item.seller.imageURL,
  //       message: chatMsg,
  //     }),
  //   });

  //   setChatMsg('');
  // };

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'content-type': 'application/json',
    withCredentials: true,
  };

  const fetchChatRoom = async () => {
    try {
      const response = await axios.get('api/chatrooms?page=0', headers);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChatRoom();
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
