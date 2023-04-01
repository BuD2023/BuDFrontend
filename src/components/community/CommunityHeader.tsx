import React from 'react';
import { FcGlobe } from 'react-icons/fc';
import NotiBtn from '../common/NotiBtn';

export default function CommunityHeader() {
  return (
    <div className="mb-4 flex h-[26px] w-full items-center justify-between">
      <div className="flex items-center gap-3 text-[26px] font-bold">
        <div className="rounded-xl bg-white p-1">
          <FcGlobe />
        </div>
        <h1>커뮤니티</h1>
      </div>
      <NotiBtn />
    </div>
  );
}
