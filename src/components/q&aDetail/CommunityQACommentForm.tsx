import React from 'react';
import { BsDot, BsHeartFill, BsThreeDots } from 'react-icons/bs';
import { commentArr, timeForToday } from '../../store/commentDummy';

export default function CommunityQACommentForm() {
  console.log(timeForToday('01 02 2023 14:31:10'));

  return (
    <div className="flex w-full cursor-pointer flex-col items-center gap-4 rounded-[20px] bg-midNavy">
      <div className="flex h-[55px] w-full items-center border border-darkNavy border-b-[#2F4658] p-5 text-[20px] font-bold">
        <div>댓글</div>
        <div className="ml-2 text-[18px] font-bold opacity-50">4개</div>
      </div>
      <div className="flex w-full flex-col gap-4 p-4">
        {commentArr.map((comment) => (
          <div className="flex w-full">
            <img src={comment.profileImage} />
            <div>
              <div>
                <div>
                  <div>Bud</div>
                  <BsDot />
                  <div>1분전</div>
                  <div>고정됨</div>
                </div>
                <BsThreeDots />
              </div>
              <div>
                <div>댓글 텍스트</div>
                <BsHeartFill />
              </div>
              <div>답글 달기</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
