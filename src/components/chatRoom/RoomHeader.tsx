import React from 'react';
import { BsChevronLeft, BsFillPersonFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

interface IRoomHeaderPropsType {
  roomName: string;
  numOfMember: number;
}

export default function RoomHeader({ roomName, numOfMember }: IRoomHeaderPropsType) {
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed top-0 left-0 mt-8 flex w-full items-center justify-between gap-2 px-4 py-2 text-xl font-bold">
        <BsChevronLeft onClick={() => navigate('/coffeeChat')} className="shrink-0 cursor-pointer" />
        <p className="truncate px-1">{roomName}</p>
        <div className="flex cursor-pointer items-center gap-1 font-normal opacity-70">
          <BsFillPersonFill className="shrink-0" />
          <p className="text-sm ">{numOfMember}</p>
        </div>
      </div>
    </>
  );
}
