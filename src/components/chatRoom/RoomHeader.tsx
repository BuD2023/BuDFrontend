import { BsChevronLeft, BsFillPersonFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useChatroomDetailQuery, useChatUserListQuery } from '../../store/module/useChatroomQuery';
import { ChatMessageType, InfoMessageType } from './_ChatRoom.interface';
import UserListModal from '../common/UserListModal';
import { useMyProfileQuery } from '../../store/module/useMyProfileQuery';

interface RoomHeaderPropsType {
  newChatMessages: InfoMessageType[] | ChatMessageType[];
  setHostInfo: (x: { id: number; nickName: string }) => void;
  setConfirmModal: (x: boolean) => void;
  userIdData: number;
}

export default function RoomHeader({ newChatMessages, setHostInfo, setConfirmModal, userIdData }: RoomHeaderPropsType) {
  const navigate = useNavigate();
  const { id } = useParams();

  //리액트 쿼리
  const { data: chatRoomInfo, refetch: chatRoomInfoRefetch } = useChatroomDetailQuery(Number(id));

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
    console.log(chatRoomInfo?.numberOfMembers);
    chatUserListRefetch();
  }, [chatRoomInfo?.numberOfMembers]);

  useEffect(() => {
    chatRoomInfoRefetch();
  }, []);

  return (
    <>
      <UserListModal isUserList={isUserList} setIsUserList={setIsUserList} type="ChatUsers" />
      <div className="fixed top-0 left-0 flex w-full items-center justify-between gap-2 px-4 py-5 font-bold">
        <div className="flex items-center gap-3 overflow-hidden">
          <BsChevronLeft
            onClick={() => {
              chatRoomInfo?.hostId === userIdData ? setConfirmModal(true) : navigate('/coffeeChat');
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
