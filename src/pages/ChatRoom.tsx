import { BsCameraFill, BsChevronLeft, BsFillPersonFill } from 'react-icons/bs';
import { chat, chatRooms } from '../store/dummy';

export default function ChatRoom() {
  const chatRoom = chatRooms[0];
  const userName = 'kody';

  return (
    <section>
      <div className="mt-16 flex flex-col gap-4 p-4 text-white">
        <div className="fixed top-0 left-0 flex w-full items-center justify-between gap-3 bg-darkNavy p-4 text-2xl font-bold">
          <BsChevronLeft className="shrink-0" />
          <p className="truncate px-1">{chatRoom.roomName}</p>
          <div className="flex items-center gap-1 font-normal opacity-70">
            <BsFillPersonFill className="shrink-0" />
            <p className="text-sm ">14</p>
          </div>
        </div>
        <div className="fixed top-[80px] left-0 h-full w-full rounded-[20px] bg-midNavy"></div>
        <ul className="fixed top-[80px] left-0 z-10 h-[calc(100vh-160px)] w-full overflow-auto p-4">
          <div className="">
            {chatRooms[0].randomProfiles.map((chatting, idx) => {
              return (
                <li key={chatting.name} className="mb-3 flex gap-4">
                  <div>
                    <img src={chatting.pic} alt={chatting.name} className="h-[50px] w-[50px] rounded-full" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="mt-2 text-base font-semibold">{chatting.name}</p>
                    <p className="rounded-[10px] bg-white px-3 py-[0.65rem] text-sm text-black">{chat.content[idx]}</p>
                  </div>
                </li>
              );
            })}
            <div className="text-end">
              <li className="inline-flex flex-col gap-2">
                <span className="mt-2 text-base font-semibold">{userName}</span>
                <span className="rounded-[10px] bg-white px-3 py-[0.65rem] text-sm text-black">왜왜 나 잘 쓰고 있음</span>
              </li>
            </div>
          </div>
        </ul>
        <div className="fixed left-0 bottom-0 z-20 flex w-full items-center gap-4 bg-darkNavy p-4">
          <BsCameraFill size="40" className="grow cursor-pointer" />
          <input type="text" className="h-[48px] w-full grow rounded-[20px] bg-lightNavy p-2 px-4 focus:outline-none" />
        </div>
      </div>
    </section>
  );
}
