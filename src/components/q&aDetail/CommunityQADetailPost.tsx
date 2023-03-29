import { FcPortraitMode } from 'react-icons/fc';
import { useParams } from 'react-router-dom';
import { dummyData } from '../../store/dummy';
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import { BsDot } from 'react-icons/bs';

export default function CommunityQADetailPost() {
  const { id } = useParams();
  const data = dummyData.find((i) => i.id === Number(id));

  return (
    <div className="flex cursor-pointer flex-col items-center gap-4 rounded-[20px] bg-midNavy">
      <div className="flex w-full flex-col gap-4 p-4">
        <div className="flex w-full">
          <div className="flex gap-1">
            <img src={data?.img} alt={data?.title} className="w-[58px] rounded-full" />
            <div className="pl-3 ">
              <div className="flex items-center justify-center gap-1">
                <p className="text-xl font-bold">{data?.userName}</p>
                <BsDot />
                <p className="text-[17px] opacity-50">{data?.time}</p>
              </div>
              <div className="mt-1 text-[17px] opacity-50">프론트엔드 개발자</div>
            </div>
          </div>
          <div className="grow text-end font-bold">
            <div className="flex h-full items-center justify-end gap-3">
              <FcPortraitMode />
              <p>팔로우</p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h1 className="mb-6 text-lg font-bold">{data?.title}</h1>
          <p className="text-base">{data?.detail}</p>
        </div>
      </div>
      <div className="flex h-[80px] w-full items-center justify-center ">
        <div className="flex h-[55px] w-[220px] items-center justify-center gap-2 rounded-[50px] bg-sky ">
          <div className="flex h-full w-[40%] items-center justify-center gap-2 text-[20px] transition hover:scale-[1.1]">
            <FaRegThumbsUp />
            <span>2</span>
          </div>
          <div className="flex h-[80%] w-0 border-[2px] border-sky border-l-white"></div>
          <div className="flex h-full w-[40%] items-center justify-center gap-2 text-[20px] transition hover:scale-[1.1]">
            <FaRegThumbsDown />
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
