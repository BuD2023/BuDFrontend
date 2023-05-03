import { RefObject, useEffect, useRef, useState } from 'react';
import PicModal from '../common/PicModal';
import UserModal from '../common/UserModal';
import { useInView } from 'react-intersection-observer';
import ScrollToBottomBtn from '../common/ScrollToBottomBtn';
import { ChatMessageType, RoomChatsPropsType } from './_ChatRoom.interface';
import NewChatMessages from './NewChatMessages';
import MessageList from './MessageList';
import { useRecoilValue } from 'recoil';
import { loginUserInfo } from '../../store/recoil/user';
import { useChatroomDetailQuery, useIsCheckHostQuery, useNewChatroomHostMutation } from '../../store/module/useChatroomQuery';
import { useNavigate, useParams } from 'react-router-dom';
import { getIsCheckHostResponseType } from '../../apiFetcher/coffeeChatInfo/getIsCheckHost';

export default function RoomChats({ hostInfo, messageList, newChatMessages, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage }: RoomChatsPropsType) {
  //params
  const { id } = useParams();

  //navigate
  const navigate = useNavigate();

  // 사용자 정보 Recoil
  const logInUserInfo = useRecoilValue(loginUserInfo);

  //리액트 쿼리
  const [queryUserId, setQueryUserId] = useState(false);
  const { mutateAsync } = useNewChatroomHostMutation(Number(id));
  const { data: chatRoomInfo, refetch: chatRoomInfoRefetch } = useChatroomDetailQuery(Number(id));
  const { data: isHost, refetch: isHostRefetch, isRefetching: isHostIsRefetching, isFetched } = useIsCheckHostQuery(Number(id), logInUserInfo?.id as number);

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

  const [userInfo, setUserInfo] = useState({
    userId: logInUserInfo?.id,
    nickName: logInUserInfo?.nickName,
    profileUrl: logInUserInfo?.profileUrl,
    userIntro: logInUserInfo?.description,
    job: logInUserInfo?.job,
  });

  //유저 모달
  const [userModal, setUserModal] = useState(false);
  const handleClickUserImg = async (userName: string, userProfileUrl: string, userId: number) => {
    await isHostRefetch();
    handleModalPop();
    setUserInfo({
      userId: userId,
      nickName: userName,
      profileUrl: userProfileUrl,
      userIntro: `안녕하세요~! ${userName}입니다!`,
      job: '',
    });
  };
  const action = async (userId: number) => {
    if (hostInfo.id === logInUserInfo?.id) {
      await mutateAsync(userId);
      chatRoomInfoRefetch();
      console.log(`사용자가 ${userInfo.userId}에게 호스트를 위임했습니다.`);
    } else {
      navigate(`/otherProfile/${userId}/feed`);
    }
  };

  const handleModalPop = async () => {
    if (isFetched && isHost) {
      await chatRoomInfoRefetch();

      setUserModal(true);
    }
  };

  // 메세지 보낼때 최신 메세지로 스크롤
  const scrollToNew = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollToNew.current?.scrollIntoView({ behavior: 'smooth' });
  }, [newChatMessages]);

  //scrollToBottom
  const scrollRef = useRef(null);

  return (
    <>
      <UserModal userModal={userModal} setUserModal={setUserModal} userInfo={userInfo} hostInfo={hostInfo} action={action} isHost={isHost as getIsCheckHostResponseType} />
      <PicModal isPicPopUp={isPicPopUp} setIsPicPopUp={setIsPicPopUp} />
      <div ref={scrollRef} className="fixed top-[4.6rem] left-0 z-10 flex h-[calc(100vh-145px)] w-full flex-col-reverse overflow-auto p-4">
        <ScrollToBottomBtn scrollToNew={scrollRef as RefObject<HTMLDivElement>} />
        <div ref={scrollToNew} className="w-full"></div>
        <NewChatMessages
          newChatMessages={newChatMessages && (newChatMessages as Partial<ChatMessageType>[]).filter((i: Partial<ChatMessageType>) => i.chatType === 'MESSAGE' || i.chatType === 'IMAGE').reverse()}
          handleClickUserImg={handleClickUserImg}
          setIsPicPopUp={setIsPicPopUp}
        />
        <MessageList messageList={messageList && messageList} handleClickUserImg={handleClickUserImg} setIsPicPopUp={setIsPicPopUp} />
        <div ref={observerRef}></div>
      </div>
    </>
  );
}
