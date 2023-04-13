import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteCommunityMutation } from '../../store/module/useCommunityQuery';

interface IEditDeleteBtnPropsType {
  postId: string;
  setIsMenu: (x: boolean) => void;
}
export default function EditDeleteBtn({ postId, setIsMenu }: IEditDeleteBtnPropsType) {
  const navigate = useNavigate();

  const { mutate: deletePostMutate } = useDeleteCommunityMutation(Number(postId));

  return (
    <div className="absolute right-4 top-[55px] flex flex-col gap-3 rounded-xl bg-greyBeige p-3 text-[16px] font-medium">
      <div
        onClick={() => {
          setIsMenu(false);
          navigate(`/postEdit/${postId}`);
        }}
        className="cursor-pointer"
      >
        수정하기
      </div>
      <div
        className="cursor-pointer"
        onClick={() => {
          setIsMenu(false);
          deletePostMutate();
          navigate('/community');
        }}
      >
        삭제하기
      </div>
    </div>
  );
}
