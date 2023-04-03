import Header from '../components/common/Header';
import { BsChevronLeft } from 'react-icons/bs';
import { useState } from 'react';
import MainHeader from '../components/common/MainHeader';

export default function RoomCreate() {
  const [roomInfo, setRoomInfo] = useState({
    title: '',
    des: '',
    tag: ['', '', ''] as string[],
  });

  return (
    <section>
      <div className="inset-0 flex flex-col gap-7 py-4 px-6 text-lightText dark:text-white">
        <Header type="withMainBtn" title="방 만들기" icon={<BsChevronLeft />} onSubmit={roomInfo} />
        <div className="mt-9 flex h-full flex-col gap-7 p-4 px-2">
          <div className="mb-4 flex flex-col gap-4 text-xl font-bold">
            <p className="font-bold">타이틀</p>
            <input
              onChange={(e) =>
                setRoomInfo({
                  ...roomInfo,
                  title: e.target.value,
                })
              }
              value={roomInfo.title}
              type="text"
              placeholder="방의 제목을 입력해주세요"
              className="h-[54px] w-full rounded-[20px] bg-midIvory p-2 px-4 text-[16px] focus:outline-none dark:bg-lightNavy"
            />
          </div>
          <div className="mb-4 flex flex-col gap-4 text-xl font-bold">
            <p className="font-bold">방 소개글</p>
            <textarea
              onChange={(e) =>
                setRoomInfo({
                  ...roomInfo,
                  des: e.target.value,
                })
              }
              value={roomInfo.des}
              placeholder="어떤 방인지 간단한 소개를 적어주세요"
              className="h-[108px] w-full rounded-[20px] bg-midIvory p-2 px-4 text-[16px] leading-5 focus:outline-none dark:bg-lightNavy"
            />
          </div>
          <div className="mb-4 flex flex-col gap-4 text-xl font-bold">
            <p className="font-bold">태그</p>
            <div className="flex gap-2">
              {roomInfo.tag.map((_, index) => (
                <input
                  onChange={(e) => {
                    setRoomInfo({
                      ...roomInfo,
                      tag: [
                        ...roomInfo.tag.map((i, idx) => {
                          if (idx === index) return e.target.value;
                          else return i;
                        }),
                      ],
                    });
                  }}
                  type="text"
                  key={index}
                  placeholder="#"
                  className="h-[54px] w-full rounded-[20px] bg-midIvory p-2 px-4 text-[16px] focus:outline-none dark:bg-lightNavy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
