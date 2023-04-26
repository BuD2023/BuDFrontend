import { BsChevronLeft, BsFillPersonFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useChatroomDetailQuery, useChatUserListQuery } from '../../store/module/useChatroomQuery';
import { ChatMessageType, InfoMessageType } from './_ChatRoom.interface';
import UserListModal from '../common/UserListModal';

interface RoomHeaderPropsType {
  newChatMessages: InfoMessageType[] | ChatMessageType[];
  setHostInfo: (x: { id: number; nickName: string }) => void;
}

export default function RoomHeader({ newChatMessages, setHostInfo }: RoomHeaderPropsType) {
  const navigate = useNavigate();
  const { id } = useParams();

  //리액트 쿼리
  const { data: chatRoomInfo, refetch } = useChatroomDetailQuery(Number(id));

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

  return (
    <>
      <UserListModal isUserList={isUserList} setIsUserList={setIsUserList} type="ChatUsers" />
      <div className="fixed top-0 left-0 mt-8 flex w-full items-center justify-between gap-2 px-4 py-2 text-xl font-bold">
        <BsChevronLeft onClick={() => navigate('/coffeeChat')} className="shrink-0 cursor-pointer" />
        <p className="truncate px-1">{chatRoomInfo?.title}</p>
        <div
          onClick={() => {
            setIsUserList(true);
          }}
          className="flex cursor-pointer items-center gap-1 font-normal opacity-70"
        >
          <BsFillPersonFill className="shrink-0" />
          <p className="text-sm ">{numberOfMember && numberOfMember > 0 ? numberOfMember : chatRoomInfo?.numberOfMembers}</p>
        </div>
      </div>
    </>
  );
}
