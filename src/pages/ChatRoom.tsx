import { BsCameraFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import RoomChats from '../components/chatRoom/RoomChats';
import RoomHeader from '../components/chatRoom/RoomHeader';
import React, { useEffect, useRef, useState } from 'react';
import * as StompJs from '@stomp/stompjs';
import { accessToken } from '../main';
import { SOCKET_URL } from '../constant/union';
import { useMyChatroomListQuery } from '../store/module/useChatroomQuery';
import { makeCompressedImg } from '../utils/makeCompressedImg';
import PicModal from '../components/common/PicModal';
import AlertModal from '../components/common/AlertModal';
import { chatType, myChatroomListContentType, myChatroomListType } from '../components/chatRoom/_ChatRoom.interface';
export interface MessageType {
  senderId: number;
  chatroomId: number;
  message: string;
}
export interface InfoMessageType {
  chatroomId: number;
  chatType: chatType;
  numberOfMembers: number;
}
export interface ChatMessageType {
  chatId: number;
  chatType: chatType;
  chatroomId: number;
  createdAt: string;
  message: string;
  userProfileUrl?: string;
  numberOfMembers: number;
  userId: number;
  userName: string;
}

export default function ChatRoom() {
  const navigate = useNavigate();
  const { id } = useParams();
  const ROOM_NUM = Number(id);
  const CHAT_SIZE = 10;

  //리액트 쿼리
  const { isLoading, data: chatroomListData, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } = useMyChatroomListQuery(ROOM_NUM, CHAT_SIZE);

  // 채팅 메세지 useState
  const [message, setMessage] = useState<string>('');
  const [newChatMessages, setNewChatMessages] = useState<InfoMessageType[] | ChatMessageType[]>([]);
  const [messageList, setMessageList] = useState<myChatroomListContentType[]>(chatroomListData?.pages.map((i: myChatroomListType) => i.content).flat() as myChatroomListContentType[]);
  useEffect(() => {
    setMessageList(chatroomListData?.pages.map((i: myChatroomListType) => i.content).flat() as myChatroomListContentType[]);
  }, [chatroomListData]);

  // webSocket
  const client = useRef({});
  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  //웹소켓 연결
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

  // 웹소켓 구독
  const subscribe = () => {
    (client.current as StompJs.Client).subscribe(`/chatrooms/${ROOM_NUM}`, ({ body }) => {
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
      console.log('not connected');
      setImgPeek({ isLoading: false, image: '' });
      setMessage('');
      return;
    }
    if (imgPeek.image) {
      (client.current as StompJs.Client).publish({
        destination: '/chats/image',
        body: JSON.stringify({
          senderId: 2,
          chatroomId: ROOM_NUM,
          imageByte: imgPeek.image,
        }),
      });
    } else {
      (client.current as StompJs.Client).publish({
        destination: '/chats/message',
        body: JSON.stringify({
          senderId: 2,
          chatroomId: ROOM_NUM,
          message: message,
        }),
      });
    }
    setImgPeek({ isLoading: false, image: '' });
    setMessage('');
  };

  //메세지 보내기
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

  //채팅방 폭파(호스트 퇴장)
  const [alertModal, setAlertModal] = useState(false);
  if (newChatMessages.find((i) => i.chatType === 'EXPIRE')) {
    setAlertModal(true);
    disconnect();
  }
  const action = () => {
    navigate('/coffeeChat');
  };

  return (
    <section>
      <AlertModal alertModal={alertModal} setAlertModal={setAlertModal} title="채팅방 종료" des="호스트가 채팅방을 퇴장함에 따라 채팅이 종료됩니다." action={action} />
      <PicModal isPicPopUp={isPicPopUp} setIsPicPopUp={setIsPicPopUp} />
      <RoomHeader newChatMessages={newChatMessages} />
      <div className="fixed left-0 top-20 h-full w-full rounded-[20px] bg-midIvory dark:bg-midNavy"></div>
      <RoomChats messageList={messageList} newChatMessages={newChatMessages} hasNextPage={hasNextPage} isFetching={isFetching} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
      <div className={`fixed bottom-0 left-0 z-20 flex w-full ${imgPeek ? 'items-end' : 'items-center'} justify-start gap-4 bg-lightIvory p-3 dark:bg-darkNavy`}>
        <BsCameraFill
          size="40"
          className="grow cursor-pointer "
          onClick={() => {
            imgRef?.current?.click();
          }}
        />
        <input ref={imgRef} type="file" accept="image/*" onChange={handleChangeProfileImg} className="hidden" />
        {imgPeek.image && (imgPeek.image.length > 0 || imgPeek.isLoading === true) ? (
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
              <button
                onClick={() => {
                  publish();
                }}
                className="w-[50%] rounded-xl bg-darkIvory py-2 dark:bg-lightNavy"
              >
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
