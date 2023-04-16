import { useEffect, useRef, useState } from 'react';
import * as StompJs from '@stomp/stompjs';
import { accessToken } from '../main';

const ROOM_NUM = 10;
const SOCKET_URL = 'ws://34.64.224.24:8083/ws/websocket';

const Test = () => {
  const client = useRef({});
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [message, setMessage] = useState({
    senderId: 2,
    chatroomId: ROOM_NUM,
    message: 'test',
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
    (client.current as StompJs.Client).subscribe(`8083/ws/chatrooms/${ROOM_NUM}`, ({ body }) => {
      setChatMessages((_chatMessages: any[]) => [..._chatMessages, JSON.parse(body)]);
    }),
      {
        Authorization: `Bearer ${accessToken}`,
      };
  };

  const publish = () => {
    if (!(client.current as StompJs.Client).connected) {
      return;
    }

    (client.current as StompJs.Client).publish({
      destination: '/chats/message',
      body: JSON.stringify({
        senderId: message.senderId,
        chatroomId: ROOM_NUM,
        message: message.message,
      }),
    });

    setMessage({ ...message, message: '' });
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
        <input type="text" placeholder="메세지 입력" value={message.message} onChange={(e) => setMessage({ ...message, message: e.target.value })} />
        <button onClick={() => publish()}>전송</button>
      </div>
    </div>
  );
};

export default Test;
