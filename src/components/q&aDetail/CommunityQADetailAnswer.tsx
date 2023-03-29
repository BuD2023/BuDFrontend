import React from 'react';
import { BsDot, BsThreeDots } from 'react-icons/bs';
import { FcLike, FcPortraitMode, FcSms } from 'react-icons/fc';
import { useParams } from 'react-router-dom';
import { dummyData } from '../../store/dummy';

export default function CommunityQADetailAnswer() {
  const { id } = useParams();
  const data = dummyData.find((i) => i.id === Number(id));

  return (
    <div className="flex cursor-pointer flex-col items-center gap-4 rounded-[20px] bg-midNavy">
      <div className="flex h-[55px] w-full items-center justify-between border border-darkNavy border-b-[#2F4658] p-5 text-[20px] font-bold">
        <div>답변 1</div>
        <BsThreeDots className="text-[24px]" />
      </div>
      <div className="flex w-full flex-col gap-4 p-4">
        <div className="flex w-full">
          <div className="flex gap-1">
            <img className="w-[58px] rounded-full" src={data?.img} />
            <div className="pl-3 ">
              <div className="flex items-center justify-center gap-1">
                <p className="text-xl font-bold">지현</p>
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
          <p className="text-base">{data?.detail}</p>
        </div>
      </div>
      <div className="flex h-[54px] w-full items-center gap-8 rounded-b-[20px] bg-[#2c2e34] p-4 text-base">
        <div className="flex items-center gap-2">
          <FcLike />
          {data?.likeCount}
        </div>
        <div className="flex items-center gap-2">
          <FcSms />
          {data?.commentCount}
        </div>
      </div>
    </div>
  );
}
