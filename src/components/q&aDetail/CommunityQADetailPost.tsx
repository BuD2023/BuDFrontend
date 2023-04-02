import { FcPortraitMode, FcVoicePresentation } from 'react-icons/fc';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyData, IBlogData } from '../../store/dummy';
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import { BsDot, BsFillHandThumbsUpFill } from 'react-icons/bs';
import { timeForToday } from '../../store/commentDummy';

export default function CommunityQADetailPost() {
  const { id } = useParams();
  const data = dummyData.find((i) => i.id === Number(id)) as IBlogData;
  const navigate = useNavigate();

  return (
    <li className="flex w-full cursor-pointer flex-col items-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy">
      <div className="flex w-full flex-col gap-4 p-4">
        <div className="flex w-full">
          <div className="flex gap-1">
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/otherProfile/${data?.userName}`);
              }}
              src={data?.img}
              alt={data?.title}
              className="w-[58px] rounded-full"
            />
            <div className="pl-3">
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/otherProfile/${data?.userName}`);
                }}
                className="text-xl font-bold"
              >
                {data?.userName}
              </p>
              <p className="text-[17px] opacity-50">{timeForToday(data?.createdAt)}</p>
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
      <div className="flex h-[54px] w-full items-center gap-8 rounded-b-[20px] bg-[#a49c7c] p-4 text-base text-white dark:bg-[#383030] dark:dark:bg-[#2c2e34]">
        <div className="flex items-center gap-2">
          <BsFillHandThumbsUpFill size="20px" className="text-[#fbceb1]" />
          {data?.likeCount}
        </div>
        <div className="flex items-center gap-2">
          <FcVoicePresentation size="30px" />
          {data?.commentCount}
        </div>
        <div className="flex grow items-center justify-end gap-2">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
            <path fill="#f9e288" d="M37,43l-13-6l-13,6V9c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4V43z"></path>
          </svg>
          스크랩
        </div>
      </div>
    </li>
  );
}
