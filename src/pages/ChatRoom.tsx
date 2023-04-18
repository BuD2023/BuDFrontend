import { BsCameraFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import RoomChats from '../components/chatRoom/RoomChats';
import RoomHeader from '../components/chatRoom/RoomHeader';
import React, { useEffect, useRef, useState } from 'react';
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
  const [newChatMessages, setNewChatMessages] = useState<any[]>([]);
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

  console.log(newChatMessages);
  const subscribe = () => {
    (client.current as StompJs.Client).subscribe(`/chatrooms/${ROOM_NUM}`, ({ body }) => {
      console.log(JSON.parse(body));
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
    if (imgPeek.image) {
      (client.current as StompJs.Client).publish({
        destination: '/chats/image',
        body: JSON.stringify({
          senderId: 4,
          chatroomId: ROOM_NUM,
          imageByte: imgPeek.image,
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
    setImgPeek({ isLoading: false, image: '' });
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
  const [imgPeek, setImgPeek] = useState<{ isLoading: boolean; image: string }>({
    isLoading: false,
    image: '',
  });

  // 사진 업로드
  const imgRef = useRef<HTMLInputElement>(null);
  const handleChangeProfileImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArr = e.target.files as FileList;
    // 사진 파일이 있으면 로딩상태로 변경
    if (fileArr) {
      setImgPeek({ ...imgPeek, isLoading: true });
    } else return;
    try {
      const compressedFiles = await makeCompressedImg(fileArr);
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
      setTimeout(() => {
        console.log('파일 업로드 완료!');
        setImgPeek({ isLoading: false, image: compressedFileURLs[0] });
      }, 1000);
    } catch (err) {
      console.error('파일 업로드 오류:', err);
      setImgPeek({ image: '', isLoading: false });
    }
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
        {imgPeek.image.length > 0 || imgPeek.isLoading === true ? (
          <div className="flex w-full grow rounded-[20px] bg-greyBeige px-4 py-2 dark:bg-lightNavy">
            {imgPeek.isLoading ? (
              <div className="flex h-[50vw] w-[50vw] shrink-0 cursor-pointer items-center justify-center rounded-lg bg-lightIvory text-[16px] dark:bg-darkNavy">이미지 준비중...</div>
            ) : (
              <img src={imgPeek.image} onClick={() => setIsPicPopUp({ open: true, pic: imgPeek.image })} className="h-[50vw] w-[50vw] shrink-0 cursor-pointer rounded-lg object-cover" />
            )}
            <div className="flex w-full flex-col items-end justify-end gap-2 text-[18px] font-semibold text-white">
              <button onClick={() => setImgPeek({ isLoading: false, image: '' })} className="w-[50%] rounded-xl bg-darkIvory py-2 dark:bg-lightNavy">
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
