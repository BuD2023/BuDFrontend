import { FcLike, FcPortraitMode, FcSms } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { dummyData } from '../../store/dummy';

export default function PostFormat() {
  const navigate = useNavigate();

  return (
    <ul>
      {dummyData.map((data) => (
        <li
          onClick={(e) => {
            e.preventDefault();
            navigate(`/communityQADetail/${data.id}`);
          }}
          key={data.id}
          className="mb-6 flex cursor-pointer flex-col items-center gap-4 rounded-[20px] bg-midNavy"
        >
          <div className="flex w-full flex-col gap-4 p-4">
            <div className="flex w-full">
              <div className="flex gap-1">
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/otherProfile/${data.userName}`);
                  }}
                  src={data.img}
                  alt={data.title}
                  className="w-[58px] rounded-full"
                />
                <div className="pl-3">
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/otherProfile/${data.userName}`);
                    }}
                    className="text-xl font-bold"
                  >
                    {data.userName}
                  </p>
                  <p className="text-[17px] opacity-50">{data.time}</p>
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
              <h1 className="mb-6 text-lg font-bold">{data.title}</h1>
              <p className="text-base">{data.detail}</p>
            </div>
          </div>
          <div className="flex h-[54px] w-full items-center gap-8 rounded-b-[20px] bg-[#2c2e34] p-4 text-base">
            <div className="flex items-center gap-2">
              <FcLike />
              {data.likeCount}
            </div>
            <div className="flex items-center gap-2">
              <FcSms />
              {data.commentCount}
            </div>
            <div className="flex grow items-center justify-end gap-2">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                version="1"
                viewBox="0 0 48 48"
                enableBackground="new 0 0 48 48"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="#f9e288" d="M37,43l-13-6l-13,6V9c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4V43z"></path>
              </svg>
              스크랩
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
