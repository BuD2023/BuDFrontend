import { BsCameraFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import RoomChats from '../components/chatRoom/RoomChats';
import RoomHeader from '../components/chatRoom/RoomHeader';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'tailwind-styled-components';
import * as StompJs from '@stomp/stompjs';
import { accessToken } from '../main';
import { SOCKET_URL } from '../constant/union';
import { myChatroomListContentType, myChatroomListType } from '../apiFetcher/coffeeChatInfo/getMyChatroomList';
import { useMyChatroomListQuery } from '../store/module/useChatroomQuery';
import { makeCompressedImg } from '../utils/makeCompressedImg';
import PicModal from '../components/common/PicModal';

export interface MessageType {
  senderId: number;
  chatroomId: number;
  message: string;
}

export default function ChatRoom() {
  const { id } = useParams();
  const ROOM_NUM = Number(id);

  const { isLoading, data: chatroomListData, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage, refetch } = useMyChatroomListQuery(ROOM_NUM, 10);

  const client = useRef({});
  const [newChatMessages, setNewChatMessages] = useState<MessageType[]>([]);
  const [messageList, setMessageList] = useState<myChatroomListContentType[]>(chatroomListData?.pages.map((i: myChatroomListType) => i.content).flat() as myChatroomListContentType[]);
  useEffect(() => {
    setMessageList(chatroomListData?.pages.map((i: myChatroomListType) => i.content).flat() as myChatroomListContentType[]);
  }, [chatroomListData]);

  const [message, setMessage] = useState<string>('');

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
    if (imgPeek) {
      (client.current as StompJs.Client).publish({
        destination: '/chats/image',
        body: JSON.stringify({
          senderId: 4,
          chatroomId: ROOM_NUM,
          imageByte: imgPeek,
        }),
      });
    } else {
      (client.current as StompJs.Client).publish({
        destination: '/chats/message',
        body: JSON.stringify({
          senderId: 4,
          chatroomId: ROOM_NUM,
          message: message,
        }),
      });
    }
    setImgPeek('');
    setMessage('');
  };
  const pressEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (event.nativeEvent.isComposing) return;
      event.preventDefault();
      publish();
    }
  };
  // 사진 popUp
  const [isPicPopUp, setIsPicPopUp] = useState({
    open: false,
    pic: '',
  });

  // 사진 미리보기
  const [imgPeek, setImgPeek] = useState<string>('');

  // 사진 업로드
  const imgRef = useRef<HTMLInputElement>(null);
  const handleChangeProfileImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArr = e.target.files as FileList;

    const compressedFiles = await makeCompressedImg(fileArr);
    console.log(compressedFiles);
    const compressedFileURLs = await Promise.all(
      compressedFiles
        .map((compressed) => {
          return new Promise<string>((resolve) => {
            let reader = new FileReader();
            reader.onload = () => {
              resolve(reader.result as string);
            };
            reader.readAsDataURL(compressed as Blob);
          });
        })
        .flat()
    );
    setImgPeek(compressedFileURLs[0]);
  };

  return (
    <section>
      <PicModal isPicPopUp={isPicPopUp} setIsPicPopUp={setIsPicPopUp} />
      <RoomHeader />
      <div className="fixed left-0 top-20 h-full w-full rounded-[20px] bg-midIvory dark:bg-midNavy"></div>
      <RoomChats messageList={messageList} newChatMessages={newChatMessages} hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
      <div className={`fixed bottom-0 left-0 z-20 flex w-full ${imgPeek ? 'items-end' : 'items-center'} justify-start gap-4 bg-lightIvory p-3 dark:bg-darkNavy`}>
        <BsCameraFill size="40" className="grow cursor-pointer " onClick={() => imgRef?.current?.click()} />
        <input ref={imgRef} type="file" accept="image/*" onChange={handleChangeProfileImg} className="hidden" />
        {imgPeek ? (
          <div className="flex w-full grow rounded-[20px] bg-greyBeige px-4 py-2 dark:bg-lightNavy">
            <img src={imgPeek} onClick={() => setIsPicPopUp({ open: true, pic: imgPeek })} className="h-[50vw] w-[50vw] shrink-0 cursor-pointer rounded-lg object-cover" />
            <div className="flex w-full flex-col items-end justify-end gap-2 text-[18px] font-semibold text-white">
              <button onClick={() => setImgPeek('')} className="w-[50%] rounded-xl bg-darkIvory py-2 dark:bg-lightNavy">
                취소
              </button>
              <button onClick={() => publish()} className="w-[50%] rounded-xl bg-darkIvory py-2 dark:bg-lightNavy">
                전송
              </button>
            </div>
          </div>
        ) : (
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={pressEnterKey}
            type="text"
            className="mb-0.5 h-[40px] w-full grow rounded-[20px] bg-greyBeige px-4 py-2 focus:outline-none dark:bg-lightNavy"
          />
        )}
      </div>
    </section>
  );
}

const Hello = tw.div`fixed top-20 left-0 h-full w-full rounded-[20px] bg-midIvory dark:bg-midNavy`;
