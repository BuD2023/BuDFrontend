import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommunityPostQuery, useDeleteCommunityMutation } from '../../store/module/useCommunityQuery';
import { EditDeleteBtnPropsType } from './_Common.interface';

export default function EditDeleteBtn({ postId, setIsMenu }: EditDeleteBtnPropsType) {
  const navigate = useNavigate();

  const { mutateAsync: deletePostMutate } = useDeleteCommunityMutation(Number(postId));
  const { refetch } = useCommunityPostQuery();

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
        onClick={async () => {
          setIsMenu(false);
          await deletePostMutate();
          await refetch();
          navigate(-1);
        }}
      >
        삭제하기
      </div>
    </div>
  );
}
