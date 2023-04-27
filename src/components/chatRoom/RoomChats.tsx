import { RefObject, useEffect, useRef, useState } from 'react';
import PicModal from '../common/PicModal';
import UserModal from '../common/UserModal';
import defaultImage from '../../assets/DefaultProfileImage.webp';
import { useInView } from 'react-intersection-observer';
import { S3_URL } from '../../constant/union';
import ScrollToBottomBtn from '../common/ScrollToBottomBtn';
import { ChatMessageType, RoomChatsPropsType } from './_ChatRoom.interface';
import { useRecoilValueLoadable } from 'recoil';
import { getMyPageInfo } from '../../store/recoil/user';
import NewChatMessages from './NewChatMessages';
import MessageList from './MessageList';

export default function RoomChats({ hostInfo, messageList, newChatMessages, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage }: RoomChatsPropsType) {
  // 사용자 정보
  const getMyPageInfoLodable = useRecoilValueLoadable(getMyPageInfo);
  const myPageInfo: any = 'hasValue' === getMyPageInfoLodable.state ? getMyPageInfoLodable.contents : {};

  const [userModal, setUserModal] = useState(false);

  // 인피니티 스크롤
  const { ref: observerRef, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  // 사진 popUp
  const [isPicPopUp, setIsPicPopUp] = useState<{ open: boolean; pic: string }>({
    open: false,
    pic: '',
  });

  // 제일 최신 메세지로 스크롤
  const scrollToNew = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isFetching && isFetchingNextPage) {
      scrollToNew.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messageList]);

  // 백엔드에서 받은 유저 정보에서 받아서 사용할 것들!
  const [userInfo, setUserInfo] = useState({
    userId: 0,
    nickName: '',
    profileUrl: '',
    userIntro: '',
    job: '',
  });

  const handleClickUserImg = (userName: string, userProfileUrl: string, userId: number) => {
    setUserModal(true);
    setUserInfo({
      userId: userId,
      nickName: userName,
      profileUrl: userProfileUrl,
      userIntro: '일단 예시로 둔 소개입니다 ^^.',
      job: '프론트엔드',
    });
  };

  //scrollToBottom
  const scrollRef = useRef(null);

  return (
    <>
      <UserModal userModal={userModal} setUserModal={setUserModal} userInfo={userInfo} hostInfo={hostInfo} />
      <PicModal isPicPopUp={isPicPopUp} setIsPicPopUp={setIsPicPopUp} />
      <div ref={scrollRef} className="fixed top-[4.6rem] left-0 z-10 flex h-[calc(100vh-145px)] w-full flex-col-reverse overflow-auto p-4">
        <ScrollToBottomBtn scrollToNew={scrollRef as RefObject<HTMLDivElement>} />
        <div ref={scrollToNew} className="w-full"></div>
        <NewChatMessages
          newChatMessages={newChatMessages && (newChatMessages as Partial<ChatMessageType>[]).filter((i: Partial<ChatMessageType>) => i.chatType === 'MESSAGE' || i.chatType === 'IMAGE').reverse()}
          myPageInfo={myPageInfo}
          handleClickUserImg={handleClickUserImg}
          setIsPicPopUp={setIsPicPopUp}
        />
        <MessageList messageList={messageList && messageList} myPageInfo={myPageInfo} handleClickUserImg={handleClickUserImg} setIsPicPopUp={setIsPicPopUp} />
        <div ref={observerRef}></div>
      </div>
    </>
  );
}
