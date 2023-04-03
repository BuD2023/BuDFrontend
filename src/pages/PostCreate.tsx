import Header from '../components/common/Header';
import { BsChevronLeft } from 'react-icons/bs';
import { useState } from 'react';
import { RxTriangleDown } from 'react-icons/rx';

export default function PostCreate() {
  const [roomInfo, setRoomInfo] = useState({
    title: '',
    des: '',
    type: '개발 피드',
  });
  const postTypes = ['개발 피드', 'Q & A 피드 '];
  const [isClick, setIsClick] = useState(true);

  return (
    <section>
      <div className="inset-0 flex flex-col gap-7 py-4 px-6 text-lightText dark:text-white">
        <Header type="withMainBtn" title="게시글 생성" icon={<BsChevronLeft />} onSubmit={roomInfo} />
        <div className="mt-9 flex h-full flex-col gap-8 px-2 pt-10">
          <div className="flex flex-col gap-4 text-xl font-medium">
            <div className="flex w-full flex-col items-center text-[18px] font-semibold">
              <button
                onClick={() => setIsClick(!isClick)}
                type="button"
                className="mb-2 flex h-[54px] w-full items-center rounded-[20px] bg-midIvory p-2 px-4 text-start text-[21px] dark:bg-lightNavy"
              >
                <span className="grow text-[18px] font-semibold">{roomInfo.type}</span>
                <RxTriangleDown className="text-[40px] opacity-50" />
              </button>
              <ul className={`w-full overflow-hidden rounded-[20px] bg-midIvory px-4 transition-all dark:bg-lightNavy ${isClick ? 'h-0' : 'h-[124px] py-2'}`}>
                <div className="scroll max-h-[45vh] overflow-auto">
                  {postTypes.map((job) => (
                    <li key={job} className="my-3">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setRoomInfo({ ...roomInfo, type: e.currentTarget.innerText });
                          setIsClick(true);
                        }}
                        type="button"
                        className="w-[95%] p-1 px-4 text-start hover:rounded-[20px] hover:bg-greyBeige hover:bg-opacity-50 dark:hover:bg-[#506779] dark:hover:bg-opacity-50"
                      >
                        {job}
                      </button>
                    </li>
                  ))}
                </div>
              </ul>
            </div>
            <input
              onChange={(e) =>
                setRoomInfo({
                  ...roomInfo,
                  title: e.target.value,
                })
              }
              value={roomInfo.title}
              type="text"
              placeholder="제목"
              className="h-[54px] w-full rounded-[20px] bg-midIvory p-2 px-4 text-[16px] placeholder:font-semibold placeholder:text-[#7b6d6d] focus:outline-none dark:bg-lightNavy"
            />
            <textarea
              onChange={(e) =>
                setRoomInfo({
                  ...roomInfo,
                  des: e.target.value,
                })
              }
              value={roomInfo.des}
              placeholder="내용을 입력하세요"
              className="h-[calc(100vh-290px)] w-full rounded-[20px] bg-midIvory p-4 text-[16px] leading-5 placeholder:font-semibold placeholder:text-[#7b6d6d] focus:outline-none dark:bg-lightNavy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
