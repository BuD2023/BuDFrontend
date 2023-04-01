import React from 'react';
import { FcNews } from 'react-icons/fc';
import NotiBtn from '../common/NotiBtn';

export default function NewsHeader() {
  return (
    <div className="mb-4 flex h-[26px] items-center justify-between">
      <div className="flex items-center gap-3 text-[26px] font-bold">
        <div className="rounded-xl bg-white p-1">
          <FcNews />
        </div>
        <h1>IT 소식</h1>
      </div>
      <NotiBtn />
    </div>
  );
}
