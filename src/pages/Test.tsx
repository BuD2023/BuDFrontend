import React, { useEffect, useRef, useState } from 'react';
import * as StompJs from '@stomp/stompjs';
import { accessToken } from '../main';

const ROOM_NUM = 1;
const SOCKET_URL = 'http://34.64.224.24:8083/ws';

const Test = () => {
  const client = useRef({});
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [message, setMessage] = useState({
    senderId: 1,
    chatroomId: ROOM_NUM,
    chatText: '',
  });

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: SOCKET_URL, // 웹소켓 서버로 직접 접속
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        subscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    (client.current as StompJs.Client).activate();
  };

  const disconnect = () => {
    (client.current as StompJs.Client).deactivate();
  };

  const subscribe = () => {
    (client.current as StompJs.Client).subscribe(`/chatrooms/${ROOM_NUM}`, ({ body }) => {
      setChatMessages((_chatMessages: any[]) => [..._chatMessages, JSON.parse(body)]);
    });
  };

  const publish = (text: any) => {
    if (!(client.current as StompJs.Client).connected) {
      return;
    }

    (client.current as StompJs.Client).publish({
      destination: '/chats/message',
      body: JSON.stringify(text),
    });

    setMessage({ ...message, chatText: '' });
  };

  return (
    <div className="relative mb-20 mt-9  flex  h-full  min-h-[calc(100vh-160px)]  w-full  flex-col  items-center  justify-center  gap-4  p-4">
      {chatMessages && chatMessages.length > 0 && (
        <ul>
          {chatMessages.map((_chatMessage, index) => (
            <li className="text-black" key={index}>
              {_chatMessage.message}
            </li>
          ))}
        </ul>
      )}
      <div>
        <input type="text" placeholder="메세지 입력" value={message.chatText} onChange={(e) => setMessage({ ...message, chatText: e.target.value })} />
        <button onClick={() => publish(message)}>전송</button>
      </div>
    </div>
  );
};

export default Test;
