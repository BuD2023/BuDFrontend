import { BsChevronLeft, BsFillPersonFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface IRoomHeaderPropsType {
  title: string;
  numOfMember: number;
}

export default function RoomHeader({ title, numOfMember }: IRoomHeaderPropsType) {
  const navigate = useNavigate();

  // userList popUp
  const [isUserList, setIsUserList] = useState({
    open: false,
    list: numOfMember,
  });

  return (
    <>
      {/* <UserListModal isUserList={isUserList} setIsUserList={setIsUserList} /> */}
      <div className="fixed top-0 left-0 mt-8 flex w-full items-center justify-between gap-2 px-4 py-2 text-xl font-bold">
        <BsChevronLeft onClick={() => navigate('/coffeeChat')} className="shrink-0 cursor-pointer" />
        <p className="truncate px-1">{title}</p>
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
          <p className="text-sm ">{numOfMember}</p>
        </div>
      </div>
    </>
  );
}
