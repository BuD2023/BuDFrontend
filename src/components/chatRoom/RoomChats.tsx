import React, { useEffect, useRef } from 'react';
import { IChatsType } from '../../store/chatsDummy';
import { timeForToday } from '../../store/commentDummy';

interface IChatRoomPropsType {
  chatsResult: IChatsType[];
}

export default function RoomChats({ chatsResult }: IChatRoomPropsType) {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref1.current?.scrollIntoView({ behavior: 'smooth' });
    // ref2.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatsResult]);
  // console.log(timeForToday(chatsResult[0].createdAt))

  return (
    <div className="fixed top-20 left-0 z-10 h-[calc(100vh-160px)] w-full overflow-auto p-4">
      {chatsResult.map((chat) => {
        return !chat.from ? (
          <div key={chat.id} className="mb-3 flex gap-4">
            <div>
              <img src={chat.pic} alt={chat.name} className="h-[50px] w-[50px] rounded-full object-cover" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="mt-2 text-base font-semibold">{chat.name}</p>
              <div className="flex items-end gap-2">
                {chat.type === 'text' ? (
                  <p className="max-w-[55vw] rounded-[10px] bg-white px-3 py-[0.65rem] text-sm text-black">{chat.text}</p>
                ) : (
                  <div className="flex items-center justify-center overflow-hidden rounded-[10px] bg-white px-3 py-[0.65rem]">
                    <img src={chat.text} className="max-h-[70vw] max-w-[50vw] object-cover" />
                  </div>
                )}
                <div className="text-[14px] opacity-70">{timeForToday(chat.createdAt)}</div>
              </div>
              <div ref={ref1} className="w-full"></div>
            </div>
          </div>
        ) : (
          <div key={chat.id} className="flex flex-col items-end gap-2">
            <p className="mt-2 text-base font-semibold">{chat.name}</p>
            <div className="flex items-end gap-2">
              <div className="text-[14px] opacity-70">{timeForToday(chat.createdAt)}</div>
              {chat.type === 'text' ? (
                <p className="min-w-[50px] max-w-[60vw] rounded-[10px] bg-white px-3 py-[0.65rem] text-sm text-black">{chat.text}</p>
              ) : (
                <div className="flex items-center justify-center rounded-[10px] bg-white px-3 py-[0.65rem]">
                  <img src={chat.text} className="max-h-[70vw] max-w-[50vw] object-cover" />
                </div>
              )}
            </div>
            <div ref={ref2} className="w-full"></div>
          </div>
        );
      })}
    </div>
  );
}
