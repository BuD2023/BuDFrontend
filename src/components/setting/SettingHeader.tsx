import React from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function SettingHeader() {
  const navigate = useNavigate();

  return (
    <div className="fixed left-0 top-0 z-10 w-full border-b-[0.5px] border-b-black border-opacity-20 bg-lightIvory pb-4 text-2xl dark:bg-darkNavy">
      <div className="mt-16 flex items-center px-4">
        <div className="shrink-0 grow basis-[0]">
          <BsChevronLeft onClick={() => navigate('/myProfile')} className="cursor-pointer" />
        </div>
        <h1 className="flex grow items-center gap-2 text-[26px] font-bold">설정</h1>
      </div>
    </div>
  );
}
