import { useEffect, useRef, useState } from 'react';
import * as StompJs from '@stomp/stompjs';
import { accessToken } from '../main';
import { myChatroomListContentType } from '../apiFetcher/coffeeChatInfo/getMyChatroomList';
import { useMyChatroomListQuery } from '../store/module/useChatroomQuery';
import { useInView } from 'react-intersection-observer';
import { SOCKET_URL } from '../constant/union';

const ROOM_NUM = 10;
interface MessageType {
  senderId: number;
  chatroomId: number;
  message: string;
}

const Test = () => {
  const { isLoading, data: chatroomListData, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage, refetch } = useMyChatroomListQuery(ROOM_NUM, 20);
  console.log(chatroomListData);
  const client = useRef({});
  const [newChatMessages, setNewChatMessages] = useState<MessageType[]>([]);
  const [messageList, setMessageList] = useState<myChatroomListContentType[]>([]);
  useEffect(() => {
    setMessageList(chatroomListData?.pages.map((i) => i.content).flat() as myChatroomListContentType[]);
    console.log(messageList);
    refetch();
  }, [chatroomListData]);

  const [message, setMessage] = useState<string>('');

  // 인피니티 스크롤
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

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
      setNewChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
    }),
      {
        Authorization: `Bearer ${accessToken}`,
      };
    console.log(`Subscribed to chatroom ${ROOM_NUM}`);
  };

  // 메시지 전송 함수 수정
  const publish = () => {
    if (!(client.current as StompJs.Client).connected) {
      return;
    }

    (client.current as StompJs.Client).publish({
      destination: '/chats/message',
      body: JSON.stringify({
        senderId: 2,
        chatroomId: ROOM_NUM,
        message: message,
      }),
    });

    setMessage('');
  };

  return (
    <div className="relative inset-0 flex-col  items-center justify-center  gap-4  p-4">
      <div className="just flex h-[40%] w-[70%] justify-center overflow-auto bg-white ">
        {messageList && messageList.length > 0 && (
          <ul className="flex flex-col-reverse text-lg">
            {messageList.map((_chatMessage, index) => (
              <li className="text-black" key={index}>
                {_chatMessage.message}
              </li>
            ))}
            {/* <div ref={ref} /> */}
          </ul>
        )}
        {newChatMessages && newChatMessages.length > 0 && (
          <ul className="flex flex-col-reverse text-lg">
            {newChatMessages.map((_chatMessage, index) => (
              <li className="text-black" key={index}>
                {_chatMessage.message}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <input type="text" placeholder="메세지 입력" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button
          onClick={() => {
            publish();
          }}
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default Test;
