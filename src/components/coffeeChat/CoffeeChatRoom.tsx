import { FcReadingEbook, FcSms } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

interface CoffeeChatRoomPropsType {
  chatRooms: {
    roomId: number;
    roomName: string;
    memberId: string[];
    randomProfiles: {
      pic: string;
      name: string;
      position: string;
    }[];
  }[];
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
              <div className="flex w-full">
                <div className="relative h-[90px] w-[130px] drop-shadow-2xl">
                  {room.randomProfiles.map((user, idx) => (
                    <img key={idx} src={user.pic} className={`${user.position} absolute h-[60px] w-[60px] rounded-full object-cover`} />
                  ))}
                </div>
                <div className="flex min-w-[50%] flex-col">
                  {room.randomProfiles.map((user, idx) => (
                    <div key={idx} className="my-1 ml-2 flex text-[20px] font-semibold">
                      <span className="mr-1 text-[16px]">{user.name}</span>
                      <FcSms />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex w-full items-center justify-end text-[16px] opacity-70">
                <FcReadingEbook className="mr-1 mb-1" />
                <span>{`현재 ${room.memberId.length}명의 멤머가 채팅중`}</span>
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
