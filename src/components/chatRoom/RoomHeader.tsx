import { BsChevronLeft, BsFillPersonFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useChatroomDetailQuery, useChatUserListQuery, useIsCheckHostQuery } from '../../store/module/useChatroomQuery';
import { ChatMessageType, InfoMessageType } from './_ChatRoom.interface';
import UserListModal from '../common/UserListModal';
import { useRecoilValue } from 'recoil';
import { loginUserInfo } from '../../store/recoil/user';

interface RoomHeaderPropsType {
  newChatMessages: InfoMessageType[] | ChatMessageType[];
  setHostInfo: (x: { id: number; nickName: string }) => void;
  setConfirmModal: (x: boolean) => void;
  userIdData: number;
}

export default function RoomHeader({ newChatMessages, setHostInfo, setConfirmModal, userIdData }: RoomHeaderPropsType) {
  const navigate = useNavigate();
  const { id } = useParams();

  // 사용자 정보 Recoil
  const logInUserInfo = useRecoilValue(loginUserInfo);

  //리액트 쿼리
  const { data: chatRoomInfo, refetch: chatRoomInfoRefetch, isFetched: isChatroomInfofetched } = useChatroomDetailQuery(Number(id));
  const { data: isHost, refetch: isHostRefetch, isRefetching, isFetched } = useIsCheckHostQuery(Number(id), logInUserInfo?.id as number);

  // userList popUp
  const [isUserList, setIsUserList] = useState(false);

  // 호스트 정보 넘기기
  useEffect(() => {
    setHostInfo({
      id: chatRoomInfo?.hostId as number,
      nickName: chatRoomInfo?.hostName as string,
    });
  }, [chatRoomInfo?.hostId, chatRoomInfo?.hostName]);

  useEffect(() => {
    if (newChatMessages.find((i) => i.chatType === 'EXPIRE')) {
      console.log('채팅방 폭파!!');
      return;
    }
  }, [newChatMessages]);

  // 현재 채팅방 인원수 계산
  const numberOfMember = (newChatMessages.slice().reverse() as Partial<ChatMessageType[]>).find((i) => i?.chatType !== 'MESSAGE' && i?.chatType !== 'IMAGE')?.numberOfMembers;

  const { refetch: chatUserListRefetch } = useChatUserListQuery(Number(id));

  useEffect(() => {
    chatUserListRefetch();
  }, [chatRoomInfo?.numberOfMembers]);

  useEffect(() => {
    chatRoomInfoRefetch();
  }, []);

  const handleModalPop = async () => {
    await chatRoomInfoRefetch();
    console.log(isHost?.isHost);
    if (isChatroomInfofetched && isFetched && isHost && !isRefetching) {
      if (isHost.isHost) {
        setConfirmModal(true);
      } else {
        navigate('/coffeeChat');
      }
    }
  };

  return (
    <>
      <UserListModal isUserList={isUserList} setIsUserList={setIsUserList} type="ChatUsers" />
      <div className="fixed top-0 left-0 flex w-full items-center justify-between gap-2 px-4 py-5 font-bold">
        <div className="flex items-center gap-3 overflow-hidden">
          <BsChevronLeft
            onClick={async () => {
              await isHostRefetch();

              handleModalPop();
            }}
            className="shrink-0 cursor-pointer text-[26px]"
          />
          <p className="truncate text-2xl">{chatRoomInfo?.title}</p>
        </div>
        <div
          onClick={() => {
            setIsUserList(true);
            chatUserListRefetch();
          }}
          className="flex cursor-pointer items-center gap-1 text-xl font-normal opacity-70"
        >
          <BsFillPersonFill className="shrink-0" />
          <p className="text-sm ">{numberOfMember && numberOfMember > 0 ? numberOfMember : chatRoomInfo?.numberOfMembers}</p>
        </div>
      </div>
    </>
  );
}
