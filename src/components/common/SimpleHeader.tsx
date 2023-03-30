import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function SimpleHeader() {
  const navigate = useNavigate();

  return (
    <div className="mt-8 flex w-full cursor-pointer justify-between text-[24px]">
      <MdOutlineKeyboardArrowLeft onClick={() => navigate(-1)} />
      <BsThreeDots />
    </div>
  );
}
