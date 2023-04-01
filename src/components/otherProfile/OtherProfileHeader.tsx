import React from 'react';
import { AiFillGithub, AiFillSetting } from 'react-icons/ai';
import { FcReadingEbook } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import profile1 from '../../assets/profile1.jpg';

export default function OtherProfileHeader() {
  const githubID = 'JHni2';

  return (
    <div className="text-lighText flex w-full justify-between gap-4 text-[26px] font-bold dark:text-white">
      <div className="flex w-full flex-col gap-2.5">
        <div className="mb-2 flex items-center">
          <FcReadingEbook className="mr-2" /> {`지현님`}
        </div>
        <div className="mb-1 flex items-center gap-1 text-[16px] font-medium">
          <AiFillGithub onClick={() => window.open(`https://github.com/${githubID}`)} className="cursor-pointer opacity-60" />
          <span onClick={() => window.open(`https://github.com/${githubID}`)} className="cursor-pointer opacity-60 hover:underline">
            {githubID}
          </span>
        </div>
        <div className="min-h-[40px] w-full rounded-2xl bg-white p-2.5 text-[14px] font-semibold leading-[1.2] opacity-70 dark:bg-midNavy dark:font-normal dark:opacity-100">
          <div>안녕하세요 FE_김지현입니다. 이곳에 자기소개를 적어보야요~ </div>
        </div>
      </div>
      <img src={profile1} className="h-[120px] w-[120px] shrink-0 rounded-full" />
    </div>
  );
}
