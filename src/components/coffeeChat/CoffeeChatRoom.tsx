import { BsFillPersonFill } from 'react-icons/bs';
import { FcReadingEbook, FcSms } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { IChatRoomType } from '../../store/chatsDummy';

interface CoffeeChatRoomPropsType {
  chatRooms: IChatRoomType[];
}

export default function CoffeeChatRoom({ chatRooms }: CoffeeChatRoomPropsType) {
  const navigate = useNavigate();

  return (
    <>
      {chatRooms.length !== 0 ? (
        chatRooms.map((room, index) => (
          <div onClick={() => navigate(`/chatRoom/${room.roomId}`)} key={room.roomName + String(index)} className="relative flex min-h-[280px] w-full flex-col">
            <div className="absolute inset-0 flex cursor-pointer flex-col justify-between rounded-2xl bg-midIvory p-6 dark:bg-midNavy">
              <div className="text-[19px] font-semibold leading-6">{room.roomName}</div>
              <div className="flex w-full gap-2">
                {room.tag.map((item, idx) => (
                  <div key={idx} className="flex items-center rounded-[40px] bg-greyBeige pl-2 pr-2.5 pt-1 pb-1.5">
                    {`# ${item}`}
                  </div>
                ))}
              </div>
              <div className="leading-5">{room.des}</div>
              <div className="flex w-full items-center justify-between text-[16px]">
                <div className="flex gap-2">
                  <img src={room.host.pic} className="h-[60px] w-[60px] rounded-full object-cover" />
                  <div className="flex flex-col justify-center gap-1.5">
                    <div className="font-bold">Host</div>
                    <div className="text-[18px]">{room.host.name}</div>
                  </div>
                </div>
                <div className="flex h-full flex-col items-end justify-center gap-1.5">
                  <div className="flex items-center font-semibold">
                    <BsFillPersonFill />
                    <span>{` ${room.memberId.length}명이 채팅 중`}</span>
                  </div>
                  <div className="text-[18px]">{`${room.createdAt}`}</div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="relative mb-5 flex min-h-[280px] w-full min-w-[100vw] flex-col">
          <div className="absolute inset-x-4 inset-y-0 flex flex-col items-center justify-center rounded-2xl bg-midIvory p-6 dark:bg-midNavy">
            <div className="text-[19px] font-semibold leading-6">검색된 채팅방이 없습니다.</div>
          </div>
        </div>
      )}
    </>
  );
}
