import React from 'react';
import { useNavigate } from 'react-router-dom';

interface IEditDeleteBtnPropsType {
  postId: string;
}

export default function EditDeleteBtn({ postId }: IEditDeleteBtnPropsType) {
  const navigate = useNavigate();

  return (
    <div className="absolute right-4 top-[55px] flex flex-col gap-3 rounded-xl bg-greyBeige p-3 text-[16px] font-medium">
      <div onClick={() => navigate(`/postEdit/${postId}`)} className="cursor-pointer">
        수정하기
      </div>
      <div className="cursor-pointer">삭제하기</div>
    </div>
  );
}
