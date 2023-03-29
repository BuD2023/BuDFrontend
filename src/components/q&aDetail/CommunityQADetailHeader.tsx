import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';

export default function CommunityQADetailHeader() {
  return (
    <div className="mt-8 flex w-full justify-between text-[24px]">
      <MdOutlineKeyboardArrowLeft />
      <BsThreeDots />
    </div>
  );
}
