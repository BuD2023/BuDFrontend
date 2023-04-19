import { BsChevronLeft, BsFillPersonFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useChatroomDetailQuery } from '../../store/module/useChatroomQuery';
import { ChatMessageType, InfoMessageType } from '../../pages/ChatRoom';

interface RoomHeaderPropsType {
  newChatMessages: InfoMessageType[] | ChatMessageType[];
}

export default function RoomHeader({ newChatMessages }: RoomHeaderPropsType) {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: chatRoomInfo } = useChatroomDetailQuery(Number(id));

  const numberOfMember = (newChatMessages.slice().reverse() as ChatMessageType[] | InfoMessageType[]).find((i) => i.chatType !== 'MESSAGE' && i.chatType !== 'IMAGE')?.numberOfMembers;

  // userList popUp
  const [isUserList, setIsUserList] = useState({
    open: false,
    list: chatRoomInfo?.numberOfMembers,
  });

  return (
    <>
      {/* <UserListModal isUserList={isUserList} setIsUserList={setIsUserList} /> */}
      <div className="fixed top-0 left-0 mt-8 flex w-full items-center justify-between gap-2 px-4 py-2 text-xl font-bold">
        <BsChevronLeft onClick={() => navigate('/coffeeChat')} className="shrink-0 cursor-pointer" />
        <p className="truncate px-1">{chatRoomInfo?.title}</p>
        <div
          onClick={() => {
            setIsUserList({
              ...isUserList,
              open: true,
            });
          }}
          className="flex items-center gap-1 font-normal opacity-70"
        >
          <BsFillPersonFill className="shrink-0" />
          <p className="text-sm ">{numberOfMember && numberOfMember > 0 ? numberOfMember : chatRoomInfo?.numberOfMembers}</p>
        </div>
      </div>
    </>
  );
}
