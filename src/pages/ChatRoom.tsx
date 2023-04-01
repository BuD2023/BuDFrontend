import { BsCameraFill, BsChevronLeft, BsFillPersonFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import RoomChats from '../components/chatRoom/RoomChats';
import RoomHeader from '../components/chatRoom/RoomHeader';
import { chats, chatRooms, IChatRoomType, IChatsType } from '../store/chatsDummy';
import { timeForToday } from '../store/commentDummy';

export default function ChatRoom() {
  const { id } = useParams();
  const chatRoom = chatRooms.find((i) => i.roomId === Number(id)) as IChatRoomType;
  const chatsResult = chats.filter((i) => i.roomId === Number(id)) as IChatsType[];

  return (
    <section>
      <RoomHeader roomName={chatRoom.roomName} numOfMember={chatRoom.memberId.length} />
      <div className="fixed top-20 left-0 h-full w-full rounded-[20px] bg-midIvory dark:bg-midNavy"></div>
      <RoomChats chatsResult={chatsResult} />
      <div className="fixed left-0 bottom-0 z-20 flex w-full items-center gap-4 bg-lightIvory p-3 dark:bg-darkNavy">
        <BsCameraFill size="40" className="grow cursor-pointer " />
        <input type="text" className="mb-0.5 h-[40px] w-full grow rounded-[20px] bg-greyBeige py-2 px-4 focus:outline-none dark:bg-lightNavy" />
      </div>
    </section>
  );
}
